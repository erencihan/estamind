# Kod Yapısı ve Bakım (Spagetti Kontrolü)

## Kısa cevap: Tam “spagetti” mi?

**Hayır — tam spagetti değil**, ama **birkaç riskli nokta** var. Yayında hata çıktığında düzeltmek mümkün; aşağıdaki harita ve öneriler bunu kolaylaştırır.

---

## İyi taraflar (düzenli olanlar)

| Alan | Durum |
|------|--------|
| **Next.js App Router** | Sayfalar `src/app/` altında mantıklı ayrılmış |
| **Auth** | `AuthContext` tek merkez; giriş/çıkış bir yerde |
| **Sabitler** | `src/config/constants.ts` — uygulama adı, storage anahtarları |
| **Rapor depolama** | `src/lib/reportsStorage.ts` — localStorage tek soyutlama katmanı |
| **Analiz form verisi** | `src/data/analysisFormData.ts` — büyük listeler sayfadan ayrılmış |
| **Ortak panel** | `AuthenticatedLayout` — dashboard/analysis tekrarı azaltılmış |
| **Tipler** | `src/types/database.ts` — veri şekilleri toplanmış |

Bu yapı, production’da “nereden bakarım?” sorusuna cevap verir.

---

## Dikkat edilmesi gerekenler (spagetti eğilimi)

| Risk | Nerede | Üretimde ne olur? | Durum / not |
|------|--------|-------------------|----------------|
| **Çok uzun sayfa** | `analysis/new` | Bug bulmak zor | **Tamam:** `NewAnalysisForm`, `AnalysisResultsView`, `useAnalysisForm` |
| **Çok uzun util** | `reportGenerator.ts` | PDF/HTML değişince risk | **Tamam:** HTML `reportTemplates.ts` içinde; generator ince sarıcı |
| **Büyük ayarlar sayfası** | `dashboard/settings/page.tsx` | Okunması zor | **Tamam:** `src/components/settings/` (sekmeler + modallar + `settingsNav`) |
| **Büyük ana panel** | `dashboard/page.tsx` | Aynı | **Tamam:** `src/components/dashboard/` (veri, kartlar, Lite kilit katmanları) |
| **Mock backend** | Auth + analiz | Veri / güvenlik sınırı | `POST /api/analysis` var; anahtar sunucuda (`OPENAI_API_KEY` hazır); DB canlıda |
| **Middleware** | `src/middleware.ts` | Korumasız rota | **Tamam:** `SESSION_COOKIE_NAME` ile `/dashboard`, `/analysis` korumalı |

Bunlar “kod birbirine girmiş” değil; çoğunlukla **dosya boyutu ve sorumluluk karışması**. Refaktör adım adım yapılabilir.

---

## Hata çıktığında hızlı yol haritası

1. **Arayüz / sayfa** → İlgili `src/app/.../page.tsx`
2. **Giriş / kullanıcı** → `src/context/AuthContext.tsx`
3. **Analiz sonucu** → `src/lib/analysisEngine.ts` (şimdilik mock)
4. **Rapor listesi / PDF** → `src/lib/reportsStorage.ts`, `src/utils/reportGenerator.ts`
5. **Genel sabitler** → `src/config/constants.ts`

---

## Önerilen sıradaki refaktörler (öncelik)

1. ~~`analysis/new` → bileşenler + `useAnalysisForm`~~ (yapıldı)  
2. ~~`reportGenerator` + `reportTemplates`~~ (yapıldı)  
3. ~~`POST /api/analysis` + sunucu tarafı oturum kontrolü~~ (yapıldı; LLM entegrasyonu `analysisEngine` içinde ileride)  
4. ~~Middleware + session çerezi~~ (yapıldı)  
5. ~~`dashboard/page.tsx` → `components/dashboard/`~~ (yapıldı)  
6. Üretim: gerçek DB + OAuth/şifre hash (canlıya alma planına göre)  

---

*Bu dosya, proje yayınlandığında bakım ve olay müdahalesi için referanstır.*
