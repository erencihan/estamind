'use client'

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
  const range = maxPrice - minPrice || 1

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-dm font-semibold text-lg">Fiyat Trendi</h3>
          <p className="text-sm text-gray-500">Son 6 ay</p>
        </div>
        <select className="bg-surface-card border border-glass-border rounded-lg px-3 py-2 text-sm text-gray-400 w-full sm:w-auto">
          <option>Tümü</option>
          <option>Satılık</option>
          <option>Kiralık</option>
        </select>
      </div>

      <div className="h-48 flex items-end gap-2">
        {data.map((item, i) => {
          const h = Math.max(20, ((item.price - minPrice) / range) * 100)
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full bg-accent rounded-t-md min-h-[20px] transition-[height]"
                style={{ height: `${h}%` }}
              />
              <span className="text-xs text-gray-500">{item.month}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-glass-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
