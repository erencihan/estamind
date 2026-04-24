'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Check,
  Shield,
  CreditCard,
  X,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { PlanType } from '@/types/database'

const PLANS = [
  {
    id: 'lite' as PlanType,
    name: 'Lite',
    price: '0',
    period: '/ay',
    description: 'Başlamak için',
    features: ['1 Analiz/Ay', 'Temel Fiyat Önerisi', 'Sınırlı Rapor Görüntüleme', 'E-posta Desteği'],
    cta: 'Mevcut Plan',
    popular: false,
    current: (plan: PlanType) => plan === 'lite'
  },
  {
    id: 'pro' as PlanType,
    name: 'Pro',
    price: '99',
    period: '/ay',
    description: 'Profesyoneller için',
    features: ['20 Analiz/Ay', 'PDF Raporlama', 'WhatsApp Paylaşım', 'Alıcı Segmentasyonu', 'İlan Optimizasyonu', 'Öncelikli Destek'],
    cta: 'Pro Ol',
    popular: true,
    current: (plan: PlanType) => plan === 'pro'
  },
  {
    id: 'elite' as PlanType,
    name: 'Elite',
    price: '999',
    period: '/ay',
    description: 'Kurumsal',
    features: ['Sınırsız Analiz', 'Rakip Analizi', 'AI Fotoğraf İyileştirme', 'Tüm Pro Özellikleri', 'Özel Eğitim', '7/24 VIP Destek'],
    cta: 'Elite Ol',
    popular: false,
    current: (plan: PlanType) => plan === 'elite'
  }
]

function PaymentModal({
  isOpen,
  onClose,
  selectedPlan,
  onSuccess
}: {
  isOpen: boolean
  onClose: () => void
  selectedPlan: { name: string; price: string } | null
  onSuccess?: () => void
}) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : v
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setSuccess(true)
    onSuccess?.()
    setTimeout(() => {
      onClose()
      setSuccess(false)
      setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' })
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <div className="relative bg-surface-card border border-glass-border rounded-xl p-4 sm:p-6 w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-dm font-bold text-white mb-2">Ödeme Başarılı</h3>
            <p className="text-gray-400">{selectedPlan?.name} planına yükseltildiniz!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-dm font-bold text-white">Ödeme Yap</h3>
              {selectedPlan && (
                <p className="text-gray-400 mt-1">
                  {selectedPlan.name} - ₺{selectedPlan.price}/ay
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 rounded-xl bg-success/10 border border-success/30 px-3 py-2">
                <Shield className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-xs text-success font-medium">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/30 px-3 py-2">
                <CreditCard className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-xs text-blue-400 font-medium">PCI DSS</span>
              </div>
            </div>

            <div className="bg-surface-card/80 rounded-xl p-4 mb-6 border border-glass-border">
              <p className="text-white font-medium text-sm">Güvenli Ödeme</p>
              <p className="text-xs text-gray-400">Kart bilgileriniz şifrelenir.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Kart Numarası</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                  className="input-glass w-full px-4 font-mono tracking-wider"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Kart Üzerindeki İsim</label>
                <input
                  type="text"
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                  className="input-glass w-full px-4"
                  placeholder="Ad Soyad"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Son Kullanma</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
                    className="input-glass w-full px-4"
                    placeholder="AA/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/[^0-9]/g, '').substring(0, 3) })}
                    className="input-glass w-full px-4"
                    placeholder="000"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Ödemeyi Tamamla
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function SubscriptionPage() {
  const { user, updatePlan } = useAuth()
  const router = useRouter()
  const planType = user?.plan_type || 'lite'
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null)

  const handleUpgrade = (name: string, price: string) => {
    setSelectedPlan({ name, price })
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    if (selectedPlan) {
      const planTypeNew = selectedPlan.name.toLowerCase() as PlanType
      const credits = selectedPlan.name === 'Elite' ? 999 : 20
      updatePlan(planTypeNew, credits)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-dm font-bold">Abonelik Planları</h1>
        <p className="text-gray-400 break-words">Mevcut planınız: <span className="text-accent font-semibold">{planType === 'lite' ? 'Lite' : planType === 'pro' ? 'Pro' : 'Elite'}</span>. İhtiyacınıza göre yükseltin.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((plan) => {
          const isCurrent = plan.current(planType)
          return (
            <div
              key={plan.id}
              className={`relative glass-card rounded-xl p-6 flex flex-col h-full ${
                plan.popular ? 'ring-2 ring-accent' : ''
              } ${isCurrent ? 'border-2 border-accent' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full whitespace-nowrap">
                  En Popüler
                </div>
              )}
              {isCurrent && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full">
                  Mevcut
                </div>
              )}
              <div className="text-center mb-6 shrink-0">
                <h3 className="text-xl font-dm font-bold">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mt-2 min-h-[2.75rem]">
                  <span className="text-3xl font-mono font-bold">₺{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
              </div>
              <ul className="space-y-3 flex-1 min-h-0 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto shrink-0">
                {isCurrent ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 rounded-xl font-semibold bg-white/5 text-gray-500 border border-glass-border cursor-default"
                  >
                    Mevcut Plan
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUpgrade(plan.name, plan.price)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.popular ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPlan={selectedPlan}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
