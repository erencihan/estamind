import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pagePath = path.join(__dirname, '../src/app/analysis/new/page.tsx')
const lines = fs.readFileSync(pagePath, 'utf8').split(/\r?\n/)

// 0-based: `<main` at line 158 → index 157; kapanış `)` satırı 590 → slice sonu 590 (exclusive) → index 589 son
const resultsLines = lines.slice(157, 590)
fs.writeFileSync(
  path.join(__dirname, '../src/components/analysis/_results_raw.txt'),
  resultsLines.join('\n'),
  'utf8'
)
console.log('extracted', resultsLines.length, 'lines')
