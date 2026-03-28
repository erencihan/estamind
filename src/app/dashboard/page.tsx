'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LiteUpgradeBanner } from '@/components/dashboard/LiteUpgradeBanner'
import { DashboardWelcome } from '@/components/dashboard/DashboardWelcome'
import { DashboardStatsGrid } from '@/components/dashboard/DashboardStatsGrid'
import { LiteMarketHint } from '@/components/dashboard/LiteMarketHint'
import { MarketPrices } from '@/components/dashboard/MarketPrices'
import { PropertyTypes } from '@/components/dashboard/PropertyTypes'
import { AgentMarketStats } from '@/components/dashboard/AgentMarketStats'
import { PriceChart } from '@/components/dashboard/PriceChart'
import { DemandHeatMap } from '@/components/dashboard/DemandHeatMap'
import {
  LiteMarketDataOverlay,
  LiteAgentStatsOverlay,
  LiteChartsOverlay,
} from '@/components/dashboard/LiteLockedOverlays'
import { RecentReportsPanel } from '@/components/dashboard/RecentReportsPanel'
import { PopularSearchTerms } from '@/components/dashboard/PopularSearchTerms'
import { RegionalDemandAnalysis } from '@/components/dashboard/RegionalDemandAnalysis'

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const planType = user?.plan_type || 'lite'
  const isLite = planType === 'lite'
  const creditsLeft = (user?.monthly_credits ?? 1) - (user?.used_credits ?? 0)
  const monthlyCredits = user?.monthly_credits ?? 1

  const goSubscription = () => router.push('/dashboard/subscription')

  return (
    <>
      {isLite && <LiteUpgradeBanner creditsLeft={creditsLeft} onUpgrade={goSubscription} />}

      <DashboardWelcome
        userName={user?.name || 'Kullanıcı'}
        isLite={isLite}
        creditsLeft={creditsLeft}
      />

      <DashboardStatsGrid isLite={isLite} creditsLeft={creditsLeft} monthlyCredits={monthlyCredits} />

      {isLite && <LiteMarketHint onUpgrade={goSubscription} />}

      <div className={`grid lg:grid-cols-2 gap-6 mb-8 ${isLite ? 'relative' : ''}`}>
        <LiteMarketDataOverlay isLite={isLite} onUpgrade={goSubscription} />
        <MarketPrices />
        <PropertyTypes />
      </div>

      <div className={`mb-8 ${isLite ? 'relative' : ''}`}>
        <LiteAgentStatsOverlay isLite={isLite} onUpgrade={goSubscription} />
        <AgentMarketStats />
      </div>

      <div className={`grid lg:grid-cols-3 gap-6 mb-8 ${isLite ? 'relative' : ''}`}>
        <LiteChartsOverlay isLite={isLite} onUpgrade={goSubscription} />
        <div className="lg:col-span-2">
          <PriceChart />
        </div>
        <div>
          <DemandHeatMap />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentReportsPanel />
        </div>
        <div>
          <PopularSearchTerms />
          <RegionalDemandAnalysis />
        </div>
      </div>
    </>
  )
}
