# Kontrol Listeleri (İşaretle Git)

## A — Sadece site internette olsun

- [ ] GitHub’da güncel kod var
- [ ] Vercel’de proje oluşturuldu
- [ ] `next build` başarılı
- [ ] Canlı URL açılıyor (ana sayfa, login, register)
- [ ] (İsteğe bağlı) Özel domain bağlandı
- [ ] (İsteğe bağlı) `NEXT_PUBLIC_APP_URL` production’da doğru

---

## B — Güvenli kullanıcı sistemi

- [ ] Supabase veya NextAuth kuruldu
- [ ] Kayıt + giriş + çıkış çalışıyor
- [ ] Şifre sıfırlama planlandı veya açıldı
- [ ] Middleware ile korumalı sayfalar login istiyor
- [ ] `service_role` / secret key’ler sadece sunucuda

---

## C — Analiz ve AI

- [ ] Analiz isteği API route’a gidiyor
- [ ] `OPENAI_API_KEY` (veya alternatif) sadece sunucuda
- [ ] Hata durumunda kullanıcıya anlamlı mesaj
- [ ] (İsteğe bağlı) Rate limit

---

## D — Ödeme

- [ ] Test ortamında başarılı ödeme
- [ ] Canlı anahtarlar ayrı; test ile karışmıyor
- [ ] Webhook veya güvenilir onay akışı
- [ ] Başarılı ödeme sonrası plan DB’de güncelleniyor
- [ ] Kart verisi loglanmıyor / düz metin gitmiyor

---

## E — Veri ve raporlar

- [ ] Kullanıcı ve analiz kayıtları DB’de
- [ ] (İsteğe bağlı) PDF’ler Storage’da
- [ ] Yedekleme / export stratejisi düşünüldü

---

## F — Büyüme ve operasyon

- [ ] Analytics (ör. Vercel Analytics veya Plausible)
- [ ] Hata izleme (ör. Sentry)
- [ ] Gizlilik / KVKK metinleri (gerekirse avukat)
- [ ] Destek e-postası veya form

---

## G — Güvenlik genel

- [ ] Tüm admin/secret env’ler production’da dolu ve doğru
- [ ] HTTPS zorunlu (Vercel genelde otomatik)
- [ ] Bağımlılık güncellemeleri planı (ayda bir `npm audit`)

---

*Tamamlandığında bu listeyi tarihle kaydet; bir sonraki sürümde tekrar gözden geçir.*
