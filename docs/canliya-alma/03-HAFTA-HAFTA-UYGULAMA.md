# Hafta Hafta Uygulama Planı (Hızlı başla + büyü)

Bu plan, tek başına veya küçük bir ekip için **gerçekçi** bir sıradır. Süreler yaklaşıktır; hızına göre haftaları birleştirebilirsin.

---

## Faz 0 — Yarım gün: Hazırlık

- [ ] GitHub’a kod yüklü mü?
- [ ] `npm run build` bilgisayarında hatasız mı?
- [ ] `.env.example` okundu mu? (Ne lazım biliyor musun?)

---

## Hafta 1 — İnternette görünür ol

**Hedef:** `https://...` ile site açılsın.

| Gün | Yapılacak |
|-----|-----------|
| 1 | Vercel hesabı, repo import, ilk deploy |
| 2 | Preview URL’yi test et (tüm önemli sayfalar) |
| 3 | Domain al (isteğe bağlı) + Vercel’e bağla + DNS bekle |
| 4 | Production env’e en azından `NEXT_PUBLIC_APP_URL` koy |

**Bu hafta sonunda:** Pazarlama yapılabilir, demo gösterilebilir.

---

## Hafta 2 — Kimlik ve kapı kilitleri

**Hedef:** Sahte giriş bitsin; gerçek kullanıcı hesabı.

| Yapılacak | Not |
|-----------|-----|
| Supabase projesi aç | Auth + DB aynı yerde |
| Tabloların taslağı | `04-TEKNIK-OZET-TABLOLAR.md` |
| `AuthContext` → Supabase | Kayıt / giriş / çıkış |
| Middleware | Session yoksa login |

**Bu hafta sonunda:** Kullanıcı verisi ciddileşebilir; yedekleme düşün.

---

## Hafta 3 — Analizi gerçekleştir

**Hedef:** Analiz sonucu sunucuda üretilsin; API key gizli kalsın.

| Yapılacak | Not |
|-----------|-----|
| `POST /api/analysis` (veya benzeri) | Body: form verisi |
| OpenAI veya seçtiğin servis | İlk sürüm: tek prompt + JSON |
| Frontend’i API’ye bağla | Mock motoru yedekte tutulabilir (feature flag) |
| Kredi düşümü | Basit: DB’de sayaç |

**Bu hafta sonunda:** “Gerçek AI” iddiası teknik olarak doğru olur.

---

## Hafta 4 — Para ve abonelik

**Hedef:** Pro/Elite için gerçek ödeme (önce test modu).

| Yapılacak | Not |
|-----------|-----|
| iyzico veya PayTR test hesabı | Sandbox ile dene |
| `POST /api/payment/...` | Token ile ödeme |
| Webhook (mümkünse) | Ödeme onayı → plan güncelle |
| UI’de başarı/hata | Mevcut modal akışına bağla |

**Bu hafta sonunda:** Gelir modeli teknik olarak çalışır.

---

## Hafta 5+ — Büyüme ve sağlamlık

Sırayla ekle (öncelik sana göre değişebilir):

1. **Raporları sunucuda sakla** (Supabase Storage veya S3)
2. **Bölge verisi** (`districts` tablosu, manuel veya içe aktarma)
3. **E-posta** (şifre sıfırlama, makbuz) — Resend / SMTP
4. **Abonelik yenileme** (cron veya sağlayıcı webhook)
5. **Sentry** veya benzeri izleme
6. **Rate limit** (login ve analiz API)

---

## Hızlı yol vs güvenli yol

| İstek | Ne yaparsın? |
|--------|----------------|
| “Yarın tanıtım var” | Faz 0 + Hafta 1 yeter |
| “Beta kullanıcı toplayacağım” | Hafta 1 + 2 şart |
| “Para alacağım” | En az Hafta 1–2–4 (3 analiz olmadan da olur ama zayıf ürün) |
| “Ölçeklenecek startup” | Tüm haftalar + 5+ maddeler |

---

*Kontrol listeleri: `05-KONTROL-LISTELERI.md`*
