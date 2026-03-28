'use client'

import { regionalDemandRows } from '@/components/dashboard/dashboardData'

export function RegionalDemandAnalysis() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-outfit font-semibold text-lg mb-4">Bölgesel Talep Analizi</h3>
      <div className="space-y-4">
        {regionalDemandRows.map((item, i) => (
          <div key={i} className="p-4 bg-surface-card rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-white">{item.region}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.demand >= 80
                    ? 'bg-success/20 text-success'
                    : item.demand >= 60
                      ? 'bg-accent/20 text-accent'
                      : 'bg-warning/20 text-warning'
                }`}
              >
                %{item.demand} Talep
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{item.supply} aktif ilan</span>
              <span>{item.avgPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
