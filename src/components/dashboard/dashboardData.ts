export interface CityMarketData {
  city: string
  avgPricePerSqm: number
  priceChange: number
  trend: 'up' | 'down'
  totalListings: number
  avgDaysOnMarket: number
}

export interface PropertyTypeData {
  type: string
  percentage: number
  avgPrice: string
  trend: 'up' | 'down'
}

export const marketData: CityMarketData[] = [
  { city: 'İstanbul', avgPricePerSqm: 42500, priceChange: 18.5, trend: 'up', totalListings: 125000, avgDaysOnMarket: 45 },
  { city: 'Ankara', avgPricePerSqm: 18500, priceChange: 12.3, trend: 'up', totalListings: 45000, avgDaysOnMarket: 38 },
  { city: 'İzmir', avgPricePerSqm: 28500, priceChange: 15.7, trend: 'up', totalListings: 38000, avgDaysOnMarket: 52 },
  { city: 'Antalya', avgPricePerSqm: 22000, priceChange: 8.2, trend: 'up', totalListings: 22000, avgDaysOnMarket: 60 },
  { city: 'Bursa', avgPricePerSqm: 16500, priceChange: 10.5, trend: 'up', totalListings: 28000, avgDaysOnMarket: 42 },
]

export const propertyTypeData: PropertyTypeData[] = [
  { type: 'Daire', percentage: 58, avgPrice: '₺3.2M', trend: 'up' },
  { type: 'Villa', percentage: 15, avgPrice: '₺8.5M', trend: 'up' },
  { type: 'Müstakil', percentage: 12, avgPrice: '₺4.1M', trend: 'down' },
  { type: 'Kiralık', percentage: 10, avgPrice: '₺18.000/ay', trend: 'up' },
  { type: 'Arsa', percentage: 5, avgPrice: '₺2.8M', trend: 'up' },
]

export const mockRecentReports = [
  { title: 'Kadıköy Bölge Analizi', type: 'Bölge Raporu', date: '2 saat önce', views: 450 },
  { title: 'Ocak 2024 Pazar Trendleri', type: 'Pazar Raporu', date: 'Dün', views: 890 },
  { title: 'Fiyatlandırma Stratejisi', type: 'Analiz Raporu', date: '3 gün önce', views: 320 },
  { title: 'Yatırım Potansiyeli', type: 'Yatırım Raporu', date: '1 hafta önce', views: 210 },
]

export const popularSearchTerms = [
  { term: 'Kadıköy Satılık Daire', searches: 12500, trend: 'up' as const },
  { term: 'Bağdat Caddesi Kiralık', searches: 8900, trend: 'up' as const },
  { term: 'İstanbul Villa', searches: 7200, trend: 'stable' as const },
  { term: 'Ankara Çankaya', searches: 5400, trend: 'up' as const },
  { term: 'İzmir Bornova', searches: 4200, trend: 'down' as const },
]

export const regionalDemandRows = [
  { region: 'Kadıköy', demand: 95, supply: 1250, avgPrice: '₺52.000/m²' },
  { region: 'Beşiktaş', demand: 88, supply: 890, avgPrice: '₺65.000/m²' },
  { region: 'İzmir Karşıyaka', demand: 82, supply: 520, avgPrice: '₺35.000/m²' },
  { region: 'Ankara Çankaya', demand: 78, supply: 980, avgPrice: '₺35.000/m²' },
]
