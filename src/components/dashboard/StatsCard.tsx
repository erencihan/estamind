'use client'

import type { ReactNode } from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

type Props = {
  title: string
  value: string
  change: string
  icon: ReactNode
  trend: 'up' | 'down'
}

export function StatsCard({ title, value, change, icon, trend }: Props) {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center text-accent">{icon}</div>
        <div className={`flex items-center gap-1 text-sm shrink-0 ${trend === 'up' ? 'text-success' : 'text-error'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-xl sm:text-2xl font-dm font-bold break-words">{value}</p>
    </div>
  )
}
