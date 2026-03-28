'use client'

import { motion } from 'framer-motion'
import { Building, Users, Clock, BarChart3 } from 'lucide-react'

export function AgentMarketStats() {
  const stats = [
    { label: 'Aktif İlan Sayısı', value: '156,234', change: '+12%', trend: 'up' as const, icon: <Building className="w-5 h-5" /> },
    { label: 'Bu Ay Satılan', value: '8,456', change: '+23%', trend: 'up' as const, icon: <Users className="w-5 h-5" /> },
    { label: 'Ortalama Satış Süresi', value: '48 gün', change: '-5 gün', trend: 'up' as const, icon: <Clock className="w-5 h-5" /> },
    { label: 'Metrekare Ortalaması', value: '₺28,500', change: '+15%', trend: 'up' as const, icon: <BarChart3 className="w-5 h-5" /> },
  ]

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-outfit font-semibold text-lg">Piyasa İstatistikleri</h3>
          <p className="text-sm text-gray-500">Emlakçılar için genel veriler</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-surface-card rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">{stat.icon}</div>
            </div>
            <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="font-mono font-bold text-lg text-white">{stat.value}</p>
              <span className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
