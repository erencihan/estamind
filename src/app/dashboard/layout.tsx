'use client'

import AuthenticatedLayout, { defaultMenuItems } from '@/components/layout/AuthenticatedLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout menuItems={defaultMenuItems}>
      {children}
    </AuthenticatedLayout>
  )
}
