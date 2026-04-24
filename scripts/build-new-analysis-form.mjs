import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pagePath = path.join(__dirname, '../src/app/analysis/new/page.tsx')
const lines = fs.readFileSync(pagePath, 'utf8').split(/\r?\n/)
// 594–1010 satır (1-based): `<main` … `</main>` — 0-based index 593..1009
const formLines = lines.slice(593, 1010)
let body = formLines.join('\n')
body = body.replace(/\n\s*\)\s*$/m, '\n')

const header = `'use client'

import {
  Brain,
  Camera,
  Loader2,
  ArrowRight,
  Upload,
} from 'lucide-react'
import type { User } from '@/types/database'
import {
  propertyTypes,
  cities,
  districts,
  neighborhoods,
  buildingTypes,
  heatingTypes,
  facades,
} from '@/data/analysisFormData'
import type { AnalysisFormBag } from '@/hooks/useAnalysisForm'

export interface NewAnalysisFormProps {
  user: User
  form: AnalysisFormBag
}

export function NewAnalysisForm({ user, form }: NewAnalysisFormProps) {
  const {
    isAnalyzing,
    formData,
    setFormData,
    uploadedImages,
    isUploading,
    formatPriceDisplay,
    handlePriceChange,
    handleImageUpload,
    removeImage,
    handleChange,
    toggleFeature,
    handleAnalyze,
  } = form

  return (
`

const footer = `  )
}
`

const out = header + body + footer
const outPath = path.join(__dirname, '../src/components/analysis/NewAnalysisForm.tsx')
fs.writeFileSync(outPath, out, 'utf8')
console.log('Wrote', outPath, 'lines', formLines.length)
