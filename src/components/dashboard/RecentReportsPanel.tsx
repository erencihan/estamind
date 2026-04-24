'use client'

import { useRouter } from 'next/navigation'
import { RecentReportRow } from '@/components/dashboard/RecentReportRow'
import { mockRecentReports } from '@/components/dashboard/dashboardData'

export function RecentReportsPanel() {
  const router = useRouter()

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-dm font-semibold text-lg">Son Raporlar</h3>
        <button type="button" onClick={() => router.push('/dashboard/reports')} className="text-accent text-sm hover:underline">
          Tüm Raporlar
        </button>
      </div>
      <div className="space-y-3">
        {mockRecentReports.map((report, i) => (
          <RecentReportRow key={i} {...report} />
        ))}
      </div>
    </div>
  )
}
