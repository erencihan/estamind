'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react'
import { marketData } from '@/components/dashboard/dashboardData'

export function MarketPrices() {
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `₺${(price / 1000).toFixed(1)}K`
    }
    return `₺${price}`
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-outfit font-semibold text-lg">Piyasa Fiyatları</h3>
          <p className="text-sm text-gray-500">Şehir bazlı güncel emlak fiyatları</p>
        </div>
        <button type="button" className="text-accent hover:underline text-sm flex items-center gap-1">
          <RefreshCw className="w-4 h-4" />
          Güncelle
        </button>
      </div>

      <div className="space-y-4">
        {marketData.map((city, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-4 bg-surface-card rounded-xl hover:bg-primary-light/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-white">{city.city}</p>
                <p className="text-xs text-gray-500">{city.totalListings.toLocaleString()} ilan</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-white">{formatPrice(city.avgPricePerSqm)}/m²</p>
              <div
                className={`flex items-center gap-1 text-xs ${city.trend === 'up' ? 'text-success' : 'text-error'}`}
              >
                {city.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                +{city.priceChange}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
