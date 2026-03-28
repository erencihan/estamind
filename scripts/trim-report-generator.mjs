import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const p = path.join(__dirname, '../src/utils/reportGenerator.ts')
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/)
const keep = [...lines.slice(0, 46), ...lines.slice(734)]
fs.writeFileSync(p, keep.join('\n'), 'utf8')
console.log('trimmed', { before: lines.length, after: keep.length })
