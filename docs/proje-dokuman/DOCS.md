# EstaMind - Proje Dokümantasyonu

## 📁 Proje Yapısı

```
estamind/
├── src/
│   ├── app/                    # Next.js App Router Sayfaları
│   │   ├── page.tsx            # Ana Landing Page
│   │   ├── layout.tsx          # Root Layout (AuthProvider ile)
│   │   ├── globals.css         # Global stiller (Glassmorphism)
│   │   ├── login/              # Giriş sayfası
│   │   │   └── page.tsx
│   │   ├── register/           # Kayıt sayfası
│   │   │   └── page.tsx
│   │   ├── dashboard/          # Dashboard (ileride)
│   │   │   └── page.tsx
│   │   └── analysis/
│   │       └── new/           # Yeni Analiz sayfası
│   │           └── page.tsx
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication Context
│   └── types/
│       └── database.ts          # TypeScript tip tanımları
├── database/
│   └── schema.sql              # PostgreSQL veritabanı şeması
├── package.json                # Bağımlılıklar
├── tailwind.config.ts          # Tailwind CSS yapılandırması
├── tsconfig.json               # TypeScript yapılandırması
└── README.md                   # Proje açıklaması
```

---

## 🔐 Authentication (Kimlik Doğrulama)

### AuthContext (`src/context/AuthContext.tsx`)
Kullanıcı kimlik doğrulama işlemlerini yönetir.

**Özellikler:**
- `user`: Mevcut kullanıcı nesnesi (User tipi)
- `isLoading`: Yükleniyor durumu
- `login(email, password)`: Giriş yap
- `register(email, password, name)`: Kayıt ol
- `logout()`: Çıkış yap

**Kullanım:**
```
tsx
import { useAuth } from '@/context/AuthContext'

function MyComponent() {
  const { user, login, logout } = useAuth()
  
  if (user) {
    return <p>Hoş geldin, {user.name}!</p>
  }
}
```

---

## 📝 Sayfalar

### 1. Ana Sayfa (`/`) - Landing Page
**Özellikler:**
- Glassmorphism UI tasarımı
- Interaktif demo widget'ı
- Özellikler bölümü
- Fiyatlandırma planları
- Giriş/Kayıt butonları (işlevsel)

**Butonlar:**
- "Giriş Yap" → `/login`
- "Ücretsiz Dene" → `/register`
- "Ücretsiz Analiz Yap" → `/register`

---

### 2. Giriş Sayfası (`/login`)
**Özellikler:**
- E-posta ve şifre girişi
- Şifre göster/gizle
- "Beni hatırla" seçeneği
- Google ve GitHub ile giriş (UI hazır)
- Kayıt ol sayfasına yönlendirme
- Hata mesajları

**Form Validasyonu:**
- Tüm alanların doldurulması zorunlu

---

### 3. Kayıt Sayfası (`/register`)
**Özellikler:**
- Ad Soyad, E-posta, Telefon, Şirket
- Şifre gereksinimleri kontrolü:
  - En az 8 karakter
  - Büyük harf içermeli
  - Rakam içermeli
- Şifre tekrarı eşleştirme
- Kullanım şartları kabulü

---

### 4. Yeni Analiz Sayfası (`/analysis/new`)
**Özellikler:**
- Mülk türü seçimi (8 tip)
- Satılık/Kiralık seçimi
- Şehir ve ilçe seçimi (İstanbul, Ankara, İzmir)
- Adres bilgisi
- m², oda sayısı, banyo sayısı
- Kat bilgileri (bulunduğu kat, toplam kat)
- Bina detayları:
  - Bina yaşı
  - Bina tipi (Betonarme, Kagir, vb.)
  - Isıtma tipi
  - Cephe
- Özellikler (asansör, otopark, balkon, bahçe, depo, tadilat)
- Mevcut fiyat (opsiyonel)

**AI Analiz Sonuçları:**
- Önerilen fiyat aralığı
- m² başına fiyat
- Güven skor
- Talep seviyesi
- Tahmini satış süresi
- Potansiyel alıcı profilleri
- İlan başlığı önerileri
- PDF indirme butonu
- WhatsApp paylaşım butonu

---

## 🗄️ Veritabanı Şeması

### Tablolar

**users** - Kullanıcılar
- id, email, password_hash, name, phone, company
- plan_type (lite/pro/elite)
- monthly_credits, used_credits
- is_verified, is_active

**properties** - Emlak İlanları
- user_id, district_id
- property_type, listing_type
- address, city, district
- area_sqm, room_count, bathroom_count
- price, suggested_price_min, suggested_price_max
- status (draft/active/pending/sold/rented/archived)

**analyses** - Analizler
- user_id, property_id
- analysis_type (pricing/market/comparable/trend)
- results (JSONB)
- base_price, adjusted_price
- confidence_level

**reports** - Raporlar
- user_id, property_id, analysis_id
- report_type, format (pdf/html/json)
- file_url, data (JSONB)

---

## 🎨 Tasarım Sistem

### Renkler
```
css
--primary: #0F172A          /* Deep Navy */
--accent: #F59E0B          /* Amber Gold */
--success: #10B981         /* Emerald */
--warning: #F97316         /* Orange */
--error: #EF4444           /* Red */
--glass-bg: rgba(255, 255, 255, 0.08)
--dark-surface: #0C1222
```

### Bileşenler
- `.glass` - Cam efektli kutu
- `.glass-card` - Cam efektli kart
- `.btn-primary` - Ana buton (amber gradient)
- `.btn-secondary` - İkincil buton (glass)
- `.input-glass` - Cam efektli input

### Animasyonlar
- Framer Motion ile:
  - fadeInUp
  - staggerContainer
- Floating orbs (arka plan)
- Hover efektleri

---

## 🚀 Kurulum

```
bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Build
npm run build

# Production
npm start
```

---

## 📱 API Endpointleri (İleride)

- `POST /api/auth/login` - Giriş
- `POST /api/auth/register` - Kayıt
- `GET /api/analyses` - Analizleri listele
- `POST /api/analyses` - Yeni analiz oluştur
- `GET /api/properties` - İlanları listele
- `POST /api/properties` - Yeni ilan ekle

---

## 🔧 Geliştirme Notları

1. **AuthContext** şu an localStorage kullanıyor (demo için)
2. **AI Analiz** simüle edilmiş (gerçek API entegrasyonu gerekli)
3. **Veritabanı** henüz bağlı değil (Supabase/PostgreSQL gerekli)
4. **Dashboard** temel yapı mevcut, detaylandırılabilir

---

## 📞 Destek

- Email: hello@estamind.com *(örnek)*
- GitHub: github.com/your-org/estamind *(örnek)*

---

**Son Güncelleme:** 2024
