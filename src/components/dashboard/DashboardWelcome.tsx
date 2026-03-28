'use client'

import { motion } from 'framer-motion'

type Props = {
  userName: string
  isLite: boolean
  creditsLeft: number
}

export function DashboardWelcome({ userName, isLite, creditsLeft }: Props) {
  return (
    <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-outfit font-bold mb-2">Hoş Geldiniz, {userName} 👋</h1>
      <p className="text-gray-400">
        {isLite
          ? `Lite planındasınız. Bu ay ${creditsLeft} analiz hakkınız var. Daha fazlası için paketi yükseltin.`
          : `Platform üzerinde 24 rapor oluşturdunuz. 3 yeni rapor hazır.`}
      </p>
    </motion.div>
  )
}
