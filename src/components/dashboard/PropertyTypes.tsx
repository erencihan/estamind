'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { propertyTypeData } from '@/components/dashboard/dashboardData'

export function PropertyTypes() {
  const getBarColor = (trend: 'up' | 'down') => {
    return trend === 'up'
      ? 'bg-gradient-to-r from-accent to-accent-light'
      : 'bg-gradient-to-r from-error to-orange-400'
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-outfit font-semibold text-lg">Emlak Türleri</h3>
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
              <motion.div
                className={`h-full ${getBarColor(item.trend)} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
