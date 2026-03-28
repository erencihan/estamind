'use client'

import { motion } from 'framer-motion'
import { Crown, Sparkles, ChevronRight } from 'lucide-react'

type Props = {
  creditsLeft: number
  onUpgrade: () => void
}

export function LiteUpgradeBanner({ creditsLeft, onUpgrade }: Props) {
  return (
    <motion.div className="mb-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <div
        className="rounded-2xl p-6 border border-accent/40 bg-gradient-to-r from-accent/20 via-purple-500/20 to-accent/10 cursor-pointer hover:border-accent/60 transition-colors"
        onClick={onUpgrade}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onUpgrade()}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent/30 flex items-center justify-center">
              <Crown className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="font-outfit font-semibold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Pro veya Elite ile Daha Fazlasına Erişin
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Sınırsız analiz, PDF rapor, WhatsApp paylaşım ve alıcı segmentasyonu. Lite planında sadece {creditsLeft}{' '}
                analiz hakkınız kaldı.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-accent font-semibold">Paketi Yükselt</span>
            <ChevronRight className="w-5 h-5 text-accent" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
