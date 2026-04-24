'use client'

import { Bell } from 'lucide-react'

type Props = {
  notificationsEnabled: boolean
  setNotificationsEnabled: (v: boolean) => void
}

export function SettingsNotificationsSection({ notificationsEnabled, setNotificationsEnabled }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-dm font-semibold mb-4">Bildirim Ayarları</h3>
        <p className="text-gray-400 text-sm mb-6">Bildirimleri açıp kapatabilirsiniz.</p>
      </div>

      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-white">Bildirimler</p>
              <p className="text-sm text-gray-500">Tüm bildirimleri açıp kapatın</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 rounded-full transition-colors ${
              notificationsEnabled ? 'bg-accent' : 'bg-primary'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
