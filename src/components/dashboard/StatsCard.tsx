'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { fadeInUp } from '@/components/dashboard/motionVariants'

type Props = {
  title: string
  value: string
  change: string
  icon: ReactNode
  trend: 'up' | 'down'
}

export function StatsCard({ title, value, change, icon, trend }: Props) {
  return (
    <motion.div className="glass-card rounded-2xl p-6" variants={fadeInUp}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">{icon}</div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-success' : 'text-error'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-outfit font-bold">{value}</p>
    </motion.div>
  )
}
