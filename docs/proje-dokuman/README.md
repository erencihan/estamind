# EstaMind - Akıllı Emlak Analiz Platformu

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=framer" alt="Framer">
</p>

## 🚀 Proje Hakkında

**EstaMind**, emlak danışmanları için geliştirilmiş yapay zeka tabanlı bir mülk analiz, fiyatlandırma ve pazarlama otomasyon platformudur.

> **Motto:** "İlan girme, analiz et. Veriyle sat, güven kazan."

### ✨ Temel Özellikler

- 🎯 **Akıllı Fiyatlandırma**: AI destekli fiyat önerileri
- 📊 **Pazar Analizi**: Bölgesel trend ve talep haritası
- 👥 **Alıcı Segmentasyonu**: Potansiyel alıcı profilleri
- 📝 **İlan Optimizasyonu**: Başlık ve açıklama önerileri
- 📄 **PDF Raporlama**: Profesyonel analiz raporları
- 📱 **WhatsApp Entegrasyonu**: Hızlı müşteri paylaşımı

---

## 🛠️ Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, Framer Motion |
| **Backend** | Node.js / Python (FastAPI) |
| **Database** | PostgreSQL / Supabase |
| **AI** | OpenAI GPT-4o, Replicate |

---

## 📁 Proje Yapısı

```
estamind/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Landing Page
│   │   ├── layout.tsx      # Root Layout
│   │   ├── globals.css     # Global Styles
│   │   └── dashboard/     # Dashboard Pages
│   │       └── page.tsx
│   └── types/
│       └── database.ts     # TypeScript Types
├── database/
│   └── schema.sql          # PostgreSQL Schema
├── public/                 # Static Assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🏗️ Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Adımlar

```
bash
# Projeyi klonlayın
git clone https://github.com/yourusername/estamind.git
cd estamind

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcıda açın: [http://localhost:3000](http://localhost:3000)

---

## 📱 Sayfalar

### 1. Landing Page (`/`)
- 🎨 Glassmorphism UI tasarımı
- 📊 Interaktif örnek analiz widget'ı
- 💰 Fiyatlandırma planları (Lite/Pro/Elite)

### 2. Dashboard (`/dashboard`)
- 📈 İstatistik kartları
- 📉 Fiyat trend grafiği
- 🗺️ Talep haritası
- 📋 Son analizler

---

## 🗄️ Veritabanı Şeması

Ana tablolar:
- **users**: Kullanıcı bilgileri ve abonelik planları
- **properties**: Emlak ilanları
- **analyses**: AI analiz sonuçları
- **reports**: Oluşturulan raporlar
- **payments**: Ödeme geçmişi
- **districts**: Bölgesel pazar verileri

Detaylı şema için: [`database/schema.sql`](database/schema.sql)

---

## 💰 Fiyatlandırma Planları

| Özellik | Lite (Ücretsiz) | Pro (₺999/ay) | Elite (₺2499/ay) |
|---------|----------------|---------------|------------------|
| Analiz/Ay | 1 | 20 | Sınırsız |
| PDF Rapor | ❌ | ✅ | ✅ |
| WhatsApp Paylaşım | ❌ | ✅ | ✅ |
| Alıcı Segmentasyonu | ❌ | ✅ | ✅ |
| İlan Optimizasyonu | ❌ | ✅ | ✅ |
| Rakip Analizi | ❌ | ❌ | ✅ |
| AI Fotoğraf İyileştirme | ❌ | ❌ | ✅ |
| API Erişimi | ❌ | ❌ | ✅ |

---

## 🤖 AI Fiyatlandırma Algoritması

```
Fiyat = (Bölge Ortalaması × Durum Katsayısı) ± Trend Faktörü
```

**Durum Katsayıları:**
- Lüks: 1.25
- İyi: 1.10
- Orta: 1.00
- Bakımsız: 0.85

---

## 📝 API Tipleri

```
typescript
type PlanType = 'lite' | 'pro' | 'elite';
type PropertyType = 'apartment' | 'villa' | 'house' | 'land' | 'commercial' | 'studio' | 'duplex' | 'penthouse';
type ListingType = 'sale' | 'rent';
```

Detaylı tipler için: [`src/types/database.ts`](src/types/database.ts)

---

## 🧭 Kod yapısı ve bakım

Production’da hata ayıklama ve refaktör için özet: [`docs/KOD_YAPISI_VE_BAKIM.md`](docs/KOD_YAPISI_VE_BAKIM.md)

Canlıya geçiş için 1 haftalık teknik görev listesi: [`docs/proje-dokuman/1-HAFTALIK_CANLIYA_GECIS_TEKNIK_GOREV_LISTESI.md`](docs/proje-dokuman/1-HAFTALIK_CANLIYA_GECIS_TEKNIK_GOREV_LISTESI.md)

---

## 🔒 Lisans

MIT License - Tüm hakları saklıdır.

---

## 📞 İletişim

- 🌐 Website: [estamind.com](https://estamind.com) *(örnek — kendi alan adınızı kullanın)*
- 📧 Email: hello@estamind.com *(örnek)*

---

<p align="center">
  <strong>EstaMind</strong> - Bölgenizdeki en akıllı emlakçı siz olun 🏠
</p>
