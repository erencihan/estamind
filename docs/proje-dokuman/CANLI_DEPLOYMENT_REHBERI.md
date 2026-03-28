# EstaMind — Canlıya Alma Rehberi

Bu doküman, projeyi **localhost’tan çıkarıp domain ve hosting ile canlıya almanız** için gerekli tüm adımları, domain seçiminden API ve yapay zeka bağlantılarına kadar detaylı anlatır.

---

## İçindekiler

1. [Canlıya Almadan Önce Kod Yapısı](#1-canlıya-almadan-önce-kod-yapısı)
2. [Domain Alma ve Seçim](#2-domain-alma-ve-seçim)
3. [Domain Ayarları (DNS)](#3-domain-ayarları-dns)
4. [Hosting Seçimi ve Kurulum](#4-hosting-seçimi-ve-kurulum)
5. [Ortam Değişkenleri (Env)](#5-ortam-değişkenleri-env)
6. [Kimlik Doğrulama (Auth) API](#6-kimlik-doğrulama-auth-api)
7. [Yapay Zeka ve Analiz API](#7-yapay-zeka-ve-analiz-api)
8. [Ödeme API (iyzico / PayTR)](#8-ödeme-api-iyzico--paytr)
9. [Veritabanı ve Backend](#9-veritabanı-ve-backend)
10. [MCP ve Geliştirme Araçları](#10-mcp-ve-geliştirme-araçları)
11. [Güvenlik ve Canlı Checklist](#11-güvenlik-ve-canlı-checklist)

---

## 1. Canlıya Almadan Önce Kod Yapısı

Canlıya almadan önce projede aşağıdaki iyileştirmeler yapıldı; böylece kod daha **hızlı anlaşılır** ve **bakımı kolay**:

### 1.1 Yapılan İyileştirmeler

| Konu | Açıklama |
|------|----------|
| **Ortak layout** | `src/components/layout/AuthenticatedLayout.tsx` eklendi. Dashboard ve Analysis sayfaları aynı sidebar/header yapısını kullanıyor; menü öğeleri `menuItems` ile yapılandırılıyor. |
| **Rapor depolama tutarlılığı** | Tüm rapor okuma/yazma işlemleri `src/lib/reportsStorage.ts` ve `STORAGE_KEYS.SAVED_REPORTS` üzerinden yapılıyor. Doğrudan `localStorage.getItem('savedReports')` kullanımı kaldırıldı. |
| **Rapor tipi birliği** | Raporlar `SavedReport` tipi ve **id: string** ile tutuluyor. Liste ve detay sayfaları `getSavedReports()`, `getReportById()`, `removeReportById()`, `addReport()` kullanıyor. |
| **Ortam değişkenleri** | `.env.example` eklendi. Tüm API URL, API key ve gizli bilgiler env üzerinden yönetilecek; canlıda hosting panelinden girilecek. |
| **Middleware iskeleti** | `src/middleware.ts` eklendi. `/dashboard` ve `/analysis` için ileride session kontrolü (Supabase/NextAuth) buradan yapılacak. |

### 1.2 Proje Özeti

- **Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.
- **Şu an:** Sadece frontend; auth ve analiz mock (localStorage). Canlıda gerçek Auth + Analiz API + Ödeme entegre edilecek.

---

## 2. Domain Alma ve Seçim

### 2.1 Nereden Domain Alınır?

| Sağlayıcı | Not | Fiyat (örnek) |
|-----------|-----|----------------|
| **Getir Domain** (getir.domain) | Türkiye, TL ile ödeme | .com ~₺300–500/yıl |
| **Natro** | Türkiye, .com.tr uygun | .com.tr ~₺100–200/yıl |
| **GoDaddy** | Global, sık kullanılan | .com ~$12–15/yıl |
| **Namecheap** | Uygun fiyat | .com ~$8–12/yıl |
| **Cloudflare Registrar** | Maliyet fiyatı, DNS Cloudflare’da | .com ~$9/yıl |

Türkiye’de hizmet verecekseniz **.com** veya **.com.tr** tercih edebilirsiniz.

### 2.2 Domain Seçerken Dikkat

- Kısa, akılda kalıcı (örn: `estamind.com`).
- Tire (-) mümkünse az.
- Marka / ticari unvan ile uyumlu olsun.

### 2.3 Adımlar (Genel)

1. Sağlayıcıda hesap açın.
2. Domain arama kutusuna istediğiniz adı yazın.
3. Uygun uzantıyı seçip sepete ekleyin (1–2 yıl önerilir).
4. Ödeme ve whois bilgilerini doldurup satın alın.
5. Erişim bilgileri ve DNS yönetim panelinin nerede olduğunu not alın (bir sonraki adımda kullanılacak).

---

## 3. Domain Ayarları (DNS)

Canlı siteyi göstermek için domain’in **hosting’e yönlenmesi** gerekir.

### 3.1 Vercel Kullanıyorsanız (Önerilen)

Vercel, kendi DNS’ini sunar. İki yol vardır:

**A) Domain’i Vercel’e taşımak (nameserver değiştirme)**

1. Vercel Dashboard → Proje → **Settings** → **Domains**.
2. Domain’i ekleyin (örn: `estamind.com`).
3. Vercel size **nameserver** adresleri verir (örn: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
4. Domain sağlayıcınızda (Getir, Natro, GoDaddy vb.) **Nameserver** alanını bu değerlerle güncelleyin.
5. 24–48 saat içinde yayına geçer; Vercel otomatik SSL (HTTPS) sağlar.

**B) Sadece DNS kayıtları ile (domain sağlayıcıda kalır)**

1. Vercel’de domain ekleyin; Vercel size **A** veya **CNAME** hedeflerini söyler.
2. Domain sağlayıcınızın **DNS / Yönetim** panelinde:
   - **A kaydı:** `@` (veya boş) → Vercel’in verdiği IP (örn: `76.76.21.21`).
   - **CNAME:** `www` → `cname.vercel-dns.com` (Vercel’in söylediği değer).
3. Kaydet; yayına geçmesi birkaç saat sürebilir.

### 3.2 SSL (HTTPS)

Vercel, domain kendisine yönlendirildiğinde **Let’s Encrypt** ile otomatik SSL verir. Ek bir işlem gerekmez.

---

## 4. Hosting Seçimi ve Kurulum

### 4.1 Neden Vercel?

- Next.js’in resmi ortaklığı, sıfır konfigürasyon.
- Otomatik build, preview URL’ler, serverless API routes.
- Ücretsiz plan yeterli başlangıç için; domain ve env kolay.

### 4.2 Vercel’de Projeyi Canlıya Alma

1. **Hesap:** [vercel.com](https://vercel.com) → GitHub/GitLab/Bitbucket ile giriş.
2. **Import:** “Add New Project” → GitHub’dan `estamind` reposunu seçin.
3. **Build ayarları:**
   - Framework: **Next.js** (otomatik algılanır).
   - Root Directory: boş (veya proje kökü).
   - Build Command: `next build` (varsayılan).
   - Output: Next.js varsayılan.
4. **Environment Variables:** “Environment Variables” bölümüne girin; aşağıdaki env’leri ekleyin (değerleri kendi API anahtarlarınızla doldurun). Production ve Preview için işaretleyin.
5. **Deploy** tıklayın; ilk build biterken “Visit” ile test edin.
6. **Domain:** Settings → Domains → kendi domain’inizi ekleyin ve 3. bölümdeki DNS adımlarını uygulayın.

### 4.3 Alternatif Hosting

- **Netlify:** Next.js destekler; Netlify’a bağlayıp build komutu `next build`, publish dizini `.next` yerine Netlify’ın önerdiği Next.js ayarını kullanın.
- **Kendi sunucunuz:** `next build` + `next start` veya Docker ile çalıştırabilirsiniz; reverse proxy (Nginx) ve SSL (Let’s Encrypt) sizin kurulumunuzda olur.

---

## 5. Ortam Değişkenleri (Env)

### 5.1 Proje İçindeki Örnek: `.env.example`

Proje kökünde `.env.example` dosyası vardır. Canlıda kullanacağınız değişkenlerin listesi ve kısa açıklamaları orada yer alır. **Asla** gerçek anahtarları bu dosyaya yazmayın; sadece örnek/skeleton’dır.

### 5.2 Kullanım Yerleri

| Değişken | Nerede kullanılır | Gizli? |
|----------|-------------------|--------|
| `NEXT_PUBLIC_APP_URL` | Sitemap, e-posta linkleri, OAuth callback | Hayır |
| `NEXT_PUBLIC_SUPABASE_*` | Client tarafı Supabase (auth, public data) | Anon key client’ta görünür |
| `SUPABASE_SERVICE_ROLE_KEY` | Sadece API route / sunucu | **Evet** |
| `OPENAI_API_KEY` | Sadece API route (analiz) | **Evet** |
| `IYZICO_*` | Sadece API route (ödeme) | **Evet** |
| `NEXTAUTH_SECRET` | NextAuth session şifreleme | **Evet** |

- **NEXT_PUBLIC_*** ile başlayanlar tarayıcıya gider; buna sadece public bilgileri koyun.
- API key, secret, service role **kesinlikle** sunucu tarafında kalmalı (NEXT_PUBLIC_ olmadan).

### 5.3 Vercel’de Girme

- Proje → **Settings** → **Environment Variables**.
- Her satırda Name + Value; Environment: Production (ve isteğe bağlı Preview).
- Kaydettikten sonra bir sonraki deploy’da devreye girer.

---

## 6. Kimlik Doğrulama (Auth) API

Şu an uygulama mock auth kullanıyor. Canlıda **Supabase Auth** veya **NextAuth.js** ile değiştirilecek.

### 6.1 Supabase Auth

1. [supabase.com](https://supabase.com) → proje oluşturun.
2. **Authentication** → Providers: Email/Password (ve isteğe bağlı Google) açın.
3. **Settings** → API: `Project URL` ve `anon public` key’i alın → `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Sunucu tarafı işlemler için **service_role** key’i → `SUPABASE_SERVICE_ROLE_KEY` (sadece API route’larda).
5. `AuthContext` içinde `login`/`register`/`logout` çağrılarını Supabase client (`supabase.auth.signInWithPassword`, `signUp`, `signOut`) ile değiştirin.
6. Korumalı sayfalar için `src/middleware.ts` içinde Supabase SSR ile session kontrolü ekleyin; yoksa `/login`’e yönlendirin.

### 6.2 NextAuth.js

1. `npm install next-auth`; projede **API Route** (örn. `/api/auth/[...nextauth].ts`) tanımlayın.
2. Credentials provider (e-posta/şifre) veya Google/GitHub provider ekleyin.
3. Session stratejisi: JWT veya database adapter (PostgreSQL).
4. `NEXTAUTH_URL` = canlı site URL’iniz; `NEXTAUTH_SECRET` = güçlü rastgele string.
5. `AuthContext`, `getSession()` / `signIn()` / `signOut()` kullanacak şekilde güncellenir.
6. Middleware’de `getToken()` ile kontrol; yetkisizse `/login`’e yönlendirme.

---

## 7. Yapay Zeka ve Analiz API

### 7.1 Mevcut Durum

Analiz şu an `src/lib/analysisEngine.ts` içinde **mock** (sabit/rastgele sonuçlar). Canlıda gerçek fiyat/strateji üretmek için bir **Analiz API** gerekir.

### 7.2 Seçenekler

| Yöntem | Açıklama |
|--------|----------|
| **OpenAI API** | Next.js API Route’da `OPENAI_API_KEY` ile GPT’ye mülk özelliklerini gönderip fiyat aralığı + strateji metni alın. Hızlı prototip için uygun. |
| **Replicate** | Hazır modelleri API ile çağırın; özel model yoksa OpenAI daha pratik. |
| **Kendi model (Python/FastAPI)** | Scikit-learn/XGBoost ile fiyat modeli; FastAPI endpoint; Next.js’ten `ANALYSIS_API_URL` ile çağrı. |

### 7.3 Önerilen Akış (OpenAI ile)

1. **API Route:** `src/app/api/analysis/route.ts` (veya `/api/analysis/...`) oluşturun.
2. Body: mülk bilgileri (il, ilçe, m², oda, vb.).
3. Sunucu tarafında `OPENAI_API_KEY` ile OpenAI’ye istek atın; prompt’ta “Bu mülk için fiyat aralığı ve strateji öner” gibi bir metin + JSON formatı isteyin.
4. Sonucu JSON olarak döndürün; frontend mevcut analiz sonuç ekranında kullanır.
5. Kredi düşümü ve rapor kaydı bu API’nin içinde veya ayrı bir serviste yapılır (veritabanına yazın).

### 7.4 Güvenlik

- **API key yalnızca sunucuda:** `process.env.OPENAI_API_KEY`; client’a hiç gönderilmez.
- Rate limit ve kullanıcı bazlı kredi kontrolü API route’da yapılmalı.

---

## 8. Ödeme API (iyzico / PayTR)

### 8.1 Türkiye İçin

- **iyzico:** API + Node.js SDK; 3D Secure, taksit.
- **PayTR:** Sanal pos, 3D; API ile entegrasyon.

### 8.2 Akış (Özet)

1. Kullanıcı plan seçer (Pro/Elite) → ödeme sayfası/modal.
2. Kart bilgisi **asla** uygulama sunucunuzda saklanmaz; iyzico/PayTR’nin iframe veya tokenization yöntemi kullanılır.
3. **API Route:** `POST /api/payment/checkout` (veya `/api/subscription/upgrade`): plan + kullanıcı + sağlayıcı token’ı alır; sağlayıcı API’sini çağırır.
4. Başarılı yanıt → veritabanında abonelik/kredi güncellenir.
5. Mümkünse **webhook** ile “ödeme onaylandı” event’ini alıp plan güncellemesi (idempotent) yapın.

### 8.3 Env

- iyzico: `IYZICO_API_KEY`, `IYZICO_SECRET_KEY`, `IYZICO_BASE_URL`.
- PayTR: Sağlayıcı dokümantasyonundaki merchant id, key, salt → env’e ekleyin.

---

## 9. Veritabanı ve Backend

### 9.1 Şema (Özet)

`CANLIYA_ALMA_RAPORU.md` içinde detaylı şema var. Özet tablolar:

- **users:** id, email, name, plan_type, monthly_credits, used_credits, period_end, created_at, updated_at.
- **analyses:** property_id, user_id, results (JSON), credits_used, created_at.
- **reports:** user_id, analysis_id, report_type, file_url, created_at.
- **districts:** bölge bazlı ortalama m² fiyatı, talep skoru.
- **payments:** user_id, amount, plan_type, provider, provider_transaction_id, status.

### 9.2 Supabase Kullanırsanız

- Supabase = PostgreSQL + Auth + Realtime + Storage.
- SQL Editor’de şemayı oluşturun; client tarafında `@supabase/supabase-js`, sunucuda `SUPABASE_SERVICE_ROLE_KEY` ile hassas işlemler.
- Rapor PDF’leri Supabase Storage’a yüklenebilir; `reports.file_url` bu URL’i tutar.

### 9.3 API Route’lar

- `POST /api/analysis` → analiz çalıştır, kredi düş, sonucu döndür.
- `GET/POST /api/reports` → rapor listesi / kaydet (ve gerekiyorsa Storage’a yükleme).
- Auth için Supabase/NextAuth zaten kendi endpoint’lerini kullanır.

---

## 10. MCP ve Geliştirme Araçları

**MCP (Model Context Protocol)** genelde **geliştirme ortamında** (Cursor, VS Code eklentileri) kullanılır; kod üretimi, arama, dokümantasyon gibi işler için. Canlı sunucuda çalışan uygulamanın “MCP sunucusu” olması gerekmez.

- **Canlıda önemli olan:** Gerçek **REST/GraphQL API’leriniz** (auth, analiz, ödeme, rapor). Bunlar yukarıdaki bölümlerde anlatıldı.
- Cursor/IDE tarafında MCP kullanıyorsanız, bu sadece sizin makinenizde veya takım araçlarınızda kalır; production ortamına MCP kurulumu zorunlu değildir.

---

## 11. Güvenlik ve Canlı Checklist

### 11.1 Güvenlik

- Tüm API key ve secret’lar **sadece sunucu env**’de; `NEXT_PUBLIC_` ile paylaşmayın.
- Ödeme: PCI uyumlu yöntem (tokenization/iframe); kart verisi sizin sunucunuzda tutulmamalı.
- Auth: HTTPS zorunlu; session süresi ve cookie ayarları (secure, sameSite) kontrol edin.
- Rate limiting: Login ve analiz API’lerinde istek sınırı koyun.

### 11.2 Canlıya Alma Öncesi Kontrol Listesi

- [ ] `.env.example` projede var; canlıda tüm gerekli env’ler hosting’e girildi.
- [ ] Domain satın alındı; DNS (A/CNAME veya nameserver) hosting’e yönlendirildi.
- [ ] Hosting’de (Vercel vb.) proje deploy edildi; production URL açılıyor.
- [ ] Auth gerçek servise (Supabase/NextAuth) bağlandı; middleware veya layout ile korumalı sayfalar korunuyor.
- [ ] Analiz API route’u eklendi; OpenAI (veya seçilen servis) sadece sunucu tarafında çağrılıyor.
- [ ] Ödeme sağlayıcı (iyzico/PayTR) test modunda denendi; canlı anahtarlar ayrı tutuldu.
- [ ] Veritabanı şeması canlıda oluşturuldu; kullanıcı/abonelik/rapor kayıtları yazılıyor.
- [ ] Hata takibi (Sentry vb.) isteğe bağlı kuruldu.

Bu rehber, domain ve hosting’den API ve yapay zeka entegrasyonuna kadar canlıya alma sürecini kapsar. Önceki teknik plan için `CANLIYA_ALMA_RAPORU.md` dosyasına bakabilirsiniz.

---

*Son güncelleme: Mart 2025 — EstaMind Canlı Deployment Rehberi*
