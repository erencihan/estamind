'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function DemandHeatMap() {
  const areas = [
    { name: 'Kadıköy Merkez', demand: 95, trend: 'up' as const },
    { name: 'Bağdat Caddesi', demand: 88, trend: 'up' as const },
    { name: 'Sahil', demand: 72, trend: 'stable' as const },
    { name: 'Moda', demand: 65, trend: 'down' as const },
    { name: 'Çamlıca', demand: 58, trend: 'stable' as const },
  ]

  const getDemandColor = (demand: number) => {
    if (demand >= 80) return 'bg-success'
    if (demand >= 60) return 'bg-accent'
    if (demand >= 40) return 'bg-warning'
    return 'bg-error'
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-outfit font-semibold text-lg">Talep Haritası</h3>
          <p className="text-sm text-gray-500">Bölgesel analiz</p>
        </div>
        <button type="button" className="text-accent text-sm hover:underline">
          Detaylı
        </button>
      </div>

      <div className="space-y-4">
        {areas.map((area, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{area.name}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getDemandColor(area.demand)}`} />
                <span className="font-mono text-gray-400">{area.demand}%</span>
                {area.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-success" />}
                {area.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-error" />}
              </div>
            </div>
            <div className="h-2 bg-primary rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${getDemandColor(area.demand)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${area.demand}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
