'use client'

import type { RefObject } from 'react'
import { Camera, Save, Check } from 'lucide-react'

export type ProfileState = {
  name: string
  email: string
  phone: string
  city: string
  district: string
  company: string
}

type Props = {
  profile: ProfileState
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>
  avatarPreview: string | null
  fileInputRef: RefObject<HTMLInputElement>
  onAvatarClick: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  saved: boolean
  onSave: () => void
}

export function SettingsProfileSection({
  profile,
  setProfile,
  avatarPreview,
  fileInputRef,
  onAvatarClick,
  onFileChange,
  saved,
  onSave,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-outfit font-semibold mb-4">Profil Bilgileri</h3>
        <p className="text-gray-400 text-sm mb-6">Kişisel bilgilerinizi ve iletişim bilgilerinizi güncelleyin.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              profile.name.charAt(0)
            )}
          </div>
          <button
            type="button"
            onClick={onAvatarClick}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-accent/80 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
        </div>
        <div>
          <p className="font-medium text-white">{profile.name}</p>
          <p className="text-sm text-gray-400">{profile.email}</p>
          <button type="button" onClick={onAvatarClick} className="text-sm text-accent mt-1 hover:underline">
            Fotoğraf değiştir
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Ad Soyad</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="input-glass"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">E-posta</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="input-glass"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Telefon</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="input-glass"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Şehir</label>
          <select
            value={profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            className="input-glass"
          >
            <option>İstanbul</option>
            <option>Ankara</option>
            <option>İzmir</option>
            <option>Antalya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">İlçe</label>
          <select
            value={profile.district}
            onChange={(e) => setProfile({ ...profile, district: e.target.value })}
            className="input-glass"
          >
            <option>Kadıköy</option>
            <option>Beşiktaş</option>
            <option>Üsküdar</option>
            <option> Ataşehir</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Şirket</label>
          <input
            type="text"
            value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            className="input-glass"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={onSave} className="btn-primary flex items-center gap-2">
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Kaydedildi!' : 'Kaydet'}
        </button>
      </div>
    </div>
  )
}
