import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE_NAME } from '@/config/constants'
import { runAnalysis } from '@/lib/analysisEngine'
import type { PropertyFormData } from '@/types/database'

/**
 * Sunucu tarafı analiz. OPENAI_API_KEY yalnızca sunucuda okunur (istemciye gitmez).
 * Şu an motor mock; anahtar tanımlı olsa bile gerçek LLM çağrısı ileride analysisEngine’e eklenecek.
 */
export async function POST(request: NextRequest) {
  if (!request.cookies.get(SESSION_COOKIE_NAME)?.value) {
    return NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 })
  }

  let body: PropertyFormData
  try {
    body = (await request.json()) as PropertyFormData
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek gövdesi' }, { status: 400 })
  }

  const results = runAnalysis(body)
  return NextResponse.json({ results })
}
