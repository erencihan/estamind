'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  Eye,
  Building2,
  DollarSign,
  Trash2,
  Plus,
  Trash,
  RotateCcw,
  X,
  FileDown,
  Loader2,
  Lock,
} from 'lucide-react'
import DeleteConfirmModal from '@/components/modals/DeleteConfirmModal'
import { downloadReport } from '@/utils/reportGenerator'
import { useAuth } from '@/context/AuthContext'
import {
  getSavedReports,
  addReport,
  removeReportById,
  getReportById,
  type SavedReport,
} from '@/lib/reportsStorage'

const reportTypes = [
  { value: 'all', label: 'Tüm Raporlar', icon: <FileText className="w-4 h-4" /> },
  { value: 'region', label: 'Bölge Raporu', icon: <Building2 className="w-4 h-4" /> },
  { value: 'market', label: 'Pazar Raporu', icon: <BarChart3 className="w-4 h-4" /> },
  { value: 'analysis', label: 'Analiz Raporu', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'investment', label: 'Yatırım Raporu', icon: <DollarSign className="w-4 h-4" /> },
]

type DeletedReport = SavedReport & { deleted_at: string }

export default function ReportsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const planType = user?.plan_type || 'lite'
  const isLite = planType === 'lite'
  const LITE_VISIBLE_REPORT_COUNT = 2
  const [activeTab, setActiveTab] = useState<'active' | 'deleted'>('active')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [reports, setReports] = useState<SavedReport[]>([])
  const [deletedReports, setDeletedReports] = useState<DeletedReport[]>([])
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [reportToDelete, setReportToDelete] = useState<SavedReport | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setReports(getSavedReports())
  }, [])

  const refreshReports = () => setReports(getSavedReports())

  const handleViewReport = (id: string) => {
    if (isLite) {
      const index = filteredReports.findIndex((r) => r.id === id)
      if (index >= LITE_VISIBLE_REPORT_COUNT) {
        router.push('/dashboard/subscription')
        return
      }
    }
    router.push(`/dashboard/reports/${id}`)
  }

  const handleDeleteClick = (report: SavedReport) => {
    setReportToDelete(report)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!reportToDelete) return

    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    removeReportById(reportToDelete.id)
    const deletedEntry: DeletedReport = {
      ...reportToDelete,
      deleted_at: new Date().toISOString().split('T')[0],
    }
    setDeletedReports([deletedEntry, ...deletedReports])
    refreshReports()

    setIsDeleting(false)
    setShowDeleteModal(false)
    setReportToDelete(null)
  }

  const handleRestore = async (report: DeletedReport) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const { deleted_at: _, ...saved } = report
    addReport(saved)
    setDeletedReports(deletedReports.filter((r) => r.id !== report.id))
    refreshReports()
  }

  const handlePermanentDelete = async (report: DeletedReport) => {
    if (!confirm(`"${report.title}" kalıcı olarak silinecek. Emin misiniz?`)) return
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDeletedReports(deletedReports.filter((r) => r.id !== report.id))
  }

  const handleDownload = async (report: SavedReport) => {
    setDownloadingId(report.id)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const fullReport = getReportById(report.id)
    if (fullReport?.formData && fullReport?.analysisResults) {
      const reportData = {
        title: fullReport.title,
        type: fullReport.type,
        date: fullReport.date,
        formData: fullReport.formData,
        analysisResults: fullReport.analysisResults,
        uploadedImages: fullReport.uploadedImages ?? [],
        createdAt: fullReport.createdAt ?? fullReport.date,
      }
      downloadReport(reportData, fullReport.title)
    } else {
      const content = `EMLAK ANALİZ RAPORU
=====================

RAPOR BİLGİLERİ
---------------
Başlık: ${report.title}
Tür: ${report.type}
Tarih: ${report.date}

Bu rapor detaylı analiz verileri içermemektedir.

---
EstaMind
`
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${report.title.replace(/\s+/g, '_')}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    setDownloadingId(null)
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'region' && report.type.includes('Bölge')) ||
      (selectedType === 'market' && report.type.includes('Pazar')) ||
      (selectedType === 'analysis' && report.type.includes('Analiz')) ||
      (selectedType === 'investment' && report.type.includes('Yatırım'))
    return matchesSearch && matchesType
  })

  const filteredDeletedReports = deletedReports.filter((report) =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { label: 'Toplam Rapor', value: String(reports.length), icon: <FileText className="w-6 h-6" />, change: '' },
    { label: 'Bu Ay Üretilen', value: String(reports.length), icon: <Calendar className="w-6 h-6" />, change: '' },
    { label: 'Silinen', value: String(deletedReports.length), icon: <Download className="w-6 h-6" />, change: '' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-outfit font-bold">Raporlar</h1>
          <p className="text-gray-400">Tüm analiz raporlarınızı görüntüleyin</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            className="glass-card rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                {stat.icon}
              </div>
              {stat.change ? (
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                  {stat.change}
                </span>
              ) : null}
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-xl font-outfit font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2 border-b border-glass-border overflow-x-auto -mx-1 px-1 pb-0.5">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-3 sm:px-4 py-3 font-medium transition-colors relative shrink-0 whitespace-nowrap touch-manipulation ${
            activeTab === 'active' 
              ? 'text-accent' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Raporlar
            <span className="text-xs bg-primary px-2 py-0.5 rounded-full">{reports.length}</span>
          </div>
          {activeTab === 'active' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('deleted')}
          className={`px-3 sm:px-4 py-3 font-medium transition-colors relative shrink-0 whitespace-nowrap touch-manipulation ${
            activeTab === 'deleted' 
              ? 'text-error' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Trash className="w-4 h-4" />
            Silinen Raporlar
            <span className="text-xs bg-error/20 px-2 py-0.5 rounded-full text-error">{deletedReports.length}</span>
          </div>
          {activeTab === 'deleted' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-error"
            />
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rapor ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass w-full px-4"
            />
          </div>
          {activeTab === 'active' && (
            <div className="flex flex-col sm:flex-row gap-3 min-w-0">
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-glass w-full sm:w-auto min-w-0"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="input-glass w-full sm:w-auto min-w-0"
              >
                <option value="all">Tüm Zamanlar</option>
                <option value="week">Bu Hafta</option>
                <option value="month">Bu Ay</option>
                <option value="year">Bu Yıl</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Reports List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'active' ? (
            <table className="w-full">
              <thead className="bg-surface-card/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Rapor Adı</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Tarih</th>
                  <th className="text-center p-4 text-sm font-semibold text-accent">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Henüz rapor bulunmuyor.</p>
                      <button
                        onClick={() => router.push('/analysis/new')}
                        className="mt-4 btn-primary flex items-center gap-2 mx-auto"
                      >
                        <Plus className="w-4 h-4" />
                        Yeni Rapor Oluştur
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report, i) => {
                    const isLocked = isLite && i >= LITE_VISIBLE_REPORT_COUNT
                    return (
                    <motion.tr 
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`transition-colors ${isLocked ? 'opacity-75' : 'hover:bg-surface-card/30'}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLocked ? 'bg-primary text-gray-500' : 'bg-accent/20 text-accent'}`}>
                            {isLocked ? <Lock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                          </div>
                          <div>
                            <span className={`font-medium ${isLocked ? 'text-gray-500' : 'text-white'}`}>{report.title}</span>
                            {isLocked && <p className="text-xs text-accent mt-0.5">Pro veya Elite ile aç</p>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-400">{report.date}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {isLocked ? (
                            <button
                              onClick={() => router.push('/dashboard/subscription')}
                              className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                            >
                              <Lock className="w-4 h-4" />
                              Paket Yükselt
                            </button>
                          ) : (
                            <>
                          <button 
                            onClick={() => handleViewReport(report.id)}
                            className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent hover:text-white transition-all"
                            title="Görüntüle"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
<button 
                            onClick={() => handleDownload(report)}
                            disabled={downloadingId === report.id}
                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
                            title="İndir"
                          >
                            {downloadingId === report.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <FileDown className="w-4 h-4" />
                            )}
                          </button>

                          <button 
                            onClick={() => handleDeleteClick(report)}
                            className="p-2 rounded-lg bg-error/20 text-error hover:bg-error hover:text-white transition-all"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )})
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead className="bg-surface-card/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Rapor Adı</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Silinme Tarihi</th>
                  <th className="text-center p-4 text-sm font-semibold text-error">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {filteredDeletedReports.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      <Trash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Silinen rapor bulunmuyor.</p>
                    </td>
                  </tr>
                ) : (
                  filteredDeletedReports.map((report, i) => (
                    <motion.tr 
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-surface-card/30 transition-colors opacity-75"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-error/20 flex items-center justify-center text-error">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-300 line-through">{report.title}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-error">{report.deleted_at}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleRestore(report)}
                            className="p-2 rounded-lg bg-warning/20 text-warning hover:bg-warning hover:text-white transition-all"
                            title="Geri Yükle"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          
                          <button 
                            onClick={() => handlePermanentDelete(report)}
                            className="p-2 rounded-lg bg-error/20 text-error hover:bg-error hover:text-white transition-all"
                            title="Kalıcı Sil"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setReportToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        title="Raporu Sil"
        message="Bu raporu silmek istediğinizden emin misiniz? Silinen raporları 'Silinen Raporlar' bölümünden görüntüleyebilir ve geri yükleyebilirsiniz."
        itemName={reportToDelete?.title}
        isLoading={isDeleting}
      />
    </div>
  )
}
