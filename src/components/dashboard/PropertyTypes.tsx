'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { propertyTypeData } from '@/components/dashboard/dashboardData'

export function PropertyTypes() {
  const getBarColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'bg-accent' : 'bg-error'
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-dm font-semibold text-lg">Emlak Türleri</h3>
          <p className="text-sm text-gray-500">Piyasa dağılımı</p>
        </div>
      </div>

      <div className="space-y-4">
        {propertyTypeData.map((item, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-300">{item.type}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{item.percentage}%</span>
                {item.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3 text-success" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-error" />
                )}
              </div>
            </div>
            <div className="h-2 bg-primary rounded-full overflow-hidden">
              <div className={`h-full ${getBarColor(item.trend)} rounded-full`} style={{ width: `${item.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
