# Teknik Özet Tablolar (Tek Bakışta)

Derin detay için kök dizindeki `CANLIYA_ALMA_RAPORU.md` ve `CANLI_DEPLOYMENT_REHBERI.md` dosyalarına bak.

---

## 1. Mevcut durum (özet)

| Bileşen | Şimdi |
|---------|--------|
| Frontend | Hazır |
| Auth | Mock (localStorage) |
| Analiz | Mock |
| Ödeme | Mock UI |
| PDF | Client’ta çalışıyor |

---

## 2. Veritabanı tabloları (hedef şema — kısaltılmış)

| Tablo | Ana alanlar |
|-------|-------------|
| **users** | id, email, name, plan_type, monthly_credits, used_credits, period_end, avatar_url, timestamps |
| **properties** | Mülk form alanları, user_id |
| **analyses** | property_id, user_id, results (JSON), credits_used, created_at |
| **reports** | user_id, analysis_id, report_type, file_url, created_at |
| **districts** | city, district, avg_price_per_sqm, demand_score, total_listings, updated_at |
| **payments** | user_id, amount, plan_type, provider, provider_transaction_id, status, created_at |

---

## 3. Ortam değişkenleri (isimler)

Proje kökünde `.env.example` ile aynı mantık:

| Değişken grubu | Örnek isimler |
|----------------|----------------|
| Uygulama | `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_NAME` |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| NextAuth | `NEXTAUTH_URL`, `NEXTAUTH_SECRET` |
| AI | `OPENAI_API_KEY`, (opsiyonel) `ANALYSIS_API_URL` |
| Ödeme | `IYZICO_API_KEY`, `IYZICO_SECRET_KEY`, `IYZICO_BASE_URL` |
| E-posta / Sentry | İsteğe bağlı — `.env.example` içinde |

**Kural:** `NEXT_PUBLIC_` ile başlayanlar tarayıcıya gider → gizli bilgi koyma.

---

## 4. Önerilen API uçları (hayali isimler)

| Method | Yol | Görevi |
|--------|-----|--------|
| POST | `/api/analysis` | Mülk → JSON analiz; kredi düş |
| POST | `/api/payment/checkout` veya `/api/subscription/upgrade` | Plan yükseltme |
| POST | Webhook URL | Ödeme sağlayıcıdan onay |

Gerçek yolları sen projede standartlaştırırsın.

---

## 5. Auth seçimi (kısa)

| Seçenek | Artı | Eksi |
|---------|------|------|
| **Supabase Auth** | DB + Auth + Storage birlikte | Öğrenme eğrisi |
| **NextAuth** | Next.js ile iyi entegrasyon | DB’yi ayrı kurarsın |

**Büyüme için:** Supabase genelde daha az parça.

---

## 6. Ödeme (Türkiye)

| Sağlayıcı | Not |
|-----------|-----|
| **iyzico** | Yaygın, Node SDK |
| **PayTR** | Yaygın, API |
| **Stripe** | Daha çok global |

Kart bilgisi: tokenization / iframe / redirect — düz metin backend’e gönderme.

---

## 7. AI seçimi (kısa)

| Yöntem | Ne zaman? |
|--------|-----------|
| **OpenAI API** | En hızlı ürünleştirme |
| **Kendi model (Python/FastAPI)** | Fiyat tahmini kontrolü ve regülasyon önemliyse |
| **Replicate** | Belirli modeller için |

---

## 8. Proje dosyaları (canlıya hazırlık)

| Dosya / klasör | İş |
|----------------|-----|
| `src/components/layout/AuthenticatedLayout.tsx` | Ortak panel düzeni |
| `src/lib/reportsStorage.ts` | Rapor localStorage soyutlama → sonra API’ye çevrilebilir |
| `src/middleware.ts` | Session kontrolü eklenecek |
| `.env.example` | Env listesi |

---

*MCP notu: Canlı sitede MCP zorunlu değil; geliştirme araçları (Cursor vb.) için. Ayrıntı `CANLI_DEPLOYMENT_REHBERI.md` bölüm 10.*
