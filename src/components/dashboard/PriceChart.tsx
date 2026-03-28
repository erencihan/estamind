'use client'

import { motion } from 'framer-motion'

export function PriceChart() {
  const data = [
    { month: 'Oca', price: 3.8 },
    { month: 'Şub', price: 4.0 },
    { month: 'Mar', price: 3.9 },
    { month: 'Nis', price: 4.2 },
    { month: 'May', price: 4.5 },
    { month: 'Haz', price: 4.4 },
  ]

  const maxPrice = Math.max(...data.map((d) => d.price))
  const minPrice = Math.min(...data.map((d) => d.price))
  const range = maxPrice - minPrice

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-outfit font-semibold text-lg">Fiyat Trendi</h3>
          <p className="text-sm text-gray-500">Son 6 ay</p>
        </div>
        <select className="bg-surface-card border border-glass-border rounded-lg px-3 py-2 text-sm text-gray-400">
          <option>Tümü</option>
          <option>Satılık</option>
          <option>Kiralık</option>
        </select>
      </div>

      <div className="h-48 flex items-end gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              className="w-full bg-gradient-to-t from-accent to-accent-light rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: `${((item.price - minPrice) / range) * 100}%` }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              style={{ minHeight: '20px' }}
            />
            <span className="text-xs text-gray-500">{item.month}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-glass-border flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Ortalama Fiyat</p>
          <p className="font-mono font-bold text-xl">₺4.2M</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Değişim</p>
          <p className="font-semibold text-success">+15.8%</p>
        </div>
      </div>
    </div>
  )
}
