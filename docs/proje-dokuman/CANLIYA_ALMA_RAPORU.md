# EstaMind — Canlıya Alma ve %100 Çalışır Hale Getirme Raporu

Bu doküman, projenin mock veriden gerçek API, ödeme ve kimlik doğrulama sistemine geçişi için gereken adımları ve teknik seçenekleri özetler.

---

## 1. Mevcut Durum Özeti

| Bileşen        | Durum        | Açıklama                                      |
|----------------|-------------|-----------------------------------------------|
| Frontend       | ✅ Hazır     | Next.js 14, Tailwind, Framer Motion, Recharts |
| Auth           | ⚠️ Mock     | localStorage, demo kullanıcı                  |
| Analiz / AI    | ⚠️ Mock     | Sabit sonuçlar, gerçek model yok              |
| Ödeme          | ⚠️ Mock     | Kart formu var, gerçek ödeme yok              |
| Rapor / PDF    | ✅ Client   | html2pdf.js ile çalışıyor                     |
| Abonelik akışı | ✅ UI hazır | Plan seçimi ve ödeme modalı var               |

---

## 2. Giriş ve Kayıt (Auth) — Gerçek Uygulama

### Önerilen Çözüm: Supabase Auth veya NextAuth.js

**Seçenek A: Supabase Auth**

- **Avantaj:** Tek platformda Auth + PostgreSQL (veritabanı) + Realtime. Türkiye’de kullanımı yaygın.
- **Akış:**
  - E-posta/şifre ile kayıt ve giriş.
  - Opsiyonel: Magic link, Google/GitHub OAuth.
  - `supabase.auth.getUser()` ile session; Next.js API Route veya Middleware ile koruma.
- **Entegrasyon:** `@supabase/supabase-js` + `@supabase/ssr`. `AuthContext` içinde `login`/`register`/`logout` Supabase client metodlarına bağlanır; localStorage mock kaldırılır.

**Seçenek B: NextAuth.js**

- **Avantaj:** Next.js ile uyumlu, birçok provider (Credentials, Google, GitHub vb.) hazır.
- **Akış:** Credentials provider ile e-posta/şifre veya OAuth. Session JWT veya database session.
- **Veritabanı:** Kullanıcı kayıtları için PostgreSQL (Supabase/Neon/Vercel Postgres) ile adapter kullanılır.

**Tavsiye:** Veritabanı ve ileride Realtime istiyorsanız **Supabase Auth**; sadece auth ve esnek provider istiyorsanız **NextAuth.js**.

### Yapılacaklar (Auth)

1. Supabase projesi oluştur veya NextAuth + DB adapter kur.
2. `AuthContext`: `login`/`register`/`signInWithGoogle` içinde gerçek API çağrıları (Supabase veya NextAuth).
3. Korumalı sayfalar için middleware: `/dashboard/*`, `/analysis/*` için session kontrolü.
4. Şifre sıfırlama: Supabase “Reset password” veya NextAuth e-posta ile link.

---

## 3. Emlak Verileri ve Yapay Zeka Entegrasyonu

### 3.1 Piyasa / Fiyat Verisi Kaynakları

| Kaynak              | Veri türü           | Nasıl kullanılır                    |
|---------------------|---------------------|-------------------------------------|
| **KBBS / TÜİK**     | Konut fiyat endeksi | Resmi oranlar, raporlama           |
| **Şirket içi veritabanı** | Satılan emlak (sold-properties) | Kullanıcı girdisi → bölge/segment ortalamaları |
| **Harita / konum API**   | İl, ilçe, mahalle   | Fiyat ve talep bölge eşlemesi      |

Gerçek zamanlı “canlı emlak ilanları” için bir sağlayıcı (ör. açık veri, partner emlak siteleri API’si) gerekir; bu ticari anlaşmaya bağlıdır.

### 3.2 Fiyat Tahmini ve Analiz için AI

**Amaç:** Mülk özellikleri (il, ilçe, m², oda, bina yaşı vb.) → fiyat aralığı, talep, strateji.

**Seçenekler:**

| Çözüm            | Kullanım şekli |
|------------------|----------------|
| **OpenAI GPT-4o / API** | Metin prompt: “Şu özelliklere göre İstanbul Kadıköy’de fiyat aralığı ve strateji öner.” JSON çıktı ile frontend’e ver. |
| **Replicate**    | Açık model (örn. fiyat regresyonu) veya fine-tune edilmiş modeli API olarak çalıştırma. |
| **Kendi modelin (Python)** | Scikit-learn / XGBoost ile bölge+m²+oda vb. ile fiyat modeli; FastAPI ile REST endpoint; Next.js API Route bu endpoint’i çağırır. |

**Öneri (hızlı canlıya alma):**

- **Backend:** Next.js API Routes (`/api/analysis/...`) veya ayrı **FastAPI** servisi.
- **AI katmanı:**  
  - Hızlı prototip: **OpenAI API** (tek prompt ile fiyat aralığı + kısa strateji + alıcı segmenti).  
  - Daha kontrollü ve tekrarlanabilir: **Kendi regresyon modeli** (Python) + bölge ortalamaları (DB’den); GPT sadece “açıklama metni” için kullanılabilir.

### 3.3 Alıcı Segmentasyonu ve İlan Önerileri

- **Segmentasyon:** Kural tabanlı (oda sayısı, fiyat bandı, bölge) veya GPT’ye “bu mülk için hedef kitle” sorusu.
- **İlan başlığı önerileri:** GPT’ye mülk özeti verilip 3–5 başlık ürettirilir.

### Yapılacaklar (AI / Veri)

1. **Veritabanı:** Bölge bazlı ortalama m² fiyatı, talep skoru tabloları (ör. `districts`, `market_snapshots`). Sold-properties verisi bu tabloları besler.
2. **API:** `POST /api/analysis` (veya FastAPI ` /v1/analysis`): body’de mülk bilgileri → AI/regresyon + kurallar → JSON (suggestedPriceMin/Max, demandLevel, buyerSegments, titleSuggestions vb.).
3. **Frontend:** Analiz sayfası bu API’yi çağırır; loading/success/error durumları ve kredi düşümü (backend’de) bağlanır.

---

## 4. Ödeme Sistemi

### 4.1 Türkiye Odaklı Seçenekler

| Sağlayıcı      | Özellikler                          | Entegrasyon              |
|----------------|-------------------------------------|---------------------------|
| **iyzico**     | Kredi kartı, 3D Secure, taksit       | API + Node.js SDK         |
| **PayTR**      | Kredi kartı, sanal pos, 3D          | API                       |
| **Stripe**     | Global kart, Subscription           | Webhook + Subscription API |

**Öneri (TR):** **iyzico** veya **PayTR** — 3D Secure ve taksit için uygun. Abonelik (aylık yenileme) için sağlayıcının “recurring” desteği kullanılır.

### 4.2 Akış (Abonelik)

1. Kullanıcı Pro/Elite seçer → **Ödeme sayfası/modal** (kart bilgileri).
2. Frontend kart verisini **asla loglamaz**; sadece sağlayıcı SDK veya backend’e gönderir.
3. **Backend (API Route):** Kart bilgisi veya iyzico/PayTR token’ı alır → ödeme sağlayıcı API’sini çağırır.
4. Başarılı ödeme → Veritabanında `users` (veya `subscriptions`) güncellenir: `plan_type`, `period_end`, `payment_id`.
5. **Webhook (tercihen):** Sağlayıcıdan gelen “ödeme onaylandı” event’i ile plan ve kredi güncellemesi (idempotent).

### 4.3 Güvenlik

- Kart numarası **text** olarak gösterilebilir (kullanıcı talebi) ama **backend’e düz metin gönderilmemeli**; sağlayıcı tokenization kullanılmalı.
- Ödeme sayfası **HTTPS** ve sağlayıcının önerdiği **PCI** uyumlu yöntem (iframe / redirect / tokenization).

### Yapılacaklar (Ödeme)

1. iyzico veya PayTR hesabı, test ve canlı API anahtarları.
2. Backend: `POST /api/payment/checkout` (veya `/api/subscription/upgrade`): plan + kullanıcı + kart token → sağlayıcı çağrısı → DB güncellemesi.
3. Frontend: Ödeme modalında sağlayıcı SDK veya backend’in döndüğü form/URL ile ödeme; başarı/hata sonrası plan bilgisini AuthContext ve DB’den okuyacak şekilde güncelleme.

---

## 5. Veritabanı ve Backend API

### 5.1 Şema (Özet)

- **users:** id, email, name, plan_type, monthly_credits, used_credits, period_end, avatar_url, created_at, updated_at.
- **properties:** Kullanıcının eklediği veya analiz ettiği mülkler (form alanları).
- **analyses:** property_id, user_id, analysis_type, results (JSON), credits_used, created_at.
- **reports:** user_id, property_id, analysis_id, report_type, file_url, created_at.
- **districts:** id, city, district, avg_price_per_sqm, demand_score, total_listings, updated_at.
- **payments:** user_id, amount, plan_type, provider, provider_transaction_id, status, created_at.

### 5.2 Backend Tercihi

- **Supabase:** Auth + PostgreSQL + Realtime + Storage (PDF rapor). REST ve Realtime API otomatik.
- **Alternatif:** Vercel Postgres / Neon + Next.js API Routes veya ayrı FastAPI + PostgreSQL.

### Yapılacaklar (DB / API)

1. Supabase (veya seçilen DB) projesi; `schema.sql` ile tabloların oluşturulması.
2. Kullanıcı CRUD, plan ve kredi güncellemesi için API Route’lar.
3. Analiz sonuçlarının kaydı (`analyses`, `reports`); rapor PDF’lerinin Supabase Storage’a yüklenmesi (opsiyonel).

---

## 6. Projeyi %100 Çalışır Hale Getirme — Adım Listesi

| Sıra | Görev | Öncelik |
|------|--------|---------|
| 1 | Supabase (veya DB) + Auth kurulumu; AuthContext’i gerçek session’a bağlama | Yüksek |
| 2 | Korumalı rotalar için middleware (session kontrolü) | Yüksek |
| 3 | Analiz API’si: mülk girdisi → AI/regresyon → JSON; kredi düşümü | Yüksek |
| 4 | Bölge/fiyat verisi: districts tablosu + sold-properties ile besleme | Orta |
| 5 | Ödeme sağlayıcı (iyzico/PayTR) entegrasyonu; plan yükseltme ve webhook | Yüksek |
| 6 | Abonelik yenileme: period_end kontrolü, kredi sıfırlama (cron veya webhook) | Orta |
| 7 | PDF raporlarının kalıcı saklanması (Storage) ve rapor listesinin DB’den gelmesi | Orta |
| 8 | E-posta: kayıt onayı, şifre sıfırlama, ödeme makbuzu (SendGrid, Resend, vb.) | Düşük |
| 9 | Hata loglama ve izleme (Sentry vb.) | Orta |
| 10 | Production ortam değişkenleri ve gizli anahtarların güvenli yönetimi | Yüksek |

---

## 7. Özet

- **Auth:** Supabase Auth veya NextAuth + PostgreSQL; mock localStorage kaldırılacak.
- **Emlak verisi:** Kendi DB’niz (bölge ortalamaları, sold-properties) + isteğe bağlı dış kaynak; fiyat tahmini için OpenAI veya kendi modeliniz.
- **Ödeme:** iyzico/PayTR ile kart ve abonelik; tokenization ve webhook ile güvenli ve otomatik plan güncellemesi.
- **Backend:** Next.js API Routes veya FastAPI; tek bir veritabanı (Supabase önerilir) ile kullanıcı, plan, analiz ve raporlar tutulur.

Bu adımlar tamamlandığında uygulama, mock veriden bağımsız ve canlı ortamda %100 işlevsel çalışacak şekilde yapılandırılmış olur.

---

*Rapor tarihi: Mart 2025 — EstaMind Canlıya Alma Planı*
