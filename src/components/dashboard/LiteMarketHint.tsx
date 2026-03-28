'use client'

import { Lock, ChevronRight } from 'lucide-react'

type Props = {
  onUpgrade: () => void
}

export function LiteMarketHint({ onUpgrade }: Props) {
  return (
    <div
      className="mb-6 p-4 rounded-xl bg-primary/50 border border-glass-border flex items-center justify-between cursor-pointer hover:border-accent/50 transition-colors"
      onClick={onUpgrade}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onUpgrade()}
    >
      <div className="flex items-center gap-3">
        <Lock className="w-5 h-5 text-accent" />
        <span className="text-gray-400">Detaylı piyasa verileri ve talep haritası Pro/Elite planında.</span>
      </div>
      <span className="text-accent text-sm font-semibold flex items-center gap-1">
        Yükselt <ChevronRight className="w-4 h-4" />
      </span>
    </div>
  )
}
