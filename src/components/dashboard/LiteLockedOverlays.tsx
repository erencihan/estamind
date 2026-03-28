'use client'

import { Lock } from 'lucide-react'

type Props = { isLite: boolean; onUpgrade: () => void }

export function LiteMarketDataOverlay({ isLite, onUpgrade }: Props) {
  if (!isLite) return null
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={onUpgrade}
      role="presentation"
    >
      <div className="text-center p-6">
        <Lock className="w-12 h-12 text-accent mx-auto mb-3" />
        <p className="text-white font-semibold mb-1">Piyasa Verileri Pro/Elite&apos;da</p>
        <p className="text-gray-400 text-sm mb-4">Fiyat trendi ve talep haritasına erişmek için paketi yükseltin.</p>
        <button type="button" className="btn-primary py-2 px-6">
          Paketi Yükselt
        </button>
      </div>
    </div>
  )
}

export function LiteAgentStatsOverlay({ isLite, onUpgrade }: Props) {
  if (!isLite) return null
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm cursor-pointer min-h-[120px]"
      onClick={onUpgrade}
      role="presentation"
    >
      <div className="flex items-center gap-2 text-accent font-semibold">
        <Lock className="w-5 h-5" />
        Pro/Elite ile Piyasa İstatistikleri
      </div>
    </div>
  )
}

export function LiteChartsOverlay({ isLite, onUpgrade }: Props) {
  if (!isLite) return null
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm cursor-pointer"
      onClick={onUpgrade}
      role="presentation"
    >
      <div className="flex items-center gap-2 text-accent font-semibold">
        <Lock className="w-5 h-5" />
        Fiyat Trendi ve Talep Haritası Pro/Elite&apos;da
      </div>
    </div>
  )
}
