'use client'

import { useState } from 'react'
import { X, CheckCircle, Shield, CreditCard, CreditCard as CardIcon } from 'lucide-react'

type SelectedPlan = { name: string; price: string } | null

type Props = {
  isOpen: boolean
  onClose: () => void
  selectedPlan: SelectedPlan
}

export function PaymentModal({ isOpen, onClose, selectedPlan }: Props) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setSuccess(true)

    setTimeout(() => {
      onClose()
      setSuccess(false)
      setFormData({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' })
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />
      <div className="relative bg-surface-card border border-glass-border rounded-xl p-6 w-full max-w-md mx-4 z-10">
        <button
          type="button"
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
            <p className="text-gray-400">{selectedPlan?.name} planına başarıyla yükseltildiniz!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-xl font-dm font-bold text-white">Ödeme Yap</h3>
              {selectedPlan && (
                <p className="text-gray-400 mt-1">
                  {selectedPlan.name} - {selectedPlan.price}/ay
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 rounded-xl bg-success/10 border border-success/30 px-3 py-2">
                <Shield className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-xs text-success font-medium">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/30 px-3 py-2">
                <CreditCard className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-xs text-blue-400 font-medium">PCI DSS Uyumlu</span>
              </div>
            </div>

            <div className="bg-surface-card/80 rounded-xl p-4 mb-6 border border-glass-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <CardIcon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Güvenli Ödeme</p>
                  <p className="text-xs text-gray-400">Kart bilgileriniz şifrelenir ve güvende saklanır.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Kart Numarası</label>
                <div className="relative">
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cvv: e.target.value.replace(/[^0-9]/g, '').substring(0, 3),
                      })
                    }
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
