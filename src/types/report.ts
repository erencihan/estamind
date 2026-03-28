/**
 * PDF/HTML rapor üretimi için veri şekilleri (reportGenerator + reportTemplates).
 */

export interface ReportAnalysisResults {
  districtAvgPricePerSqm?: number
  pricePerSqm?: number
  confidenceScore?: number
  suggestedPriceMin?: number
  suggestedPriceMax?: number
  demandLevel?: string
  daysOnMarket?: number
  districtData?: {
    totalListings?: number
    trend?: string
  }
  agentAnalysis?: {
    marketComparison?: {
      cityAvg?: number
      difference?: number
    }
    competition?: {
      similarProperties?: number
      recommendation?: string
      priceRange?: {
        min?: number
        max?: number
      }
    }
    pricingStrategy?: {
      quickSalePrice?: number
      optimalPrice?: number
      strategy?: string
    }
    investment?: {
      roi?: string
      rentalYield?: number
      appreciationPotential?: string
      recommendation?: string
    }
    marketing?: {
      keyFeatures?: string[]
      targetAudience?: string
      bestTimeToList?: string
      channels?: string[]
    }
  }
  buyerSegments?: Array<{
    segment: string
    probability: number
    color: string
  }>
  titleSuggestions?: string[]
}

export interface ReportFormData {
  property_type?: string
  city?: string
  district?: string
  area_sqm?: number
  room_count?: string
  bathroom_count?: string
}

export interface ReportData {
  title: string
  type: string
  date: string
  formData: ReportFormData
  analysisResults: ReportAnalysisResults
  uploadedImages?: string[]
  createdAt?: string
}

export type ReportFormatters = {
  formatCurrency: (value: number | undefined) => string
  formatPrice: (value: number | undefined) => string
  getTrendIcon: (trend: string | undefined) => string
  getTrendText: (trend: string | undefined) => string
}
