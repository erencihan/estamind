import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const src = fs.readFileSync(path.join(root, 'src/utils/reportGenerator.ts'), 'utf8')
const fnStart = src.indexOf('export function generateProfessionalReport')
if (fnStart < 0) throw new Error('generateProfessionalReport not found')
const ret = src.indexOf('return `<!DOCTYPE html>', fnStart)
if (ret < 0) throw new Error('return `<!DOCTYPE html> not found')
const start = ret + 'return `'.length
const htmlEnd = src.indexOf('</html>', start)
if (htmlEnd < 0) throw new Error('</html> not found')
const closeTick = src.indexOf('`', htmlEnd)
if (closeTick < 0) throw new Error('closing backtick not found')
const templateInner = src.slice(start, closeTick)

const header = `import type { ReportData, ReportFormatters } from '@/types/report'

/**
 * Profesyonel HTML rapor gövdesi (PDF/html2pdf ile uyumlu).
 */
export function renderProfessionalReportHtml(
  report: ReportData,
  fmt: ReportFormatters
): string {
  const { formData, analysisResults, createdAt } = report
  const { formatCurrency, formatPrice, getTrendIcon, getTrendText } = fmt
  return \``

const footer = `\`\n}\n`
fs.writeFileSync(path.join(root, 'src/utils/reportTemplates.ts'), header + templateInner + footer, 'utf8')
console.log('Wrote reportTemplates.ts', { bytes: templateInner.length })
