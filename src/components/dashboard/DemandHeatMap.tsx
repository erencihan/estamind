'use client'

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
    <div className="glass-card rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-dm font-semibold text-lg">Talep Haritası</h3>
          <p className="text-sm text-gray-500">Bölgesel analiz</p>
        </div>
        <button type="button" className="text-accent text-sm hover:underline self-start sm:self-auto">
          Detaylı
        </button>
      </div>

      <div className="space-y-4">
        {areas.map((area, i) => (
          <div key={i} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
              <span className="text-gray-300 break-words">{area.name}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`w-2 h-2 rounded-full ${getDemandColor(area.demand)}`} />
                <span className="font-mono text-gray-400">{area.demand}%</span>
                {area.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-success" />}
                {area.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-error" />}
              </div>
            </div>
            <div className="h-2 bg-primary rounded-full overflow-hidden">
              <div className={`h-full ${getDemandColor(area.demand)} rounded-full`} style={{ width: `${area.demand}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
