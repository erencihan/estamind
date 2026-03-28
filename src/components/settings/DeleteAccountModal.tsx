'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, AlertTriangle, Trash2 } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm }: Props) {
  const [confirmText, setConfirmText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (confirmText !== 'Sil') return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    onConfirm()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-surface-card border border-glass-border rounded-2xl p-6 w-full max-w-md mx-4 z-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-error" />
          </div>
          <h3 className="text-xl font-outfit font-bold text-white mb-2">Hesabı Sil</h3>
          <p className="text-gray-400 mb-6">
            Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir.
          </p>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">
              Onaylamak için <span className="text-error font-bold">&quot;Sil&quot;</span> yazın
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="input-glass text-center"
              placeholder="Sil"
            />
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 btn-secondary py-3">
              İptal
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={confirmText !== 'Sil' || isLoading}
              className="flex-1 bg-error hover:bg-error/80 text-white py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Hesabı Sil
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
