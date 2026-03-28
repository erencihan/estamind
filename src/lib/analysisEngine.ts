/**
 * Emlak analiz hesaplama motoru (şu an mock).
 * Gerçek AI/API entegrasyonunda bu dosyada sadece API çağrısı yapılır.
 */

import { getDistrictData, type DistrictDataItem } from '@/data/analysisFormData'
import type { PropertyFormData } from '@/types/database'

export interface AnalysisResult {
  suggestedPriceMin: number
  suggestedPriceMax: number
  pricePerSqm: number
  districtAvgPricePerSqm: number
  confidenceScore: number
  districtData: { totalListings: number; avgDaysOnMarket: number; demandScore: number; trend: string }
  demandLevel: string
  daysOnMarket: number
  buyerSegments: Array<{ segment: string; probability: number; color: string; income?: string; description?: string }>
  titleSuggestions: string[]
  agentAnalysis: {
    marketComparison: {
      yourPricePerSqm: number
      districtAvg: number
      cityAvg: number
      difference: number
      assessment: string
    }
    competition: {
      totalCompetitors: number
      similarProperties: number
      priceRange: { min: number; max: number }
      recommendation: string
    }
    pricingStrategy: {
      optimalPrice: number
      quickSalePrice: number
      maxPrice: number
      strategy: string
    }
    investment: {
      roi: string
      rentalYield: number
      appreciationPotential: string
      recommendation: string
    }
    marketing: {
      keyFeatures: string[]
      targetAudience: string
      bestTimeToList: string
      channels: string[]
    }
  }
}

export function runAnalysis(formData: PropertyFormData): AnalysisResult {
  const districtData: DistrictDataItem = getDistrictData(formData.city, formData.district)
  const pricePerSqm = Math.round(districtData.avgPricePerSqm * (0.9 + Math.random() * 0.2))
  const suggestedPriceMin = formData.area_sqm * (pricePerSqm - 2000)
  const suggestedPriceMax = formData.area_sqm * (pricePerSqm + 3000)

  return {
    suggestedPriceMin,
    suggestedPriceMax,
    pricePerSqm,
    districtAvgPricePerSqm: districtData.avgPricePerSqm,
    confidenceScore: 87,
    districtData: {
      totalListings: districtData.totalListings,
      avgDaysOnMarket: districtData.avgDaysOnMarket,
      demandScore: districtData.demandScore,
      trend: districtData.trend,
    },
    demandLevel:
      districtData.demandScore >= 80 ? 'Çok Yüksek' : districtData.demandScore >= 60 ? 'Yüksek' : 'Orta',
    daysOnMarket: districtData.avgDaysOnMarket,
    buyerSegments: [
      {
        segment: 'Kurumsal Aileler (35-50 yaş)',
        probability: 78,
        color: 'bg-accent',
        income: '₺50.000+',
        description: 'Çocuklu aileler, güvenli site arayanlar, eğitim kurumlarına yakınlık önemli',
      },
      {
        segment: 'Yatırımcılar',
        probability: 45,
        color: 'bg-blue-500',
        income: '₺100.000+',
        description: 'Kiralama getirisi hedefleyenler, portföy çeşitlendirenler',
      },
      {
        segment: 'Genç Profesyoneller (25-35 yaş)',
        probability: 32,
        color: 'bg-success',
        income: '₺35.000+',
        description: 'İş merkezlerine yakın, modern yaşam alanları arayanlar',
      },
      {
        segment: 'Emekli Çiftler',
        probability: 25,
        color: 'bg-purple-500',
        income: '₺25.000+',
        description: 'Sakin mahalleler, hastane yakınlık tercih edenler',
      },
    ],
    titleSuggestions: [
      'Şehrin Sessiz Vahası - Ana Cadde Üzeri',
      'Manzaralı, Aydınlık ve Konumlu',
      'Yatırımlık Fırsat - Geleceğin Mahallesi',
      'Aile Hayatı İçin ideal - Okul ve Market Yakını',
      'Modern Yaşamın Adresi - Sitede, Güvenli',
      'Merkezi Konum, Ulaşım Avantajı',
    ],
    agentAnalysis: {
      marketComparison: {
        yourPricePerSqm: pricePerSqm,
        districtAvg: districtData.avgPricePerSqm,
        cityAvg: Math.round(districtData.avgPricePerSqm * 0.85),
        difference: Number(
          (((pricePerSqm - districtData.avgPricePerSqm) / districtData.avgPricePerSqm) * 100).toFixed(1)
        ),
        assessment:
          pricePerSqm >= districtData.avgPricePerSqm ? 'Üst segment' : 'Pazarı uygun fiyat',
      },
      competition: {
        totalCompetitors: Math.round(districtData.totalListings * 0.3),
        similarProperties: Math.round(districtData.totalListings * 0.15),
        priceRange: {
          min: Math.round(districtData.avgPricePerSqm * formData.area_sqm * 0.8),
          max: Math.round(districtData.avgPricePerSqm * formData.area_sqm * 1.2),
        },
        recommendation:
          districtData.totalListings > 500
            ? 'Yoğun rekabet - Farklılaşma stratejisi gerekli'
            : 'Orta seviye rekabet',
      },
      pricingStrategy: {
        optimalPrice: Math.round((suggestedPriceMin + suggestedPriceMax) / 2),
        quickSalePrice: Math.round(suggestedPriceMin * 0.95),
        maxPrice: suggestedPriceMax,
        strategy:
          districtData.trend === 'up'
            ? 'Fiyatı güncel tutarak pazarlayın'
            : 'Rekabetçi fiyatla hızlı satış yapın',
      },
      investment: {
        roi: districtData.demandScore >= 80 ? 'Yüksek' : 'Orta',
        rentalYield: Number((districtData.avgPricePerSqm * 0.004 + Math.random() * 0.5).toFixed(2)),
        appreciationPotential: districtData.trend === 'up' ? 'Yüksek' : 'Stabil',
        recommendation:
          districtData.trend === 'up'
            ? 'Yatırım için uygun bölge'
            : 'Konut olarak kullanım önerilir',
      },
      marketing: {
        keyFeatures: [
          formData.has_balcony ? 'Balkonlu' : null,
          formData.has_parking ? 'Otopark' : null,
          formData.is_renovated ? 'Tadilatlı' : null,
          formData.has_pool ? 'Havuz' : null,
          formData.has_jacuzzi ? 'Jakuzi' : null,
          formData.has_sea_view ? 'Deniz Manzarası' : null,
          formData.has_closed_parking ? 'Kapalı Otopark' : null,
          formData.has_generator ? 'Jeneratör' : null,
          formData.has_smart_home ? 'Smart Home' : null,
          formData.building_age && formData.building_age < 5 ? 'Yeni Bina' : null,
          formData.floor_number && formData.floor_number <= 3 ? 'Bahçe yakınlığı' : null,
        ].filter((x): x is string => Boolean(x)),
        targetAudience:
          districtData.demandScore >= 80 ? 'Üst gelir grubu ve yatırımcılar' : 'Genç aileler ve profesyoneller',
        bestTimeToList:
          districtData.demandScore >= 80 ? 'Hemen listeleyin' : 'İlkbahar aylarını bekleyin',
        channels: ['Sahibinden', 'Emlakjet', 'Tapu.com', 'Social Media'],
      },
    },
  }
}

/** Simüle edilmiş analiz süresi (ms). Canlıda API yanıt süresine göre kaldırılabilir. */
export const MOCK_ANALYSIS_DELAY_MS = 2500
