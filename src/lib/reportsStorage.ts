/**
 * Raporların localStorage ile okunup yazılması.
 * Canlıda backend API'ye geçildiğinde sadece bu dosya değiştirilir.
 */

import { STORAGE_KEYS } from '@/config/constants'

export interface SavedReport {
  id: string
  title: string
  type: string
  date: string
  formData: Record<string, unknown>
  analysisResults: Record<string, unknown>
  uploadedImages?: string[]
  createdAt?: string
}

export function getSavedReports(): SavedReport[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_REPORTS)
    const parsed = raw ? JSON.parse(raw) : []
    const list = Array.isArray(parsed) ? parsed : []
    return list.map((r: SavedReport & { id?: string | number }) => ({
      ...r,
      id: String(r.id ?? ''),
    })) as SavedReport[]
  } catch {
    return []
  }
}

export function setSavedReports(reports: SavedReport[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.SAVED_REPORTS, JSON.stringify(reports))
}

export function addReport(report: SavedReport): void {
  const existing = getSavedReports()
  setSavedReports([report, ...existing])
}

export function removeReportById(id: string): void {
  const reports = getSavedReports().filter((r) => r.id !== id)
  setSavedReports(reports)
}

export function getReportById(id: string): SavedReport | undefined {
  const idStr = String(id)
  return getSavedReports().find((r) => r.id === idStr || String(r.id) === idStr)
}
