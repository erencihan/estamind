'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  X, 
  Trash2,
  CheckCircle,
  RotateCcw
} from 'lucide-react'
import { useState } from 'react'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  itemName?: string
  isLoading?: boolean
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Raporu Sil',
  message = 'Bu raporu silmek istediğinizden emin misiniz?',
  itemName,
  isLoading = false
}: DeleteConfirmModalProps) {
  const [confirmText, setConfirmText] = useState('')

  const handleConfirm = () => {
    if (itemName && confirmText !== itemName) return
    onConfirm()
    setConfirmText('')
  }

  const handleClose = () => {
    setConfirmText('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-surface-card border border-glass-border rounded-2xl p-6 w-full max-w-md mx-4 z-10"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-error" />
          </div>
          <h3 className="text-xl font-outfit font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-6">{message}</p>

          {itemName && (
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Onaylamak için <span className="text-error font-bold">"{itemName}"</span> yazın
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="input-glass text-center"
                placeholder={itemName}
              />
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 btn-secondary py-3"
              disabled={isLoading}
            >
              İptal
            </button>
            <button
              onClick={handleConfirm}
              disabled={(itemName && confirmText !== itemName) || isLoading}
              className="flex-1 bg-error hover:bg-error/80 text-white py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Sil
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Success Modal for delete operations
interface DeleteSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onRestore?: () => void
  itemName?: string
}

export function DeleteSuccessModal({
  isOpen,
  onClose,
  onRestore,
  itemName
}: DeleteSuccessModalProps) {
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
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-success" />
          </motion.div>
          <h3 className="text-xl font-outfit font-bold text-white mb-2">Rapor Silindi</h3>
          <p className="text-gray-400 mb-6">
            "{itemName}" başarıyla silindi. Silinen raporları <span className="text-gray-300">Silinen Raporlar</span> bölümünden görüntüleyebilir ve geri yükleyebilirsiniz.
          </p>

          <div className="flex gap-3">
            {onRestore && (
              <button
                onClick={onRestore}
                className="flex-1 bg-warning/20 hover:bg-warning/30 text-warning py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Geri Yükle
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 btn-primary py-3"
            >
              Kapat
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
