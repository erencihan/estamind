'use client'

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
    <div className="glass-card rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="min-w-0">
          <h3 className="font-dm font-semibold text-lg">Piyasa Fiyatları</h3>
          <p className="text-sm text-gray-500">Şehir bazlı güncel emlak fiyatları</p>
        </div>
        <button type="button" className="text-accent hover:underline text-sm flex items-center gap-1 self-start sm:self-auto">
          <RefreshCw className="w-4 h-4" />
          Güncelle
        </button>
      </div>

      <div className="space-y-4">
        {marketData.map((city, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-surface-card rounded-xl border border-glass-border hover:border-glass-highlight transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-white break-words">{city.city}</p>
                <p className="text-xs text-gray-500">{city.totalListings.toLocaleString()} ilan</p>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="font-mono font-semibold text-white">{formatPrice(city.avgPricePerSqm)}/m²</p>
              <div
                className={`flex items-center gap-1 text-xs ${city.trend === 'up' ? 'text-success' : 'text-error'}`}
              >
                {city.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                +{city.priceChange}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
