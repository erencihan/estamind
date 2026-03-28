# Bir Çocuğa Anlatır Gibi: Siten Nasıl İnternete Çıkar?

Düşün ki yaptığın uygulama **bir LEGO evi**. Şu an ev **senin masanda** (bilgisayarında) duruyor. İnternete çıkarmak = bu evi **herkesin görebileceği bir vitrine** koymak.

Aşağıdaki adımları **yukarıdan aşağıya** oku. Bir adım bitmeden bir sonrakine zorlamak zorunda değilsin; ama sıra genelde böyle işe yarar.

---

## Bölüm A — Ev önce vitrine gelsin (en basit hali)

### Adım 1: Kodunu bir kutuya koy (GitHub)

**Ne demek?** Bilgisayarındaki proje dosyalarını internette bir yerde saklamak. Böylece “hosting” dediğimiz makine o dosyaları çekip siteyi çalıştırabiliyor.

**Sen ne yaparsın?**

1. [github.com](https://github.com) hesabı aç (yoksa).
2. Yeni bir “repository” oluştur (boş kutu gibi düşün).
3. Bilgisayarında proje klasöründe Git ile bu kutuya yükle (push).

**Basit cümle:** “LEGO kutumu internetteki bir sandığa koydum.”

---

### Adım 2: Bir “güç kaynağı” kirala (Vercel gibi hosting)

**Ne demek?** Siteyi 7/24 açık tutan bilgisayar. Seninki uyuyunca site kapanmasın diye.

**Sen ne yaparsın?**

1. [vercel.com](https://vercel.com) hesabı aç.
2. “Import Project” de, GitHub’daki repoyu seç.
3. Deploy’a bas; birkaç dakika sonra sana `something.vercel.app` gibi bir adres verir.

**Basit cümle:** “Evimi vitrine koydum; dünya artık bu adresten görebiliyor.”

---

### Adım 3: (İsteğe bağlı ama güzel) Kendi ismini tak (domain)

**Ne demek?** `something.vercel.app` yerine `benimmarkam.com` gibi hatırlanır bir isim.

**Sen ne yaparsın?**

1. Bir domain satıcısından isim al (.com veya .com.tr).
2. Vercel’de “Domains” kısmına bu ismi ekle.
3. Domain satıcısında Vercel’in söylediği DNS ayarını yap (ya nameserver ya A/CNAME kaydı).

**Basit cümle:** “Vitrinin üstüne büyük tabela astım.”

**Not:** DNS bazen 1 saat, bazen 1 gün sürebilir; sabır.

---

### Adım 4: Gizli anahtarların için “etiketli çekmece” (.env)

**Ne demek?** Şifreleri kodun içine yazmak kötü fikir. Hosting panelinde “Environment Variables” diye bir yer var; oraya yazılır.

**Sen ne yaparsın?**

1. Projede `.env.example` dosyasına bak: hangi isimler kullanılacak gör.
2. Vercel’de aynı isimlerle değerleri gir (henüz yoksa boş bırakılabilir; sadece site açılıyorsa sorun yok).
3. Gerçek API anahtarlarını **asla** GitHub’a yükleme.

**Basit cümle:** “Anahtarları cam vitrine değil, kilitli çekmeceye koydum.”

---

**Bölüm A bittiğinde:** Siten internette. Henüz “gerçek banka” ve “gerçek kimlik kartı” yok ama **hızlıca canlı** olmuş olursun. Bu, büyümenin ilk basamağı.

---

## Bölüm B — Artık ciddi oyun: Kullanıcı ve güven

### Adım 5: “Kapıcı” koy (gerçek giriş — Auth)

**Ne demek?** Şu an uygulama sanki herkes “ben adminim” diyebiliyormuş gibi çalışıyor (tarayıcı hafızası). Gerçek hayatta her kullanıcının kendi hesabı olmalı.

**Sen ne yaparsın? (büyük resim)**

1. Supabase veya NextAuth seç.
2. Kullanıcı kayıt + giriş + çıkış akışını oraya bağla.
3. Kodda `AuthContext` gibi yerleri gerçek API’ye bağla; sahte localStorage’ı kaldır.

**Basit cümle:** “Artık eve anahtarı olan girer.”

---

### Adım 6: “Güvenlik görevlisi” (middleware)

**Ne demek?** Giriş yapmamış biri `/dashboard` yazınca içeri sızmasın.

**Sen ne yaparsın?**

1. Projede `src/middleware.ts` var; içine gerçek session kontrolü ekle.
2. Session yoksa `/login` sayfasına yönlendir.

**Basit cümle:** “Kapıda kimlik soran görevli.”

---

### Adım 7: “Beyin”i sunucuya taşı (Analiz API + AI)

**Ne demek?** Yapay zeka anahtarı ve hesaplama **telefonunda (tarayıcıda)** durmamalı; başkasının çalması kolay olur.

**Sen ne yaparsın?**

1. Next.js içinde `app/api/...` altında bir route aç.
2. Mülk bilgilerini oraya gönder.
3. Orada OpenAI (veya başka servis) çağır; cevabı öne gönder.

**Basit cümle:** “Sihirli soruları gizli odada soruyorum, cevabı sadece sonucu gösteriyorum.”

---

## Bölüm C — Para kazanma ve büyüme

### Adım 8: “Kasa” (ödeme: iyzico / PayTR)

**Ne demek?** Kullanıcı Pro/Elite aldığında gerçekten para çekmek.

**Sen ne yaparsın?**

1. iyzico veya PayTR’de üye ol; test anahtarlarıyla dene.
2. Ödemeyi **mutlaka** güvenli yöntemle (token / iframe / yönlendirme) yap.
3. Başarılı olunca veritabanında “bu kullanıcı Pro” yaz.

**Basit cümle:** “Para doğrudan cebime değil, güvenli POS’a gidiyor.”

---

### Adım 9: “Defter” (veritabanı)

**Ne demek?** Kim, ne analiz etti, ne ödedi — bunlar kaybolmamalı.

**Sen ne yaparsın?**

1. Tabloları oluştur (kullanıcı, analiz, ödeme, bölge verisi…).
2. Raporları ileride veritabanından oku; sadece tarayıcıda saklama.

**Basit cümle:** “Her şeyi not defterine yazıyorum, sayfa yenilenince uçmuyor.”

---

### Adım 10: “Doktor” (hata izleme — isteğe bağlı ama büyüyünce şart)

**Ne demek?** Canlıda bir şey patlayınca sen haberdar ol.

**Örnek:** Sentry gibi bir araç.

**Basit cümle:** “Evde yangın çıkınca alarm çalıyor.”

---

## En son: Kendine sor

- Site açılıyor mu? (A bölümü)
- Sahte giriş yerine gerçek hesap var mı? (B)
- Analiz ve ödeme sunucuda mı? (B–C)
- Veriler kayıtlı mı? (C)

Hepsi “evet” olunca, proje **hem hızlı başlamış** hem de **büyümeye uygun** olur.

---

*Sonraki: pratik takvim için `03-HAFTA-HAFTA-UYGULAMA.md`*
