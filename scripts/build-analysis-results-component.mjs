import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raw = path.join(__dirname, '../src/components/analysis/_results_raw.txt')
let body = fs.readFileSync(raw, 'utf8')
// Son satır `    )` sayfa return'ünden kaldı
body = body.replace(/\n\s*\)\s*$/m, '\n')

// Uzun indir/kaydet bloklarını kısa handler'lara çevir
body = body.replace(
  /<button\s*\n\s*onClick=\{async \(\) => \{[\s\S]*?<Download className="w-5 h-5" \/>[\s\S]*?<\/button>/m,
  `<button 
                onClick={() => void downloadPdf()}
                className="btn-primary flex-1 py-4 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                İndir
              </button>`
)

body = body.replace(
  /<button\s*\n\s*onClick=\{\(\) => \{[\s\S]*?<Save className="w-5 h-5" \/>[\s\S]*?<\/button>/m,
  `<button
                onClick={saveReportToStorage}
                className="btn-secondary flex-1 py-4 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Raporu Kaydet
              </button>`
)

const header = `'use client'

import {
  Brain,
  MapPin,
  BarChart3,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Sparkles,
  Camera,
  Download,
  Save,
} from 'lucide-react'
import type { PropertyFormData } from '@/types/database'
import type { AnalysisResult } from '@/lib/analysisEngine'

export interface AnalysisResultsViewProps {
  formData: PropertyFormData
  analysisResults: AnalysisResult
  uploadedImages: string[]
  isLite: boolean
  setShowResults: (show: boolean) => void
  toastMessage: string | null
  downloadPdf: () => Promise<void>
  saveReportToStorage: () => void
}

export function AnalysisResultsView({
  formData,
  analysisResults,
  uploadedImages,
  isLite,
  setShowResults,
  toastMessage,
  downloadPdf,
  saveReportToStorage,
}: AnalysisResultsViewProps) {
  return (
`

const footer = `  )
}
`

const out = header + body + footer
const outPath = path.join(__dirname, '../src/components/analysis/AnalysisResultsView.tsx')
fs.writeFileSync(outPath, out, 'utf8')
console.log('Wrote', outPath)
