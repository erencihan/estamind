'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, User, ArrowRight, Eye, EyeOff, Check } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()
  const { register, isLoading } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Lütfen zorunlu alanları doldurun')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    if (!agreedToTerms) {
      setError('Kullanım şartlarını kabul etmelisiniz')
      return
    }

    const success = await register(formData.email, formData.password, formData.name)
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Kayıt başarısız. Lütfen tekrar deneyin.')
    }
  }

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'En az 8 karakter' },
    { met: /[A-Z]/.test(formData.password), text: 'Büyük harf içermeli' },
    { met: /[0-9]/.test(formData.password), text: 'Rakam içermeli' },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-warning mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-outfit font-bold">Esta<span className="text-accent">Mind</span></h1>
          <p className="text-gray-400 mt-2">Emlak analiz dünyasına katılın</p>
        </div>

        {/* Register Form */}
        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-outfit font-semibold mb-6 text-center">Kayıt Ol</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/30 rounded-xl text-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Ad Soyad <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ahmet Yılmaz"
                  className="input-glass w-full px-4"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                E-posta <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="emlakci@ornek.com"
                  className="input-glass w-full px-4"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Telefon</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+90 (___) ___ __ __"
                  className="input-glass w-full px-4"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Şifre <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-glass w-full px-4 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs ${req.met ? 'text-success' : 'text-gray-500'}`}>
                      <Check className={`w-3 h-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Şifre Tekrar <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-glass w-full px-4"
                />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-error text-xs mt-1">Şifreler eşleşmiyor</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer mt-4">
              <input 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 rounded accent-accent" 
              />
              <span className="text-sm text-gray-400">
                <a href="#" className="text-accent hover:underline">Kullanım Şartları</a> ve{' '}
                <a href="#" className="text-accent hover:underline">Gizlilik Politikası</a>'nı 
                kabul ediyorum
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Hesap Oluştur
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-400">
          Zaten hesabınız var mı?{' '}
          <a href="/login" className="text-accent hover:text-accent-hover font-semibold">
            Giriş Yap
          </a>
        </p>

        {/* Back to Home */}
        <p className="text-center mt-4">
          <a href="/" className="text-gray-500 hover:text-gray-300 text-sm">
            ← Ana sayfaya dön
          </a>
        </p>
      </motion.div>
    </main>
  )
}
