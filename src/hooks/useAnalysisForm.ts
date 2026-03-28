'use client'

import { useState, useCallback } from 'react'
import { PropertyFormData } from '@/types/database'
import { runAnalysis, MOCK_ANALYSIS_DELAY_MS, type AnalysisResult } from '@/lib/analysisEngine'
import { ANALYSIS_VIA_API } from '@/config/constants'
import { downloadReportAsPDF } from '@/utils/reportGenerator'
import { addReport } from '@/lib/reportsStorage'

const defaultForm: PropertyFormData = {
  property_type: 'apartment',
  listing_type: 'sale',
  address: '',
  city: 'İstanbul',
  district: '',
  neighborhood: '',
  area_sqm: 0,
  room_count: 0,
  living_room_count: 1,
  bathroom_count: 1,
  floor_number: undefined,
  total_floors: undefined,
  building_age: undefined,
  building_type: '',
  heating_type: '',
  facade: '',
  has_elevator: false,
  has_parking: false,
  has_balcony: false,
  has_garden: false,
  has_storage: false,
  is_renovated: false,
  has_pool: false,
  has_jacuzzi: false,
  has_sea_view: false,
  has_closed_parking: false,
  has_generator: false,
  has_smart_home: false,
  renovation_year: undefined,
  price: undefined,
  title: '',
  description: '',
}

export function useAnalysisForm() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<PropertyFormData>(defaultForm)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null)

  const formatPriceDisplay = useCallback((num: number | undefined) => {
    if (num === undefined || num === null || num === 0) return ''
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }, [])

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const num = raw === '' ? 0 : Number(raw)
    setFormData((prev) => ({ ...prev, price: num }))
  }, [])

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const newImages: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      await new Promise<void>((resolve) => {
        reader.onload = (ev) => {
          if (ev.target?.result) {
            newImages.push(ev.target.result as string)
          }
          resolve()
        }
        reader.readAsDataURL(file)
      })
    }
    setUploadedImages((prev) => [...prev, ...newImages])
    setIsUploading(false)
  }, [])

  const removeImage = useCallback((index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : type === 'number' ? Number(value) : value,
      }))
    },
    []
  )

  const toggleFeature = useCallback((feature: string) => {
    setFormData((prev) => ({
      ...prev,
      [feature]: !prev[feature as keyof PropertyFormData],
    }))
  }, [])

  const downloadPdf = useCallback(async () => {
    if (!analysisResults) return
    const reportData = {
      title: `${formData.city} / ${formData.district} - ${formData.property_type} Analizi`,
      type: 'Analiz Raporu',
      date: new Date().toISOString().split('T')[0],
      formData: {
        property_type: formData.property_type,
        city: formData.city,
        district: formData.district,
        area_sqm: formData.area_sqm,
        room_count: formData.room_count?.toString(),
        bathroom_count: formData.bathroom_count?.toString(),
      },
      analysisResults,
      uploadedImages,
      createdAt: new Date().toLocaleString('tr-TR'),
    }
    try {
      await downloadReportAsPDF(reportData)
    } catch (error) {
      console.error('İndirme hatası:', error)
      setToastMessage('İndirme sırasında bir hata oluştu.')
      setTimeout(() => setToastMessage(null), 3000)
    }
  }, [analysisResults, formData, uploadedImages])

  const saveReportToStorage = useCallback(() => {
    if (!analysisResults) return
    const newReport = {
      id: `report-${Date.now()}`,
      title: `${formData.city} / ${formData.district} - ${formData.property_type} Analizi`,
      type: 'Analiz Raporu',
      date: new Date().toISOString().split('T')[0],
      formData: { ...formData },
      analysisResults: { ...analysisResults },
      uploadedImages: [...(uploadedImages ?? [])],
      createdAt: new Date().toLocaleString('tr-TR'),
    }
    addReport(newReport)
    setToastMessage('Rapor başarıyla kaydedildi!')
    setTimeout(() => setToastMessage(null), 3000)
  }, [analysisResults, formData, uploadedImages])

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true)
    try {
      if (ANALYSIS_VIA_API) {
        const res = await fetch('/api/analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'same-origin',
        })
        if (!res.ok) {
          throw new Error(await res.text())
        }
        const data = (await res.json()) as { results: AnalysisResult }
        setAnalysisResults(data.results)
      } else {
        await new Promise((resolve) => setTimeout(resolve, MOCK_ANALYSIS_DELAY_MS))
        setAnalysisResults(runAnalysis(formData))
      }
      setShowResults(true)
    } finally {
      setIsAnalyzing(false)
    }
  }, [formData])

  return {
    isAnalyzing,
    showResults,
    setShowResults,
    uploadedImages,
    isUploading,
    toastMessage,
    setToastMessage,
    formData,
    setFormData,
    analysisResults,
    formatPriceDisplay,
    handlePriceChange,
    handleImageUpload,
    removeImage,
    handleChange,
    toggleFeature,
    handleAnalyze,
    downloadPdf,
    saveReportToStorage,
  }
}

export type AnalysisFormBag = ReturnType<typeof useAnalysisForm>
