'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  MapPin,
  BarChart3,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Sparkles,
  Camera,
  Download,
  Save,
} from 'lucide-react'
import type { PropertyFormData } from '@/types/database'
import type { AnalysisResult } from '@/lib/analysisEngine'

export interface AnalysisResultsViewProps {
  formData: PropertyFormData
  analysisResults: AnalysisResult
  uploadedImages: string[]
  isLite: boolean
  setShowResults: (show: boolean) => void
  toastMessage: string | null
  downloadPdf: () => Promise<void>
  saveReportToStorage: () => void
}

export function AnalysisResultsView({
  formData,
  analysisResults,
  uploadedImages,
  isLite,
  setShowResults,
  toastMessage,
  downloadPdf,
  saveReportToStorage,
}: AnalysisResultsViewProps) {
  return (
      <main className="min-h-screen py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full min-w-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-4 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-outfit font-bold">Analiz Sonuçları</h1>
                <p className="text-gray-400 text-sm sm:text-base break-words">{formData.property_type} • {formData.city} / {formData.district}</p>
              </div>
              <button 
                onClick={() => setShowResults(false)}
                className="btn-secondary w-full sm:w-auto shrink-0 touch-manipulation"
              >
                Yeni Analiz
              </button>
            </div>

            {isLite ? (
              <>
                <div className="relative rounded-2xl overflow-hidden mb-8">
                  <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-success/20 text-success text-sm font-medium mb-4">Analiz tamamlandı</span>
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                      <BarChart3 className="w-10 h-10 text-accent" />
                    </div>
                    <h2 className="text-xl font-outfit font-bold mb-2">Detaylı sonuçlar Pro veya Elite’te</h2>
                    <p className="text-gray-400 max-w-md mb-6">
                      Lite pakette analiz yapabilirsiniz; ancak önerilen fiyat, pazar karşılaştırması, 
                      alıcı profilleri ve PDF indirme yalnızca Pro/Elite’te açılır.
                    </p>
                    <a href="/dashboard/subscription" className="btn-primary inline-flex items-center gap-2">
                      Paketi Yükselt
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="blur-xl select-none pointer-events-none">
                    <div className="bg-gradient-to-r from-accent/20 to-warning/20 rounded-2xl p-6 border border-accent/30">
                      <div className="h-24 bg-surface-card/50 rounded-xl mb-4" />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-16 bg-surface-card/50 rounded-xl" />
                        <div className="h-16 bg-surface-card/50 rounded-xl" />
                        <div className="h-16 bg-surface-card/50 rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button onClick={() => setShowResults(false)} className="btn-secondary">Yeni Analiz</button>
                </div>
              </>
            ) : (
            <>
            <div className="bg-gradient-to-r from-accent/20 to-warning/20 rounded-2xl p-6 mb-8 border border-accent/30">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="font-outfit font-semibold">{formData.city} / {formData.district} m² Fiyat Analizi</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">İlçe Ortalaması</p>
                  <p className="text-2xl font-mono font-bold text-white">₺{analysisResults.districtAvgPricePerSqm.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">m² başına</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">Bu Mülkün m² Fiyatı</p>
                  <p className="text-2xl font-mono font-bold text-accent">₺{analysisResults.pricePerSqm.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">önerilen</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-1">İl Geneli Ortalama</p>
                  <p className="text-2xl font-mono font-bold text-white">₺{analysisResults.agentAnalysis.marketComparison.cityAvg.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">m² başına</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-glass-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Pazar Değerlendirmesi:</span>
                  <span className={`font-semibold ${Number(analysisResults.agentAnalysis.marketComparison.difference) >= 0 ? 'text-warning' : 'text-success'}`}>
                    {analysisResults.agentAnalysis.marketComparison.difference}% {Number(analysisResults.agentAnalysis.marketComparison.difference) >= 0 ? 'üstünde' : 'altında'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-accent" />
                  <span className="text-gray-400">Önerilen Fiyat</span>
                </div>
                <div className="flex flex-wrap items-end gap-2 sm:gap-3">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-success">
                    ₺{(analysisResults.suggestedPriceMin / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-gray-500 mb-1 hidden sm:inline">-</span>
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-white">
                    ₺{(analysisResults.suggestedPriceMax / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm">
                  <span className="text-gray-400 break-all">m² başına: ₺{analysisResults.pricePerSqm.toLocaleString()}</span>
                  <span className="text-success shrink-0">Güven: %{analysisResults.confidenceScore}</span>
                </div>
              </div>

              <div className="bg-surface-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-gray-400">Pazar Tahmini</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Talep Seviyesi</span>
                    <span className="text-success font-semibold">{analysisResults.demandLevel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tahmini Satış Süresi</span>
                    <span className="text-white font-semibold">{analysisResults.daysOnMarket} gün</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Bölge Ortalaması</span>
                    <span className="text-white font-mono">₺{((formData.area_sqm * analysisResults.districtAvgPricePerSqm) / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6 mb-6">
              <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Pazar Karşılaştırması
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Toplam Aktif İlan</span>
                    <span className="text-white font-mono font-bold">{analysisResults.districtData.totalListings}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Benzer İlan Sayısı</span>
                    <span className="text-accent font-mono font-bold">{analysisResults.agentAnalysis.competition.similarProperties}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Rekabet Durumu</span>
                    <span className="text-sm text-warning">{analysisResults.agentAnalysis.competition.recommendation}</span>
                  </div>
                </div>
                <div className="bg-primary/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Fiyat Aralığı (En Düşük)</span>
                    <span className="text-white font-mono">₺{(analysisResults.agentAnalysis.competition.priceRange.min / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Fiyat Aralığı (En Yüksek)</span>
                    <span className="text-white font-mono">₺{(analysisResults.agentAnalysis.competition.priceRange.max / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Trend Yönü</span>
                    <span className={`text-sm ${analysisResults.districtData.trend === 'up' ? 'text-success' : 'text-gray-400'}`}>
                      {analysisResults.districtData.trend === 'up' ? '↑ Yükseliş' : analysisResults.districtData.trend === 'down' ? '↓ Düşüş' : '→ Stabil'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6 mb-6">
              <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Fiyatlandırma Stratejisi
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-success/10 to-transparent rounded-xl border border-success/20">
                  <div>
                    <p className="text-sm text-gray-400">Hızlı Satış Fiyatı</p>
                    <p className="text-xs text-gray-500">Önerilen minimum fiyat</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-mono font-bold text-success">₺{(analysisResults.agentAnalysis.pricingStrategy.quickSalePrice / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-gray-500">{analysisResults.daysOnMarket - 10} gün içinde satış</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-transparent rounded-xl border border-accent/20">
                  <div>
                    <p className="text-sm text-gray-400">Optimal Fiyat</p>
                    <p className="text-xs text-gray-500">Denge fiyatı</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-mono font-bold text-accent">₺{(analysisResults.agentAnalysis.pricingStrategy.optimalPrice / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-gray-500">{analysisResults.daysOnMarket} gün içinde satış</p>
                  </div>
                </div>
                <div className="p-4 bg-primary/50 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">Strateji Önerisi:</p>
                  <p className="text-white">{analysisResults.agentAnalysis.pricingStrategy.strategy}</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6 mb-6">
              <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-warning" />
                Yatırım Potansiyeli
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-primary/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-400 mb-2">Yatırım Getirisi</p>
                  <p className={`text-2xl font-bold ${analysisResults.agentAnalysis.investment.roi === 'Yüksek' ? 'text-success' : 'text-warning'}`}>
                    {analysisResults.agentAnalysis.investment.roi}
                  </p>
                </div>
                <div className="bg-primary/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-400 mb-2">Kiralama Getirisi</p>
                  <p className="text-2xl font-bold text-white">%{analysisResults.agentAnalysis.investment.rentalYield}</p>
                  <p className="text-xs text-gray-500">Aylık brüt</p>
                </div>
                <div className="bg-primary/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-400 mb-2">Değer Artışı</p>
                  <p className={`text-2xl font-bold ${analysisResults.agentAnalysis.investment.appreciationPotential === 'Yüksek' ? 'text-success' : 'text-gray-400'}`}>
                    {analysisResults.agentAnalysis.investment.appreciationPotential}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-warning/10 rounded-xl border border-warning/20">
                <p className="text-sm text-warning font-semibold">Yatırım Değerlendirmesi:</p>
                <p className="text-white mt-1">{analysisResults.agentAnalysis.investment.recommendation}</p>
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6 mb-6">
              <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-400" />
                Pazarlama Önerileri
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-4 bg-primary/50 rounded-xl">
                    <p className="text-sm text-gray-400 mb-2">Öne Çıkarılacak Özellikler</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.agentAnalysis.marketing.keyFeatures.length > 0 ? (
                        analysisResults.agentAnalysis.marketing.keyFeatures.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                            {feature}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">Konum ve fiyat avantajı</span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-primary/50 rounded-xl">
                    <p className="text-sm text-gray-400 mb-2">Hedef Kitle</p>
                    <p className="text-white">{analysisResults.agentAnalysis.marketing.targetAudience}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-primary/50 rounded-xl">
                    <p className="text-sm text-gray-400 mb-2">En İyi Listeleme Zamanı</p>
                    <p className="text-accent font-semibold">{analysisResults.agentAnalysis.marketing.bestTimeToList}</p>
                  </div>
                  <div className="p-4 bg-primary/50 rounded-xl">
                    <p className="text-sm text-gray-400 mb-2">Önerilen Platformlar</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.agentAnalysis.marketing.channels.map((channel, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6 mb-8">
              <h3 className="font-outfit font-semibold mb-4">Potansiyel Alıcı Profilleri</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {analysisResults.buyerSegments.map((seg, i) => (
                  <div key={i} className="bg-primary/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">{seg.segment}</span>
                      <span className="text-accent font-bold">%{seg.probability}</span>
                    </div>
                    <div className="h-2 bg-primary rounded-full overflow-hidden">
                      <div className={`h-full ${seg.color} rounded-full`} style={{ width: `${seg.probability}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-card rounded-2xl p-6 mb-8">
              <h3 className="font-outfit font-semibold mb-4">İlan Başlığı Önerileri</h3>
              <div className="space-y-3">
                {analysisResults.titleSuggestions.map((title, i) => (
                  <div key={i} className="flex items-center justify-between bg-primary/50 rounded-xl p-4">
                    <span>{title}</span>
                    <button className="btn-secondary text-sm py-2 px-3" onClick={() => navigator.clipboard.writeText(title)}>Kopyala</button>
                  </div>
                ))}
              </div>
            </div>

            {uploadedImages.length > 0 && (
              <div className="bg-surface-card rounded-2xl p-6 mb-8">
                <h3 className="font-outfit font-semibold mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-accent" />
                  Fotoğraf Analizi
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Yüklenen Fotoğraflar</p>
                    <div className="grid grid-cols-3 gap-2">
                      {uploadedImages.slice(0, 6).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Fotoğraf ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{uploadedImages.length} fotoğraf yüklendi</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Fotoğraf Kalitesi</span>
                        <span className="text-success font-bold">İyi</span>
                      </div>
                      <div className="h-2 bg-primary rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                    <div className="p-4 bg-primary/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Profesyonellik Skoru</span>
                        <span className="text-accent font-bold">%82</span>
                      </div>
                      <div className="h-2 bg-primary rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-xl border border-warning/20">
                      <p className="text-sm text-warning font-semibold mb-2">Öneriler:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• İç mekan fotoğrafları için daha fazla ışık kullanın</li>
                        <li>• Geniş açıdan çekim yapılması önerilir</li>
                        <li>• Balkon ve manzara fotoğrafları eklenebilir</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Toast */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-xl bg-success/90 text-primary font-medium shadow-lg"
              >
                {toastMessage}
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => void downloadPdf()}
                className="btn-primary flex-1 py-4 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                İndir
              </button>
              
              <button
                onClick={saveReportToStorage}
                className="btn-secondary flex-1 py-4 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Raporu Kaydet
              </button>
            </div>
            </>
            )}
          </motion.div>
        </div>
      </main>
  )
}
