'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  FileText,
  Settings,
  LogOut,
  Menu,
  CreditCard,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export type MenuItemConfig = {
  id: string
  icon: React.ReactNode
  label: string
  path: string
}

export const defaultMenuItems: MenuItemConfig[] = [
  { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
  { id: 'analysis', icon: <PlusCircle className="w-5 h-5" />, label: 'Yeni Analiz', path: '/analysis/new' },
  { id: 'reports', icon: <FileText className="w-5 h-5" />, label: 'Raporlar', path: '/dashboard/reports' },
  { id: 'subscription', icon: <CreditCard className="w-5 h-5" />, label: 'Abonelik', path: '/dashboard/subscription' },
  { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Ayarlar', path: '/dashboard/settings' },
]

function Sidebar({
  isOpen,
  setIsOpen,
  menuItems = defaultMenuItems,
}: {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  menuItems?: MenuItemConfig[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(path)
  }

  const handleNavigation = (item: MenuItemConfig) => {
    setIsOpen(false)
    router.push(item.path)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] glass border-r border-glass-border z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-warning flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-outfit font-bold">
                Esta<span className="text-accent">Mind</span>
              </span>
            </Link>
          </div>
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-accent/20 text-accent'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </nav>
          <div className="pt-6 border-t border-glass-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{user?.name || 'Kullanıcı'}</p>
                <p className="text-xs text-gray-500">
                  {user?.plan_type === 'pro' ? 'Pro Plan' : user?.plan_type === 'elite' ? 'Elite Plan' : 'Lite Plan'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export type HeaderSlotProps = {
  onMenuClick: () => void
}

type AuthenticatedLayoutProps = {
  children: React.ReactNode
  menuItems?: MenuItemConfig[]
  /** Özel header; onMenuClick mobil menü butonu için kullanılır */
  headerSlot?: (props: HeaderSlotProps) => React.ReactNode
}

export default function AuthenticatedLayout({
  children,
  menuItems = defaultMenuItems,
  headerSlot,
}: AuthenticatedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-dark">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} menuItems={menuItems} />
      <div className="lg:ml-[280px]">
        <header className="min-h-[3.5rem] sm:h-20 px-4 sm:px-6 py-3 sm:py-0 flex items-center justify-between gap-2 border-b border-glass-border bg-surface-dark/50 backdrop-blur-xl sticky top-0 z-30 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-0">
          {headerSlot ? (
            headerSlot({ onMenuClick: () => setSidebarOpen(true) })
          ) : (
            <>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden md:flex items-center flex-1 min-w-0">
                <p className="text-gray-300 text-sm font-outfit font-medium leading-snug px-4 py-2.5 rounded-xl bg-surface-card/80 border border-glass-border/80 max-w-2xl">
                  Mülk bilgisi veya ilan linki girin, yapay zeka saniyeler içinde fiyat ve strateji önerisi sunsun.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link href="/analysis/new" className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Yeni Analiz</span>
                </Link>
              </div>
            </>
          )}
        </header>
        <main className="p-4 sm:p-6 max-w-[100vw] overflow-x-hidden pb-[max(1.5rem,env(safe-area-inset-bottom))]">{children}</main>
      </div>
    </div>
  )
}
