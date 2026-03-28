'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { settingsNavItems } from '@/components/settings/settingsNav'
import { PasswordChangeModal } from '@/components/settings/PasswordChangeModal'
import { DeleteAccountModal } from '@/components/settings/DeleteAccountModal'
import { PaymentModal } from '@/components/settings/PaymentModal'
import { SettingsProfileSection } from '@/components/settings/SettingsProfileSection'
import { SettingsNotificationsSection } from '@/components/settings/SettingsNotificationsSection'
import { SettingsSecuritySection } from '@/components/settings/SettingsSecuritySection'
import { SettingsSubscriptionSection } from '@/components/settings/SettingsSubscriptionSection'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState('profile')
  const [saved, setSaved] = useState(false)

  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [profile, setProfile] = useState({
    name: user?.name || 'Ahmet Yılmaz',
    email: user?.email || 'ahmet@example.com',
    phone: '+90 532 123 45 67',
    city: 'İstanbul',
    district: 'Kadıköy',
    company: 'EstaMind Emlak',
  })

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteAccount = () => {
    logout()
    setShowDeleteModal(false)
  }

  const handleUpgrade = (planName: string, planPrice: string) => {
    setSelectedPlan({ name: planName, price: planPrice })
    setShowPaymentModal(true)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <SettingsProfileSection
            profile={profile}
            setProfile={setProfile}
            avatarPreview={avatarPreview}
            fileInputRef={fileInputRef}
            onAvatarClick={handleAvatarClick}
            onFileChange={handleFileChange}
            saved={saved}
            onSave={handleSave}
          />
        )
      case 'notifications':
        return (
          <SettingsNotificationsSection
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
          />
        )
      case 'security':
        return (
          <SettingsSecuritySection
            security={security}
            setSecurity={setSecurity}
            onOpenPasswordModal={() => setShowPasswordModal(true)}
            onOpenDeleteModal={() => setShowDeleteModal(true)}
          />
        )
      case 'subscription':
        return <SettingsSubscriptionSection user={user} onUpgrade={handleUpgrade} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-outfit font-bold">Ayarlar</h1>
        <p className="text-gray-400">Hesap ayarlarınızı buradan yönetin</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-2">
            {settingsNavItems.map((section) => {
              const { Icon } = section
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id
                      ? 'bg-accent/20 text-accent'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            {renderSection()}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showPasswordModal && (
          <PasswordChangeModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <DeleteAccountModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            selectedPlan={selectedPlan}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
