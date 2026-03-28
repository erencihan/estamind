'use client'

import { Check } from 'lucide-react'
import type { User } from '@/types/database'

type Props = {
  user: User | null
  onUpgrade: (planName: string, planPrice: string) => void
}

export function SettingsSubscriptionSection({ user, onUpgrade }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-outfit font-semibold mb-4">Abonelik</h3>
        <p className="text-gray-400 text-sm mb-6">Mevcut planınızı yönetin.</p>
      </div>

      <div className="glass-card rounded-xl p-6 border-2 border-accent">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Mevcut Plan</p>
            <h4 className="text-2xl font-outfit font-bold text-accent">
              {user?.plan_type === 'elite' ? 'Elite' : user?.plan_type === 'pro' ? 'Pro' : 'Lite'} Plan
            </h4>
          </div>
          <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm">Aktif</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-gray-400">Kullanım:</span>
          <span className="text-white font-medium">
            {user?.plan_type === 'lite'
              ? `${user?.monthly_credits ?? 1} analiz/ay`
              : `${user?.used_credits ?? 0}/${user?.monthly_credits ?? 20} analiz`}
          </span>
        </div>
        <div className="pt-4 border-t border-glass-border">
          <p className="text-sm text-gray-400 mb-2">Kredi</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-primary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full"
                style={{
                  width: `${user?.monthly_credits ? Math.min(100, (((user.monthly_credits - (user.used_credits ?? 0)) / user.monthly_credits) * 100)) : 100}%`,
                }}
              />
            </div>
            <span className="text-sm text-white">
              {Math.max(0, (user?.monthly_credits ?? 0) - (user?.used_credits ?? 0))}/{user?.monthly_credits ?? 1}
            </span>
          </div>
        </div>
        <a href="/dashboard/subscription" className="block mt-4 text-accent text-sm font-semibold hover:underline">
          Abonelik sayfasına git →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        {[
          { name: 'Lite', price: '₺0', features: ['10 analiz/ay', 'Temel özellikler', 'E-posta destek'] },
          {
            name: 'Pro',
            price: '₺299',
            features: ['100 analiz/ay', 'Tüm özellikler', 'Öncelikli destek', 'API erişimi'],
            current: true,
          },
          {
            name: 'Elite',
            price: '₺599',
            features: ['Sınırsız analiz', 'Özel entegrasyon', '7/24 destek', 'Özel raporlar'],
            popular: true,
          },
        ].map((plan, i) => (
          <div
            key={i}
            className={`glass-card rounded-xl p-4 flex flex-col h-full ${plan.current ? 'border-2 border-accent' : ''}`}
          >
            {plan.popular && (
              <span className="text-xs bg-accent text-primary px-2 py-1 rounded-full inline-block">En Popüler</span>
            )}
            <h4 className="text-lg font-outfit font-bold mt-2">{plan.name}</h4>
            <p className="text-2xl font-mono font-bold min-h-[2.5rem]">
              {plan.price}
              <span className="text-sm text-gray-500">/ay</span>
            </p>
            <ul className="mt-4 space-y-2 flex-1">
              {plan.features.map((feature, j) => (
                <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              {plan.current ? (
                <button type="button" disabled className="w-full py-2 rounded-lg font-medium bg-white/5 text-gray-500 border border-glass-border cursor-default">
                  Mevcut Plan
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpgrade(plan.name, plan.price)}
                  className="w-full btn-secondary py-2"
                >
                  Yükselt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
