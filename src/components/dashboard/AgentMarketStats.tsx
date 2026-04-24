'use client'

import { Building, Users, Clock, BarChart3 } from 'lucide-react'

export function AgentMarketStats() {
  const stats = [
    { label: 'Aktif İlan Sayısı', value: '156,234', change: '+12%', trend: 'up' as const, icon: <Building className="w-5 h-5" /> },
    { label: 'Bu Ay Satılan', value: '8,456', change: '+23%', trend: 'up' as const, icon: <Users className="w-5 h-5" /> },
    { label: 'Ortalama Satış Süresi', value: '48 gün', change: '-5 gün', trend: 'up' as const, icon: <Clock className="w-5 h-5" /> },
    { label: 'Metrekare Ortalaması', value: '₺28,500', change: '+15%', trend: 'up' as const, icon: <BarChart3 className="w-5 h-5" /> },
  ]

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-dm font-semibold text-lg">Piyasa İstatistikleri</h3>
          <p className="text-sm text-gray-500">Emlakçılar için genel veriler</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-surface-card rounded-xl border border-glass-border">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">{stat.icon}</div>
            </div>
            <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="font-mono font-bold text-lg text-white break-words">{stat.value}</p>
              <span className={`text-xs shrink-0 ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
