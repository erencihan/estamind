'use client'

import { useRouter } from 'next/navigation'
import { FileText, ChevronRight } from 'lucide-react'

type Props = {
  title: string
  type: string
  date: string
  views: number
}

export function RecentReportRow({ title, type, date, views }: Props) {
  const router = useRouter()

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && router.push('/dashboard/reports')}
      className="flex items-center gap-4 p-4 bg-surface-card rounded-xl hover:bg-surface-card/80 transition-colors cursor-pointer group"
      onClick={() => router.push('/dashboard/reports')}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
        <FileText className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate">{title}</p>
        <p className="text-sm text-gray-500">
          {type} • {date}
        </p>
      </div>
      <div className="text-right">
        <p className="font-mono font-semibold text-white">{views}</p>
        <span className="text-xs text-gray-500">görüntülenme</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
    </div>
  )
}
