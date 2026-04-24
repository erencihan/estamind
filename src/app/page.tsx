'use client'

import {
  TrendingUp,
  Building2,
  Zap,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Target,
  Lightbulb,
  FileText,
  MessageCircle,
  Camera,
  Brain,
  Sparkles,
} from 'lucide-react'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="max-w-7xl mx-auto bg-surface-card border border-glass-border rounded-xl px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-accent flex items-center justify-center">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <span className="text-lg sm:text-xl font-dm font-bold text-white truncate">
            Esta<span className="text-accent">Mind</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Özellikler
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
            Fiyatlandırma
          </a>
          <a href="#demo" className="text-gray-300 hover:text-white transition-colors">
            Nasıl çalışır
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
          <a href="/login" className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap">
            Giriş Yap
          </a>
          <a href="/register" className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2 whitespace-nowrap">
            Kayıt Ol
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-card border border-glass-border text-accent text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Yapay Zeka Destekli Emlak Analizi
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-dm font-bold mb-6 leading-tight px-1">
          Bölgenizdeki en <span className="gradient-text">akıllı emlakçı</span> siz olun
        </h1>

        <p className="text-base sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto px-1">
          Mülk bilgisi veya ilan linki girin, yapay zeka saniyeler içinde fiyat ve strateji önerisi sunsun.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-500 text-xs sm:text-sm mb-16">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span>%99.7 Doğruluk</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span>5 Saniyede Analiz</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span>5000+ Emlakçı</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoWidget() {
  return (
    <section id="demo" className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-dm font-bold mb-4">Nasıl Çalışır?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            EstaMind, emlak profesyonellerinin işini kolaylaştıran akıllı bir analiz platformudur. Sadece mülk bilgilerini girin, yapay zeka size saniyeler içinde profesyonel bir fiyat analizi ve strateji önerileri sunsun.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              step: '1',
              title: 'Mülk Bilgisi',
              desc: 'Konum, m², oda sayısı gibi temel bilgileri girin',
              icon: <Building2 className="w-8 h-8 text-accent mx-auto mb-3" />,
            },
            {
              step: '2',
              title: 'AI Analizi',
              desc: 'Yapay zeka bölge verilerini ve pazar trendlerini analiz eder',
              icon: <Brain className="w-8 h-8 text-accent mx-auto mb-3" />,
            },
            {
              step: '3',
              title: 'Fiyat Önerisi',
              desc: 'Doğru fiyat aralığı ve alıcı profilleri belirlenir',
              icon: <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />,
            },
            {
              step: '4',
              title: 'Strateji',
              desc: 'İlan başlığı ve pazarlama önerileri ile satışa hazır',
              icon: <Target className="w-8 h-8 text-accent mx-auto mb-3" />,
            },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-xl mx-auto mb-4">
                {item.step}
              </div>
              {item.icon}
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-dm font-semibold break-words">Kadıköy, İstanbul — Caferağa Mah.</h3>
                  <p className="text-gray-400 text-sm break-words">3+1 Daire • 125 m² • 2018 Bina • Asansörlü • Deniz Manzarası</p>
                </div>
              </div>

              <div className="bg-surface-card rounded-xl p-6 border border-glass-border">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-gray-400">Önerilen Fiyat Aralığı</span>
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="flex flex-wrap items-end gap-2 sm:gap-4">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-success">₺4.2M</span>
                  <span className="text-gray-500 mb-1 hidden sm:inline">-</span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-white">₺4.8M</span>
                </div>
                <div className="mt-4 h-2 bg-primary rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-accent rounded-full" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Bölge ortalamasının %12 üzerinde • m² başı ₺33.600–₺38.400</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-card rounded-xl p-4 sm:p-5 border border-glass-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 shrink-0 text-accent" />
                    <span className="text-sm text-gray-400">Tahmini Satış Süresi</span>
                  </div>
                  <div className="font-semibold text-lg">18–24 gün</div>
                  <p className="text-xs text-gray-500 mt-1">Bölgede benzer ilanlar ortalama 21 günde satıldı</p>
                </div>
                <div className="bg-surface-card rounded-xl p-4 sm:p-5 border border-glass-border">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-accent" />
                    <span className="text-sm text-gray-400">Karşılaştırılan İlan</span>
                  </div>
                  <div className="font-semibold text-lg">47 adet</div>
                  <p className="text-xs text-gray-500 mt-1">Son 90 günde Kadıköy 3+1 satış verisi</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-card rounded-xl p-4 sm:p-5 border border-glass-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm text-gray-400">Potansiyel Alıcı</span>
                  </div>
                  <div className="font-semibold text-lg">Genç Aileler</div>
                  <div className="mt-2 h-1.5 bg-primary rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-accent rounded-full" />
                  </div>
                  <span className="text-xs text-accent mt-1 block">%85 olasılık • Okul ve ulaşım öncelikli</span>
                </div>
                <div className="bg-surface-card rounded-xl p-4 sm:p-5 border border-glass-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Yatırımcı Tipi</span>
                  </div>
                  <div className="font-semibold text-lg">Beyaz Yakalı</div>
                  <div className="mt-2 h-1.5 bg-primary rounded-full overflow-hidden">
                    <div className="h-full w-[15%] bg-blue-400 rounded-full" />
                  </div>
                  <span className="text-xs text-blue-400 mt-1 block">%15 olasılık</span>
                </div>
              </div>

              <div className="bg-surface-card rounded-xl p-5 border border-glass-border">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-gray-300">Bölge Özeti</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Caferağa mahallesi son 6 ayda %8 değer artışı gösterdi. Bağdat Caddesi’ne yürüme mesafesi ve metroya yakınlık talep skorunu yükseltiyor. Aynı blokta son 2 ayda 2 satış gerçekleşti (₺4.1M ve ₺4.45M).
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-surface-card rounded-xl p-6 border border-glass-border">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Talep Haritası</span>
                </div>
                <div className="space-y-3">
                  {[
                    { area: 'Merkez', demand: 95, color: 'bg-success' },
                    { area: 'Kadıköy', demand: 88, color: 'bg-success' },
                    { area: 'Bağdat Cd.', demand: 72, color: 'bg-accent' },
                    { area: 'Sahil', demand: 65, color: 'bg-warning' },
                    { area: 'Peripheri', demand: 45, color: 'bg-error' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-gray-400">{item.area}</span>
                        <span className="font-mono">{item.demand}%</span>
                      </div>
                      <div className="h-2 bg-primary rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.demand}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
                <p className="text-sm text-gray-300 mb-4">
                  Bu örnek rapor, gerçek verilerle üretilmiş bir demo analizidir. Müşterilerinize böyle detaylı raporlar sunarak güven kazanın ve satışları hızlandırın.
                </p>
                <a href="/register" className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  Hemen Başla
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-glass-border flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-400 text-xs sm:text-sm min-w-0">
              <Lightbulb className="w-4 h-4 shrink-0 text-accent" />
              <span className="break-words">İlan başlığınızı &quot;Sahile 5 Dakika&quot; yerine</span>
              <span className="text-accent font-semibold break-words">&quot;Şehrin Sessiz Vahası&quot;</span>
              <span>yaparsanız</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-success font-bold">%20 daha fazla tıklanma</span>
              <ArrowRight className="w-4 h-4 text-success" />
            </div>
          </div>

          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-surface-card border border-accent/25 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-semibold text-white mb-1">Emeklerinizin karşılığını alın</p>
              <p className="text-sm text-gray-400">Her müşteriye böyle bir rapor sunun; daha hızlı satış, daha yüksek komisyon.</p>
            </div>
            <a
              href="/register"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap shrink-0 w-full sm:w-auto"
            >
              Hemen Başla
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Akıllı Analiz Motoru',
      description: 'Yapay zeka destekli fiyatlandırma algoritması ile doğru piyasa değerini saniyeler içinde öğrenin.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Pazar Trendleri',
      description: 'Bölgenizdeki emlak piyasasının güncel durumunu, talep eğilimlerini ve rekabet analizini görün.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Alıcı Segmentasyonu',
      description: 'Mülkünüz için ideal alıcı profilini belirleyin ve pazarlama stratejinizi buna göre şekillendirin.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Anında PDF Rapor',
      description: 'Profesyonel analiz raporlarınızı anında oluşturun ve müşterilerinizle paylaşın.',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'WhatsApp Entegrasyonu',
      description: 'Analiz sonuçlarını doğrudan WhatsApp üzerinden müşterilerinize gönderin.',
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Görsel AI Analizi',
      description: 'Yüklediğiniz fotoğraflardan mülkün durumunu otomatik olarak değerlendirin.',
    },
  ]

  return (
    <section id="features" className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-dm font-bold mb-4">
            Neden <span className="gradient-text-light">EstaMind?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Manuel ekspertiz hatasını sıfıra indiren, doğru alıcıya doğrudan erişim sağlayan teknoloji
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="glass-card rounded-xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-dm font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Lite',
      price: 'Ücretsiz',
      description: 'İlk adımı atmak için',
      features: ['1 Analiz/Ay', 'Temel Fiyat Önerisi', 'Basit Karşılaştırma', 'E-posta Desteği'],
      cta: 'Başla',
      popular: false,
    },
    {
      name: 'Pro',
      price: '₺99',
      period: '/ay',
      description: 'Profesyoneller için',
      features: [
        '20 Analiz/Ay',
        'PDF Raporlama',
        'WhatsApp Entegrasyonu',
        'Alıcı Segmentasyonu',
        'İlan Optimizasyonu',
        'Öncelikli Destek',
      ],
      cta: 'Pro Ol',
      popular: true,
    },
    {
      name: 'Elite',
      price: '₺999',
      period: '/ay',
      description: 'Kurumsal çözümler',
      features: [
        'Sınırsız Analiz',
        'Bölgesel Rakip Analizi',
        'AI Fotoğraf İyileştirme',
        'Tüm Pro Özellikleri',
        'Özel Eğitim',
        '7/24 VIP Destek',
      ],
      cta: 'Elite Ol',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-dm font-bold mb-4">Basit, Şeffaf Fiyatlandırma</h2>
          <p className="text-gray-400 max-w-xl mx-auto">İhtiyacınıza göre seçin. İstediğiniz zaman upgrade edin.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative glass-card rounded-2xl p-6 sm:p-8 flex flex-col h-full ${
                plan.popular ? 'ring-2 ring-accent' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-primary text-sm font-bold rounded-full">
                  En Popüler
                </div>
              )}

              <div className="text-center mb-6 shrink-0">
                <h3 className="text-xl font-dm font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 min-h-[3rem]">
                  <span className="text-3xl sm:text-4xl font-dm font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 min-h-0 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/register"
                className={`w-full py-3 rounded-xl font-semibold transition-colors text-center block shrink-0 mt-auto ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 sm:py-12 px-4 sm:px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] border-t border-glass-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-dm font-bold">
                Esta<span className="text-accent">Mind</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm">Emlak profesyonelleri için yapay zeka destekli analiz platformu.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ürün</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <a href="#features" className="hover:text-accent transition-colors">
                  Özellikler
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-accent transition-colors">
                  Fiyatlandırma
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Şirket</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Hakkımızda
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Yasal</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Gizlilik
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Kullanım Şartları
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  KVKK
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-glass-border">
          <p className="text-gray-500 text-sm">© 2024 EstaMind. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DemoWidget />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
