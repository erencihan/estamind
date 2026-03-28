'use client'

import Link from 'next/link'
import { Menu, Search, Bell, PlusCircle } from 'lucide-react'
import AuthenticatedLayout, {
  type MenuItemConfig,
  type HeaderSlotProps,
} from '@/components/layout/AuthenticatedLayout'
import { LayoutDashboard, Building2, PlusCircle as PlusCircleIcon, FileText, Settings } from 'lucide-react'

const analysisMenuItems: MenuItemConfig[] = [
  { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
  { id: 'listings', icon: <Building2 className="w-5 h-5" />, label: 'İlanlarım', path: '/dashboard/listings' },
  { id: 'analysis', icon: <PlusCircleIcon className="w-5 h-5" />, label: 'Yeni Analiz', path: '/analysis/new' },
  { id: 'reports', icon: <FileText className="w-5 h-5" />, label: 'Raporlar', path: '/dashboard/reports' },
  { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Ayarlar', path: '/dashboard/settings' },
]

function AnalysisHeader({ onMenuClick }: HeaderSlotProps) {
  return (
    <>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-card rounded-xl">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="İlan ara..."
            className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-gray-500"
          />
          <kbd className="px-2 py-1 text-xs bg-primary rounded text-gray-500">⌘K</kbd>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
        </button>
        <Link href="/analysis/new" className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Yeni Analiz</span>
        </Link>
      </div>
    </>
  )
}

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout menuItems={analysisMenuItems} headerSlot={AnalysisHeader}>
      {children}
    </AuthenticatedLayout>
  )
}
