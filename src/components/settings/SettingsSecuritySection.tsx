'use client'

import { Key, Shield, Trash2 } from 'lucide-react'

export type SecurityState = {
  twoFactorEnabled: boolean
}

type Props = {
  security: SecurityState
  setSecurity: React.Dispatch<React.SetStateAction<SecurityState>>
  onOpenPasswordModal: () => void
  onOpenDeleteModal: () => void
}

export function SettingsSecuritySection({
  security,
  setSecurity,
  onOpenPasswordModal,
  onOpenDeleteModal,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-dm font-semibold mb-4">Güvenlik Ayarları</h3>
        <p className="text-gray-400 text-sm mb-6">Hesabınızı güvende tutun.</p>
      </div>

      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center text-warning">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-white">Şifre</p>
              <p className="text-sm text-gray-500">Hesap güvenliğinizi korumak için düzenli olarak değiştirin</p>
            </div>
          </div>
          <button type="button" onClick={onOpenPasswordModal} className="btn-secondary">
            Değiştir
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-white">İki Faktörlü Kimlik Doğrulama</p>
              <p className="text-sm text-gray-500">Hesabınıza ekstra güvenlik katmanı ekleyin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })}
            className={`w-12 h-6 rounded-full transition-colors ${
              security.twoFactorEnabled ? 'bg-accent' : 'bg-primary'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <h4 className="font-medium text-white mb-4">Aktif Oturumlar</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface-card rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success" />
              <div>
                <p className="text-white text-sm">Chrome - Windows</p>
                <p className="text-xs text-gray-500">Kadıköy, İstanbul • Şu an aktif</p>
              </div>
            </div>
            <button type="button" className="text-xs text-error">
              Çıkış yap
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface-card rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <div>
                <p className="text-white text-sm">Safari - iPhone</p>
                <p className="text-xs text-gray-500">Kadıköy, İstanbul • 2 saat önce</p>
              </div>
            </div>
            <button type="button" className="text-xs text-error">
              Çıkış yap
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 border border-error/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-error/20 flex items-center justify-center text-error">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-white">Hesabı Sil</p>
              <p className="text-sm text-gray-500">Hesabınızı kalıcı olarak silin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenDeleteModal}
            className="bg-error/20 hover:bg-error/30 text-error px-4 py-2 rounded-lg transition-colors"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}
