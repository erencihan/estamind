'use client'

import { useAuth } from '@/context/AuthContext'
import { useAnalysisForm } from '@/hooks/useAnalysisForm'
import { AnalysisResultsView } from '@/components/analysis/AnalysisResultsView'
import { NewAnalysisForm } from '@/components/analysis/NewAnalysisForm'

export default function NewAnalysisPage() {
  const { user } = useAuth()
  const form = useAnalysisForm()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Bu sayfaya erişmek için giriş yapmalısınız</p>
          <a href="/login?next=/analysis/new" className="btn-primary">
            Giriş Yap
          </a>
        </div>
      </div>
    )
  }

  if (form.showResults && form.analysisResults) {
    return (
      <AnalysisResultsView
        formData={form.formData}
        analysisResults={form.analysisResults}
        uploadedImages={form.uploadedImages}
        isLite={user.plan_type === 'lite'}
        setShowResults={form.setShowResults}
        toastMessage={form.toastMessage}
        downloadPdf={form.downloadPdf}
        saveReportToStorage={form.saveReportToStorage}
      />
    )
  }

  return <NewAnalysisForm user={user} form={form} />
}
