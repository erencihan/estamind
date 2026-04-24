# EstaMind - 1 Haftalik Canliya Gecis Teknik Gorev Listesi

Bu belge, mevcut demo yapiyi production seviyesine tasimak icin 7 gunluk teknik uygulama planini sirali ve dosya bazli olarak verir.

## Kapsam

- Gercek kimlik dogrulama (Supabase Auth)
- Veritabani baglantisi (Supabase/PostgreSQL)
- Gercek analiz API akisi (OpenAI)
- Odeme ve abonelik guncelleme akisi
- Dashboard verilerinin mock'tan gercek veriye alinmasi
- Guvenlik, rate limit, deploy kontrolleri

## Gun 1 - Auth Altyapisi

1. `package.json`
- `@supabase/supabase-js` ve `@supabase/ssr` bagimliliklarini ekle.

2. `.env.local`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

3. `src/lib/supabase.ts` (yeni)
- Client tarafi Supabase singleton'i tanimla.

4. `src/context/AuthContext.tsx`
- Mock `login/register/signInWithGoogle/logout` akisini kaldir.
- `supabase.auth.signInWithPassword`, `signUp`, `signInWithOAuth`, `signOut` ile degistir.

5. `src/middleware.ts`
- Sadece cookie var/yok kontrolu yerine Supabase session dogrulamasi yap.
- Yetkisiz kullaniciyi `login` sayfasina yonlendir.

## Gun 2 - Veritabani ve Rapor CRUD

1. `database/schema.sql`
- Supabase SQL Editor'de calistir.

2. `src/lib/reportsStorage.ts`
- `localStorage` tabanli tum rapor islemlerini Supabase `reports` tablosu CRUD'a tasi.
- Mevcut fonksiyon isimlerini koru: `getSavedReports`, `addReport`, `removeReportById`, `getReportById`.

3. `src/app/dashboard/reports/page.tsx`
- Soft delete akisini tablo alanlariyla uyumlu hale getir (`is_deleted`, `deleted_at`).

## Gun 3 - Gercek Analiz API

1. `.env.local`
- `OPENAI_API_KEY` ekle.

2. `src/config/constants.ts`
- `NEXT_PUBLIC_ANALYSIS_VIA_API=true` ile API moduna gec.

3. `src/app/api/analysis/route.ts`
- `runAnalysis(body)` yerine OpenAI cagrisi yap.
- Donen veriyi `AnalysisResult` semasina normalize et.

4. `src/lib/analysisEngine.ts`
- Mock motoru fallback amacli koru, ama birincil akisi API route'a birak.

5. `src/app/api/analysis/route.ts`
- Kredi kontrolu ekle: `used_credits < monthly_credits`.
- Basarili analiz sonrasi `used_credits` artir.

## Gun 4 - Kullanici Profili ve Ayarlar

1. `src/app/api/user/route.ts` (yeni)
- `PATCH` endpoint: `plan_type`, `monthly_credits`, `used_credits`, profil alanlari.

2. `src/context/AuthContext.tsx`
- `addCredits`, `updatePlan`, `incrementDataContributions` logic'ini API tabanli yap.

3. `src/components/settings/SettingsProfileSection.tsx`
- Profil guncellemeyi gercek API'ye bagla.

4. `src/components/settings/PasswordChangeModal.tsx`
- `supabase.auth.updateUser({ password })` akisini uygula.

5. `src/components/settings/DeleteAccountModal.tsx`
- Hesap silme akisini server endpoint uzerinden guvenli sekilde calistir.

## Gun 5 - Odeme ve Abonelik

1. `.env.local`
- `IYZICO_API_KEY`
- `IYZICO_SECRET_KEY`
- `IYZICO_BASE_URL`

2. `src/app/api/payment/checkout/route.ts` (yeni)
- Plan secimine gore odeme oturumu olustur.

3. `src/app/api/payment/webhook/route.ts` (yeni)
- Saglayici callback dogrulama.
- Basarili odeme sonrasi `payments` kaydi + kullanici plan/kredi guncellemesi.

4. `src/components/settings/PaymentModal.tsx`
- Frontend odeme tetikleyicisini checkout endpoint'ine bagla.

5. `src/app/dashboard/subscription/page.tsx`
- Plan yukseltme butonlarini gercek odeme akisina bagla.

## Gun 6 - Dashboard Gercek Veri

1. `src/app/api/market/route.ts` (yeni)
- Sehir/ilce bazli market verisini Supabase'den dondur.

2. `src/components/dashboard/dashboardData.ts`
- Statik `marketData`, `popularSearchTerms`, `regionalDemandRows` icin API tabanli veri cekimine gec.

3. `src/components/dashboard/DashboardStatsGrid.tsx`
- Kredi, rapor sayisi, kullanici metriklerini backend kaynakli yap.

4. `src/components/dashboard/RecentReportsPanel.tsx`
- Reports kaynagini Supabase ile senkron hale getir.

## Gun 7 - Guvenlik, Test ve Deploy

1. `src/config/constants.ts`
- Feature flag'leri production moduna cek.

2. `src/app/api/analysis/route.ts`
- Rate limit ve kapsamli hata yonetimi ekle.

3. `src/middleware.ts`
- API koruma kapsamini netlestir; webhook gibi istisnalari acikca ayir.

4. `next.config.js`
- Supabase storage/image domain ayarlarini ekle.

5. Vercel ortam ayarlari
- Tum env degiskenlerini Production/Preview icin tanimla.
- Deploy sonrasi login, analiz, rapor, odeme, abonelik senaryolarini smoke test et.

## Bagimlilik Sirasi (Kritik)

1. Auth
2. Veritabani
3. Analiz API
4. Profil/Ayarlar
5. Odeme
6. Dashboard veri gecisi
7. Guvenlik + deploy

Bu sira bozulursa sonraki adimlarin test edilebilirligi duser.

## Cikis Kriterleri

- Mock auth kodu tamamen kaldirilmis olmali.
- `localStorage` rapor kaydi yerine DB kaydi kullanilmali.
- Analiz sonucu API uzerinden uretilmeli.
- Odeme basarili oldugunda plan ve kredi otomatik guncellenmeli.
- Lite/Pro/Elite yetkilendirmesi server tarafinda da enforce edilmeli.
- Production deploy sonrasi temel akislar (login -> analiz -> rapor -> odeme -> plan guncelleme) sorunsuz calismali.
