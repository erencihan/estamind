# Analiz: Tüm Canlıya Alma Raporları Bir Arada

## 1. Projede toplanan kaynaklar

| Kaynak | Konu | Kim için? |
|--------|------|-----------|
| `CANLIYA_ALMA_RAPORU.md` | Mock → gerçek sistem: Auth, AI, ödeme, DB şeması, öncelik tablosu | Geliştirici / teknik karar |
| `CANLI_DEPLOYMENT_REHBERI.md` | Domain, DNS, Vercel, env, güvenlik, MCP notu, checklist | Deploy + operasyon |
| `.env.example` | Hangi ortam değişkenleri lazım | Kurulum sırasında |
| Kod (layout, `reportsStorage`, `middleware` iskeleti) | Canlıya hazırlık için kod düzeni | Bakım kolaylığı |

`TODO.md` içinde bazı eski notlar var; canlıya alma ile doğrudan ilgili değil, o yüzden bu pakette ayrı dosya yapılmadı.

---

## 2. Kısa teşhis: Şu an ne durumda?

| Parça | Durum |
|--------|--------|
| Arayüz (Next.js) | İyi |
| Giriş / kayıt | Şimdilik sahte (tarayıcı hafızası) |
| Analiz | Şimdilik örnek sonuç |
| Ödeme | Arayüz var, gerçek para yok |
| Rapor PDF | Çalışıyor (tarayıcıda) |
| İnternette görünür site | Henüz sen kurmadıysan yok |

**Yani:** Ev hazır ama “adres” (domain) ve “elektrik + su” (hosting + gerçek servisler) eksik.

---

## 3. İki hedefi aynı anda düşünmek: Hızlı + Büyüme

### A) Hızlı canlı (minimum canlı)

Amaç: İnsanlar siteyi görsün, marka çalışsın, demo devam etsin.

- Vercel + GitHub → deploy
- İstersen özel domain
- Gerçek auth/ödeme **olmadan** bile “canlı” sayılır (MVP vitrin)

**Risk:** Kullanıcı verisi ciddi büyürse sonra taşımak gerekir; o yüzden env ve şema erken düşünülür.

### B) Büyüme potansiyeli (para + güven)

Amaç: Gerçek kullanıcı, abonelik, güvenli veri.

Sıra (özet):

1. **Veri evi:** Supabase (veya benzeri) → kullanıcı + analiz + ödeme kaydı tek yerde
2. **Kimlik:** Supabase Auth veya NextAuth → sahte giriş biter
3. **Analiz:** Sunucuda API + (OpenAI veya kendi model) → anahtarlar gizli kalır
4. **Ödeme:** iyzico / PayTR → Türkiye kartı + 3D
5. **Koruma:** Middleware ile `/dashboard` ve `/analysis` gerçekten girişe bağlanır

Bu sıra, `CANLIYA_ALMA_RAPORU.md` içindeki öncelik tablosu ile uyumludur.

---

## 4. Neden Supabase sık öneriliyor? (Kısa)

- Tek yerde: veritabanı + giriş sistemi + dosya depolama (PDF için)
- Next.js ile çok örnek var
- İleride kullanıcı sayısı artsa bile ölçeklenebilir

Alternatif: Neon/Vercel Postgres + NextAuth — daha parçalı ama mümkün.

---

## 5. Bu paketin felsefesi

- **02-COCUK-DILI:** “Ne yapıyorum?” sorusuna cevap
- **03-HAFTA-HAFTA:** “Hangi sırayla?” sorusuna cevap
- **04 + 05:** “Unuttuğum bir şey var mı?” sorusuna cevap
- **Kök raporlar:** “Nasıl teknik detay?” sorusuna cevap

---

*Sonraki dosya: `02-COCUK-DILI-ADIM-ADIM.md`*
