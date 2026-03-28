/**
 * Professional Report Generator
 * Generates downloadable HTML reports that can be easily saved as PDF
 */

import type { ReportData } from '@/types/report'
import { renderProfessionalReportHtml } from '@/utils/reportTemplates'

export type { ReportData } from '@/types/report'

export function generateProfessionalReport(report: ReportData): string {
  const formatCurrency = (value: number | undefined) => {
    if (!value) return 'N/A'
    return `₺${value.toLocaleString('tr-TR')}`
  }

  const formatPrice = (value: number | undefined) => {
    if (!value) return 'N/A'
    if (value >= 1000000) {
      return `₺${(value / 1000000).toFixed(1)}M`
    }
    return `₺${(value / 1000).toFixed(0)}K`
  }

  const getTrendIcon = (trend: string | undefined) => {
    switch (trend) {
      case 'up': return '↑'
      case 'down': return '↓'
      default: return '→'
    }
  }

  const getTrendText = (trend: string | undefined) => {
    switch (trend) {
      case 'up': return 'Yükseliş'
      case 'down': return 'Düşüş'
      default: return 'Stabil'
    }
  }

  return renderProfessionalReportHtml(report, {
    formatCurrency,
    formatPrice,
    getTrendIcon,
    getTrendText,
  })
}

export function downloadReport(report: ReportData, filename?: string): void {
  const htmlContent = generateProfessionalReport(report)
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  
  const safeFilename = filename || report.title || 'rapor'
  a.href = url
  a.download = `${safeFilename.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`
  
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function generateSimpleReport(report: ReportData): string {
  const { formData, analysisResults, createdAt } = report
  
  return `EMLAK ANALİZ RAPORU
=====================

RAPOR BİLGİLERİ
---------------
Başlık: ${report.title}
Tür: ${report.type}
Tarih: ${createdAt || report.date}
Konum: ${formData.city} / ${formData.district}

MÜLK BİLGİLERİ
--------------
Mülk Türü: ${formData.property_type}
Net Alan: ${formData.area_sqm} m²
Oda Sayısı: ${formData.room_count}+1
Banyo Sayısı: ${formData.bathroom_count}

FİYAT ANALİZİ
-------------
İlçe Ortalama: ₺${analysisResults.districtAvgPricePerSqm?.toLocaleString()}/m²
Bu Mülkün m² Fiyatı: ₺${analysisResults.pricePerSqm?.toLocaleString()}/m²
İl Geneli Ortalama: ₺${analysisResults.agentAnalysis?.marketComparison?.cityAvg?.toLocaleString()}/m²

AI Önerilen Fiyat Aralığı: ₺${analysisResults.suggestedPriceMin?.toLocaleString()} - ₺${analysisResults.suggestedPriceMax?.toLocaleString()}

PAZAR ANALİZİ
-------------
Talep Seviyesi: ${analysisResults.demandLevel}
Tahmini Satış Süresi: ${analysisResults.daysOnMarket} gün
Aktif İlan Sayısı: ${analysisResults.districtData?.totalListings}

YATIRIM POTANSİYELİ
-------------------
Yatırım Getirisi: ${analysisResults.agentAnalysis?.investment?.roi}
Kiralama Getirisi: %${analysisResults.agentAnalysis?.investment?.rentalYield}
Değer Artışı: ${analysisResults.agentAnalysis?.investment?.appreciationPotential}

---
Bu rapor EstaMind tarafından oluşturulmuştur.
Tarih: ${createdAt || report.date}
`
}

export function downloadSimpleReport(report: ReportData): void {
  const textContent = generateSimpleReport(report)
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  
  const safeFilename = report.title || 'rapor'
  a.href = url
  a.download = `${safeFilename.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`
  
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Downloads the report as a PDF file directly
 * Uses html2pdf.js with an iframe so the full HTML document (with styles) is rendered correctly
 */
export async function downloadReportAsPDF(report: ReportData, filename?: string): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default
  const htmlContent = generateProfessionalReport(report)

  const iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.left = '-9999px'
  iframe.style.top = '0'
  iframe.style.width = '800px'
  iframe.style.height = '1200px'
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument || iframe.contentWindow?.document
  if (!doc) {
    document.body.removeChild(iframe)
    throw new Error('İframe dokümanı oluşturulamadı')
  }
  doc.open()
  doc.write(htmlContent)
  doc.close()

  await new Promise<void>((resolve) => {
    iframe.onload = () => resolve()
    if (doc.readyState === 'complete') resolve()
    else setTimeout(resolve, 300)
  })

  const printButton = doc.querySelector('.print-button') as HTMLElement
  if (printButton) printButton.style.display = 'none'

  const safeFilename = filename || report.title || 'rapor'
  const pdfFilename = `${safeFilename.replace(/\s+/g, '_').replace(/[/]/g, '-')}_${new Date().toISOString().split('T')[0]}.pdf`
  const opt = {
    margin: 10,
    filename: pdfFilename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
  }

  try {
    await html2pdf().set(opt).from(doc.body).save()
  } finally {
    document.body.removeChild(iframe)
  }
}
