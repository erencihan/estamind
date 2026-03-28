'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  FileText,
  Trash2,
  Building2,
  TrendingUp,
  DollarSign,
  BarChart3,
  MapPin,
  Check,
  Brain,
  Sparkles,
  Camera,
  FileDown,
  Loader2,
  Eye,
} from 'lucide-react'
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal'
import { downloadReport } from '@/utils/reportGenerator'
import type { ReportData } from '@/types/report'
import { getReportById, removeReportById, type SavedReport } from '@/lib/reportsStorage'
import type { PropertyFormData } from '@/types/database'
import type { AnalysisResult } from '@/lib/analysisEngine'

export default function ReportDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [report, setReport] = useState<SavedReport | null>(null)
  const [loading, setLoading] = useState(true)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const reportId = typeof params.id === 'string' ? params.id : String(params.id ?? '')

  useEffect(() => {
    const found = getReportById(reportId)
    if (found) setReport(found)
    setLoading(false)
  }, [reportId])

  const handleDeleteClick = () => setShowDeleteModal(true)

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    removeReportById(reportId)
    router.push('/dashboard/reports')
  }

  const handleDownload = async () => {
    if (!report) return
    const formData = (report.formData ?? (report as any).analysisData?.formData) as Partial<PropertyFormData>
    const analysisResults = (report.analysisResults ??
      (report as any).analysisData?.analysisResults) as Partial<AnalysisResult>
    if (!formData || !analysisResults) return

    setIsDownloading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const reportData = {
      title: report.title,
      type: report.type,
      date: report.date,
      formData,
      analysisResults,
      uploadedImages: report.uploadedImages ?? (report as any).analysisData?.uploadedImages ?? [],
      createdAt: report.createdAt ?? report.date,
    }
    downloadReport(reportData as ReportData, report.title)
    setIsDownloading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Rapor yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-outfit font-bold mb-2">Rapor Bulunamadı</h2>
          <p className="text-gray-400 mb-4">Bu rapor silinmiş veya hiç oluşturulmamış olabilir.</p>
          <button 
            onClick={() => router.push('/dashboard/reports')}
            className="btn-primary"
          >
            Raporlarım Sayfasına Dön
          </button>
        </div>
      </div>
    )
  }

  const formData = (report.formData ?? (report as any).analysisData?.formData ?? {}) as Partial<PropertyFormData>
  const analysisResults = (report.analysisResults ??
    (report as any).analysisData?.analysisResults ??
    {}) as Partial<AnalysisResult>
  const uploadedImages = report.uploadedImages ?? (report as any).analysisData?.uploadedImages ?? []
  const createdAt = report.createdAt ?? report.date

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/dashboard/reports')}
                className="p-2 rounded-lg bg-surface-card hover:bg-primary-light transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-outfit font-bold">{report.title}</h1>
                <p className="text-gray-400">{report.type} • {createdAt}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    İndiriliyor...
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4" />
                    İndir
                  </>
                )}
              </button>
              <button 
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="bg-error/20 hover:bg-error text-error px-4 py-2 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Sil
              </button>
            </div>
          </div>

          {/* Property Info - Premium Card at Top */}
          <div className="bg-gradient-to-br from-surface-card to-primary/30 rounded-3xl p-6 mb-8 border border-glass-border relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-outfit font-bold">Mülk Bilgileri</h2>
                  <p className="text-sm text-gray-400">Gayrimenkul Detayları</p>
                </div>
              </div>

              {/* Main Property Info Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Property Type */}
                <div className="bg-primary/50 rounded-2xl p-4 border border-glass-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Mülk Türü</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {formData.property_type === 'apartment'
                      ? 'Daire'
                      : formData.property_type === 'villa'
                        ? 'Villa'
                        : formData.property_type === 'house'
                          ? 'Ev'
                          : formData.property_type === 'land'
                            ? 'Arsa'
                            : formData.property_type === 'commercial'
                              ? 'Ticari'
                              : formData.property_type === 'studio'
                                ? 'Stüdyo'
                                : formData.property_type === 'duplex'
                                  ? 'Dublex'
                                  : formData.property_type === 'penthouse'
                                    ? 'Çatı Katı'
                                    : typeof formData.property_type === 'string'
                                      ? formData.property_type
                                      : 'Belirtilmemiş'}
                  </p>
                </div>

                {/* Area */}
                <div className="bg-primary/50 rounded-2xl p-4 border border-glass-border">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Brüt Alan</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {formData.area_sqm?.toLocaleString() || '0'} <span className="text-sm text-gray-400">m²</span>
                  </p>
                </div>

                {/* Rooms */}
                <div className="bg-primary/50 rounded-2xl p-4 border border-glass-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Oda Sayısı</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {`${Number(formData.room_count ?? 0)}+1`}
                  </p>
                </div>

                {/* Bathrooms */}
                <div className="bg-primary/50 rounded-2xl p-4 border border-glass-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-xs text-gray-400 uppercase tracking-wide">Banyo</span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {String(formData.bathroom_count ?? '0')}
                  </p>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-primary/50 rounded-2xl p-4 mb-6 border border-glass-border">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-400">Konum</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-sm font-medium">
                      {formData.city || 'Şehir'}
                    </span>
                    <span className="text-gray-500">/</span>
                    <span className="px-3 py-1 bg-primary-light text-white rounded-lg text-sm font-medium">
                      {formData.district || 'İlçe'}
                    </span>
                  </div>
                  {formData.neighborhood && (
                    <>
                      <span className="text-gray-500">/</span>
                      <span className="text-gray-300">{formData.neighborhood}</span>
                    </>
                  )}
                </div>
                {formData.address && (
                  <p className="text-sm text-gray-400 mt-2">{formData.address}</p>
                )}
              </div>

              {/* Property Features */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-400">Özellikler</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.has_elevator && (
                    <span className="px-3 py-1.5 bg-success/20 text-success rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-success rounded-full" /> Asansör
                    </span>
                  )}
                  {formData.has_parking && (
                    <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Otopark
                    </span>
                  )}
                  {formData.has_balcony && (
                    <span className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> Balkon
                    </span>
                  )}
                  {formData.has_garden && (
                    <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Bahçe
                    </span>
                  )}
                  {formData.has_storage && (
                    <span className="px-3 py-1.5 bg-warning/20 text-warning rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-warning rounded-full" /> Depo
                    </span>
                  )}
                  {formData.is_renovated && (
                    <span className="px-3 py-1.5 bg-accent/20 text-accent rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" /> Tadilat
                    </span>
                  )}
                  {formData.building_age && (
                    <span className="px-3 py-1.5 bg-primary-light text-gray-300 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> {formData.building_age} Yaşında
                    </span>
                  )}
                  {formData.floor_number && (
                    <span className="px-3 py-1.5 bg-primary-light text-gray-300 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> {formData.floor_number}. Kat
                    </span>
                  )}
                  {formData.total_floors && (
                    <span className="px-3 py-1.5 bg-primary-light text-gray-300 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> Toplam {formData.total_floors} Kat
                    </span>
                  )}
                  {formData.heating_type && (
                    <span className="px-3 py-1.5 bg-primary-light text-gray-300 rounded-lg text-sm font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> 

                      {
                       formData.heating_type === 'natural_gas' ? 'Doğalgaz' :
                       formData.heating_type === 'coal' ? 'Kömür' :
                       formData.heating_type === 'electric' ? 'Elektrik' :
                       formData.heating_type === 'solar' ? 'Güneş' :
                       formData.heating_type === 'central' ? 'Merkezi' :
                       formData.heating_type === 'floor_heating' ? 'Yerden Isıtma' : formData.heating_type 
                       }

                    </span>
                  )}
                  {!formData.has_elevator && !formData.has_parking && !formData.has_balcony && 
                   !formData.has_garden && !formData.has_storage && !formData.is_renovated && 
                   !formData.building_age && !formData.floor_number && !formData.total_floors && !formData.heating_type && (
                    <span className="px-3 py-1.5 bg-primary-light text-gray-400 rounded-lg text-sm">
                      Özellik bilgisi bulunmuyor
                    </span>
                  )}
                </div>
              </div>

              {/* Price Info (if available) */}
              {formData.price && (
                <div className="bg-gradient-to-r from-accent/20 to-warning/20 rounded-2xl p-4 border border-accent/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-accent" />
                      <span className="text-gray-400">Girilen Fiyat</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-mono font-bold text-accent">
                        ₺{Number(formData.price).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₺{(formData.area_sqm ? Number(formData.price) / formData.area_sqm : 0).toLocaleString()} / m²
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price Analysis Section */}
          <div className="bg-gradient-to-r from-accent/20 to-warning/20 rounded-2xl p-6 mb-8 border border-accent/30">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="font-outfit font-semibold">{formData.city} / {formData.district} m² Fiyat Analizi</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">İlçe Ortalaması</p>
                <p className="text-2xl font-mono font-bold text-white">₺{analysisResults.districtAvgPricePerSqm?.toLocaleString()}</p>
                <p className="text-xs text-gray-500">m² başına</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Bu Mülkün m² Fiyatı</p>
                <p className="text-2xl font-mono font-bold text-accent">₺{analysisResults.pricePerSqm?.toLocaleString()}</p>
                <p className="text-xs text-gray-500">önerilen</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">İl Geneli Ortalama</p>
                <p className="text-2xl font-mono font-bold text-white">₺{analysisResults.agentAnalysis?.marketComparison?.cityAvg?.toLocaleString()}</p>
                <p className="text-xs text-gray-500">m² başına</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-glass-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Pazar Değerlendirmesi:</span>
                <span className={`font-semibold ${Number(analysisResults.agentAnalysis?.marketComparison?.difference) >= 0 ? 'text-warning' : 'text-success'}`}>
                  {analysisResults.agentAnalysis?.marketComparison?.difference}% {Number(analysisResults.agentAnalysis?.marketComparison?.difference) >= 0 ? 'üstünde' : 'altında'}
                </span>
              </div>
            </div>
          </div>

          {/* Suggested Price & Market Prediction */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-accent" />
                <span className="text-gray-400">Önerilen Fiyat</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-mono font-bold text-success">
                  ₺{((analysisResults.suggestedPriceMin ?? 0) / 1000000).toFixed(1)}M
                </span>
                <span className="text-gray-500 mb-1">-</span>
                <span className="text-4xl font-mono font-bold text-white">
                  ₺{((analysisResults.suggestedPriceMax ?? 0) / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-400">m² başına: ₺{analysisResults.pricePerSqm?.toLocaleString()}</span>
                <span className="text-success">Güven: %{analysisResults.confidenceScore}</span>
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-gray-400">Pazar Tahmini</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Talep Seviyesi</span>
                  <span className="text-success font-semibold">{analysisResults.demandLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tahmini Satış Süresi</span>
                  <span className="text-white font-semibold">{analysisResults.daysOnMarket} gün</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Bölge Ortalaması</span>
                  <span className="text-white font-mono">₺{(((formData.area_sqm ?? 0) * (analysisResults.districtAvgPricePerSqm ?? 0)) / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Comparison */}
          <div className="bg-surface-card rounded-2xl p-6 mb-6">
            <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Pazar Karşılaştırması
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Toplam Aktif İlan</span>
                  <span className="text-white font-mono font-bold">{analysisResults.districtData?.totalListings}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Benzer İlan Sayısı</span>
                  <span className="text-accent font-mono font-bold">{analysisResults.agentAnalysis?.competition?.similarProperties}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Rekabet Durumu</span>
                  <span className="text-sm text-warning">{analysisResults.agentAnalysis?.competition?.recommendation}</span>
                </div>
              </div>
              <div className="bg-primary/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Fiyat Aralığı (En Düşük)</span>
                  <span className="text-white font-mono">₺{((analysisResults.agentAnalysis?.competition?.priceRange?.min ?? 0) / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Fiyat Aralığı (En Yüksek)</span>
                  <span className="text-white font-mono">₺{((analysisResults.agentAnalysis?.competition?.priceRange?.max ?? 0) / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Trend Yönü</span>
                  <span className={`text-sm ${analysisResults.districtData?.trend === 'up' ? 'text-success' : 'text-gray-400'}`}>
                    {analysisResults.districtData?.trend === 'up' ? '↑ Yükseliş' : analysisResults.districtData?.trend === 'down' ? '↓ Düşüş' : '→ Stabil'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Strategy */}
          <div className="bg-surface-card rounded-2xl p-6 mb-6">
            <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Fiyatlandırma Stratejisi
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-success/10 to-transparent rounded-xl border border-success/20">
                <div>
                  <p className="text-sm text-gray-400">Hızlı Satış Fiyatı</p>
                  <p className="text-xs text-gray-500">Önerilen minimum fiyat</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-mono font-bold text-success">₺{((analysisResults.agentAnalysis?.pricingStrategy?.quickSalePrice ?? 0) / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-500">{(analysisResults.daysOnMarket ?? 0) - 10} gün içinde satış</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-transparent rounded-xl border border-accent/20">
                <div>
                  <p className="text-sm text-gray-400">Optimal Fiyat</p>
                  <p className="text-xs text-gray-500">Denge fiyatı</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-mono font-bold text-accent">₺{((analysisResults.agentAnalysis?.pricingStrategy?.optimalPrice ?? 0) / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-500">{analysisResults.daysOnMarket ?? 0} gün içinde satış</p>
                </div>
              </div>
              <div className="p-4 bg-primary/50 rounded-xl">
                <p className="text-sm text-gray-400 mb-2">Strateji Önerisi:</p>
                <p className="text-white">{analysisResults.agentAnalysis?.pricingStrategy?.strategy}</p>
              </div>
            </div>
          </div>

          {/* Investment Potential */}
          <div className="bg-surface-card rounded-2xl p-6 mb-6">
            <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-warning" />
              Yatırım Potansiyeli
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-primary/50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Yatırım Getirisi</p>
                <p className={`text-2xl font-bold ${analysisResults.agentAnalysis?.investment?.roi === 'Yüksek' ? 'text-success' : 'text-warning'}`}>
                  {analysisResults.agentAnalysis?.investment?.roi}
                </p>
              </div>
              <div className="bg-primary/50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Kiralama Getirisi</p>
                <p className="text-2xl font-bold text-white">%{analysisResults.agentAnalysis?.investment?.rentalYield}</p>
                <p className="text-xs text-gray-500">Aylık brüt</p>
              </div>
              <div className="bg-primary/50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Değer Artışı</p>
                <p className={`text-2xl font-bold ${analysisResults.agentAnalysis?.investment?.appreciationPotential === 'Yüksek' ? 'text-success' : 'text-gray-400'}`}>
                  {analysisResults.agentAnalysis?.investment?.appreciationPotential}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-warning/10 rounded-xl border border-warning/20">
              <p className="text-sm text-warning font-semibold">Yatırım Değerlendirmesi:</p>
              <p className="text-white mt-1">{analysisResults.agentAnalysis?.investment?.recommendation}</p>
            </div>
          </div>

          {/* Marketing Suggestions */}
          <div className="bg-surface-card rounded-2xl p-6 mb-6">
            <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-400" />
              Pazarlama Önerileri
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-4 bg-primary/50 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">Öne Çıkarılacak Özellikler</p>
                  <div className="flex flex-wrap gap-2">
                    {(analysisResults.agentAnalysis?.marketing?.keyFeatures?.length ?? 0) > 0 ? (
                      analysisResults.agentAnalysis!.marketing!.keyFeatures!.map((feature: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                          {feature}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Konum ve fiyat avantajı</span>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-primary/50 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">Hedef Kitle</p>
                  <p className="text-white">{analysisResults.agentAnalysis?.marketing?.targetAudience}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-primary/50 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">En İyi Listeleme Zamanı</p>
                  <p className="text-accent font-semibold">{analysisResults.agentAnalysis?.marketing?.bestTimeToList}</p>
                </div>
                <div className="p-4 bg-primary/50 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">Önerilen Platformlar</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.agentAnalysis?.marketing?.channels?.map((channel: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Segments */}
          <div className="bg-surface-card rounded-2xl p-6 mb-8">
            <h3 className="font-outfit font-semibold mb-4">Potansiyel Alıcı Profilleri</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {analysisResults.buyerSegments?.map((seg: any, i: number) => (
                <div key={i} className="bg-primary/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{seg.segment}</span>
                    <span className="text-accent font-bold">%{seg.probability}</span>
                  </div>
                  <div className="h-2 bg-primary rounded-full overflow-hidden">
                    <div className={`h-full ${seg.color} rounded-full`} style={{ width: `${seg.probability}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Title Suggestions */}
          <div className="bg-surface-card rounded-2xl p-6 mb-8">
            <h3 className="font-outfit font-semibold mb-4">İlan Başlığı Önerileri</h3>
            <div className="space-y-3">
              {analysisResults.titleSuggestions?.map((title: string, i: number) => (
                <div key={i} className="flex items-center justify-between bg-primary/50 rounded-xl p-4">
                  <span>{title}</span>
                  <button className="btn-secondary text-sm py-2 px-3" onClick={() => navigator.clipboard.writeText(title)}>Kopyala</button>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Analysis */}
          {uploadedImages?.length > 0 && (
            <div className="bg-surface-card rounded-2xl p-6 mb-8">
              <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-accent" />
                Fotoğraf Analizi
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-3">Yüklenen Fotoğraflar</p>
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedImages.slice(0, 6).map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Fotoğraf ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{uploadedImages.length} fotoğraf yüklendi</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Fotoğraf Kalitesi</span>
                      <span className="text-success font-bold">İyi</span>
                    </div>
                    <div className="h-2 bg-primary rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div className="p-4 bg-primary/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Profesyonellik Skoru</span>
                      <span className="text-accent font-bold">%82</span>
                    </div>
                    <div className="h-2 bg-primary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Raporu Sil"
        message="Bu raporu silmek istediğinizden emin misiniz? Silinen raporları geri getiremezsiniz."
        itemName={report.title}
        isLoading={isDeleting}
      />
    </main>
  )
}
