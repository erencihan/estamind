import { User, Bell, Shield, CreditCard } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SettingsNavItem {
  id: string
  label: string
  Icon: LucideIcon
}

export const settingsNavItems: SettingsNavItem[] = [
  { id: 'profile', label: 'Profil', Icon: User },
  { id: 'notifications', label: 'Bildirimler', Icon: Bell },
  { id: 'security', label: 'Güvenlik', Icon: Shield },
  { id: 'subscription', label: 'Abonelik', Icon: CreditCard },
]
