'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { popularSearchTerms } from '@/components/dashboard/dashboardData'

export function PopularSearchTerms() {
  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <h3 className="font-outfit font-semibold text-lg mb-4">Popüler Arama Terimleri</h3>
      <div className="space-y-3">
        {popularSearchTerms.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-surface-card rounded-xl hover:bg-primary-light/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-accent font-bold">#{i + 1}</span>
              <span className="text-sm text-gray-300">{item.term}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{item.searches.toLocaleString()}</span>
              {item.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-success" />}
              {item.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-error" />}
              {item.trend === 'stable' && <span className="text-gray-500">-</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
