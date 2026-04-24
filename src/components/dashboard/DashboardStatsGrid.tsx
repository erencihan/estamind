'use client'

import { FileText, Calendar } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { mockRecentReports } from '@/components/dashboard/dashboardData'

type Props = {
  isLite: boolean
  creditsLeft: number
  monthlyCredits: number
}

export function DashboardStatsGrid({ isLite, creditsLeft, monthlyCredits }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <StatsCard
        title="Toplam Rapor"
        value={isLite ? String(Math.min(3, mockRecentReports.length)) : '24'}
        change={isLite ? 'Lite' : '+5'}
        icon={<FileText className="w-6 h-6" />}
        trend="up"
      />
      <StatsCard
        title={isLite ? 'Kalan Analiz' : 'Bu Ay Üretilen'}
        value={isLite ? String(creditsLeft) : '8'}
        change={isLite ? `/ ${monthlyCredits}` : '+3'}
        icon={<Calendar className="w-6 h-6" />}
        trend="up"
      />
    </div>
  )
}
