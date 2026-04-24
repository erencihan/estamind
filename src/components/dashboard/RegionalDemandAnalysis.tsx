'use client'

import { regionalDemandRows } from '@/components/dashboard/dashboardData'

export function RegionalDemandAnalysis() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-dm font-semibold text-lg mb-4">Bölgesel Talep Analizi</h3>
      <div className="space-y-4">
        {regionalDemandRows.map((item, i) => (
          <div key={i} className="p-4 bg-surface-card rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="font-medium text-white break-words">{item.region}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold self-start sm:self-auto ${
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-gray-500">
              <span>{item.supply} aktif ilan</span>
              <span>{item.avgPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
