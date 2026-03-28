/**
 * Analiz formu için statik veri – ayrı chunk’ta yüklenir.
 */
import type { PropertyType } from '@/types/database'

export const propertyTypes: { value: PropertyType; label: string; icon: string }[] = [
  { value: 'apartment', label: 'Daire', icon: '🏢' },
  { value: 'residence', label: 'Rezidans', icon: '🏨' },
  { value: 'villa', label: 'Villa', icon: '🏡' },
  { value: 'house', label: 'Müstakil Ev', icon: '🏠' },
  { value: 'farmhouse', label: 'Çiftlik Evi', icon: '🌾' },
  { value: 'mansion', label: 'Köşk & Konak', icon: '🏰' },
  { value: 'yalı', label: 'Yalı', icon: '🌊' },
  { value: 'yali_dairesi', label: 'Yalı Dairesi', icon: '🏛️' },
  { value: 'summerhouse', label: 'Yazlık', icon: '☀️' },
  { value: 'duplex', label: 'Dublex', icon: '🏘️' },
  { value: 'studio', label: 'Stüdyo', icon: '🏠' },
  { value: 'land', label: 'Arsa', icon: '🗺️' },
]

export const cities = ['İstanbul']

export const districts: Record<string, string[]> = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Sarıyer', 'Bakırköy', 'Florya', 'Bağdat Caddesi', 'Taksim'],
  'Ankara': ['Çankaya', 'Kızılay', 'Bilkent', 'Etimesgut', 'Yenimahalle'],
  'İzmir': ['Bornova', 'Karşıyaka', 'Alsancak', 'Buca', 'Çiğli'],
  'Antalya': ['Konyaaltı', 'Muratpaşa', 'Lara'],
  'Bursa': ['Nilüfer', 'Osmangazi'],
  'Kocaeli': ['İzmit'],
  'Muğla': ['Bodrum', 'Marmaris'],
  'Adana': ['Seyhan'],
}

export const neighborhoods: Record<string, Record<string, string[]>> = {
  'İstanbul': {
    'Kadıköy': ['Ayrılıkçeşme','Çemenzar','Haydarpaşa','Kuyubaşı','Söğütlüçeşme','Göztepe', 'Moda', 'Fenerbahçe', 'Kadıköy Merkez', 'Acıbadem'],
    'Beşiktaş': ['Beşiktaş Merkez', 'Etiler', 'Levent', 'Ulus', 'Yıldız', 'Ortaköy', 'Arnavutköy', 'Kuruçeşme', 'Bebek', 'Nişantaşı'],
    'Üsküdar': ['Üsküdar Merkez', 'Kandilli', 'Çengelköy', 'Bulgurlu', 'Ayazma', 'Salacak', 'İçerenköy', 'Mimar Sinan', 'Ferah', 'Bahçelievler'],
    'Sarıyer': ['Sarıyer Merkez', 'Rumeli Hisarı', 'Baltalimanı', 'İstinye', 'Yeniköy', 'Tarabya', 'Kilyos', 'Demirciköy', 'Uskumruköy', 'Zekeriyaköy'],
    'Bakırköy': ['Bakırköy Merkez', 'Yeşilyurt', 'Şenlikköy', 'Ataköy', 'Cevizlik', 'Kartaltepe', 'Osmaniye', 'Sakızhan', 'Yenimahalle', 'Zuhuratbaba'],
    'Florya': ['Florya Merkez', 'Şenlikköy', 'Yeşilköy', 'Halkalı', 'Küçükçekmece', 'Kanarya', 'Güneşli', 'Bağcılar', 'Mahmutbey', 'Yenibosna'],
    'Bağdat Caddesi': ['Bağdat Caddesi', 'Caddebostan', 'Göztepe', 'Erenköy', 'Fenerbahçe', 'Kozyatağı', 'Sahrayıcedit', 'Yenidoğan', 'Suadiye', 'Bostancı'],
    'Taksim': ['Taksim', 'Beyoğlu', 'Galata', 'Cihangir', 'Beyazıt', 'Şişhane', 'Karaköy', 'Kasımpaşa', 'Dolapdere', 'Pera'],
  },
  'Ankara': {
    'Çankaya': ['Çankaya Merkez', 'Kızılay', 'Sıhhiye', 'Anıttepe', 'Mebusevleri', 'Balgat', 'Emek', 'Çayyolu', 'Ümitköy', 'Bilkent', 'Gazi Osman Paşa', 'Yukarı Bahçelievler'],
    'Kızılay': ['Kızılay', 'Sıhhiye', 'Ulus', 'Altındağ', 'İstanbul Yolu', 'Kurtuluş', 'Demirtepe', 'Yüzüncüyıl', 'Birlik', 'Cebeci'],
    'Bilkent': ['Bilkent', 'Üniversiteler', 'Çayyolu', 'Doğuş', 'Gazi Osman Paşa', 'Karacaören', 'Konutkent', 'Bahçelievler', 'Mutlu', 'Karakavuk'],
    'Etimesgut': ['Etimesgut Merkez', 'Piyade', 'Köprü', 'Gülvera', 'Ahi Mesud', 'Yaprak', 'İstiklal', 'Gökçek', 'Süvari', 'Şeker'],
    'Yenimahalle': ['Yenimahalle Merkez', 'Batıkent', 'Demetevler', 'Susuz', 'Karapürçek', 'Anadolu', 'Çiçek', 'Varlık', 'Yeni Batı', 'İncir'],
  },
  'İzmir': {
    'Bornova': ['Bornova Merkez', 'Buca', 'Çiğli', 'Karşıyaka', 'Alsancak', 'Göztep', 'Kahramanlar', 'Yeşilyurt', 'Gümüşpınar', 'İnönü'],
    'Karşıyaka': ['Karşıyaka Merkez', 'Bostanlı', 'Çocuk Parkı', 'Gümüşpınar', 'Yalı', 'Sahilevleri', 'İzban', 'Demirköprü', 'Mavişehir', 'Karantina'],
    'Alsancak': ['Alsancak Merkez', 'Kordon', 'Alsancak Liman', 'Sığacık', 'Gümrük', 'Mecidiyeköy', 'Kahramanlar', 'Bostanlı', 'Filiz', 'Sahil'],
    'Buca': ['Buca Merkez', 'Şirinkapı', 'Kaynaklar', 'Yeşilbağlar', 'Menderes', 'Doğuş', 'Kuruçeşme', 'Güzelyalı', 'İnönü', 'Yenişehir'],
    'Çiğli': ['Çiğli Merkez', 'Karşıyaka', 'Balatçık', 'Ataşehir', 'Yeni Mahalle', 'Köprü', 'Sahil', 'Gümüşpınar', 'Egekent', 'Evka 3'],
  },
}

export const buildingTypes = ['Betonarme', 'Kagir', 'Ahşap', 'Çelik', 'Karma']
export const heatingTypes = ['Doğalgaz (Kombi)', 'Doğalgaz (Merkezi)', 'Kalorifer', 'Klima', 'Elektrikli', 'Soba', 'Yok']
export const facades = ['Kuzey', 'Güney', 'Doğu', 'Batı', 'Kuzeydoğu', 'Kuzeybatı', 'Güneydoğu', 'Güneybatı']

export interface DistrictDataItem {
  avgPricePerSqm: number
  totalListings: number
  avgDaysOnMarket: number
  demandScore: number
  trend: string
}

const districtDataMap: Record<string, Record<string, DistrictDataItem>> = {
  'İstanbul': {
    'Kadıköy': { avgPricePerSqm: 52000, totalListings: 1250, avgDaysOnMarket: 45, demandScore: 92, trend: 'up' },
    'Beşiktaş': { avgPricePerSqm: 65000, totalListings: 890, avgDaysOnMarket: 38, demandScore: 88, trend: 'up' },
    'Üsküdar': { avgPricePerSqm: 48000, totalListings: 720, avgDaysOnMarket: 52, demandScore: 85, trend: 'stable' },
    'Sarıyer': { avgPricePerSqm: 58000, totalListings: 450, avgDaysOnMarket: 60, demandScore: 78, trend: 'up' },
    'Bakırköy': { avgPricePerSqm: 55000, totalListings: 680, avgDaysOnMarket: 42, demandScore: 86, trend: 'stable' },
    'Florya': { avgPricePerSqm: 42000, totalListings: 320, avgDaysOnMarket: 55, demandScore: 72, trend: 'up' },
    'Bağdat Caddesi': { avgPricePerSqm: 72000, totalListings: 520, avgDaysOnMarket: 35, demandScore: 95, trend: 'up' },
    'Taksim': { avgPricePerSqm: 68000, totalListings: 280, avgDaysOnMarket: 40, demandScore: 82, trend: 'stable' },
  },
  'Ankara': {
    'Çankaya': { avgPricePerSqm: 35000, totalListings: 980, avgDaysOnMarket: 48, demandScore: 90, trend: 'up' },
    'Kızılay': { avgPricePerSqm: 32000, totalListings: 750, avgDaysOnMarket: 42, demandScore: 88, trend: 'stable' },
    'Bilkent': { avgPricePerSqm: 38000, totalListings: 420, avgDaysOnMarket: 55, demandScore: 75, trend: 'up' },
    'Etimesgut': { avgPricePerSqm: 28000, totalListings: 560, avgDaysOnMarket: 60, demandScore: 70, trend: 'stable' },
    'Yenimahalle': { avgPricePerSqm: 26000, totalListings: 480, avgDaysOnMarket: 65, demandScore: 65, trend: 'stable' },
  },
  'İzmir': {
    'Bornova': { avgPricePerSqm: 32000, totalListings: 680, avgDaysOnMarket: 50, demandScore: 82, trend: 'up' },
    'Karşıyaka': { avgPricePerSqm: 35000, totalListings: 520, avgDaysOnMarket: 45, demandScore: 86, trend: 'up' },
    'Alsancak': { avgPricePerSqm: 42000, totalListings: 380, avgDaysOnMarket: 38, demandScore: 90, trend: 'stable' },
    'Buca': { avgPricePerSqm: 28000, totalListings: 440, avgDaysOnMarket: 55, demandScore: 72, trend: 'up' },
    'Çiğli': { avgPricePerSqm: 26000, totalListings: 320, avgDaysOnMarket: 60, demandScore: 68, trend: 'stable' },
  },
  'Antalya': {
    'Konyaaltı': { avgPricePerSqm: 38000, totalListings: 420, avgDaysOnMarket: 52, demandScore: 80, trend: 'up' },
    'Muratpaşa': { avgPricePerSqm: 35000, totalListings: 520, avgDaysOnMarket: 48, demandScore: 84, trend: 'stable' },
    'Lara': { avgPricePerSqm: 32000, totalListings: 380, avgDaysOnMarket: 55, demandScore: 76, trend: 'up' },
  },
  'Bursa': {
    'Nilüfer': { avgPricePerSqm: 25000, totalListings: 580, avgDaysOnMarket: 50, demandScore: 78, trend: 'up' },
    'Osmangazi': { avgPricePerSqm: 22000, totalListings: 650, avgDaysOnMarket: 55, demandScore: 72, trend: 'stable' },
  },
  'Kocaeli': {
    'İzmit': { avgPricePerSqm: 24000, totalListings: 420, avgDaysOnMarket: 58, demandScore: 70, trend: 'stable' },
  },
  'Muğla': {
    'Bodrum': { avgPricePerSqm: 85000, totalListings: 180, avgDaysOnMarket: 90, demandScore: 88, trend: 'up' },
    'Marmaris': { avgPricePerSqm: 55000, totalListings: 220, avgDaysOnMarket: 75, demandScore: 82, trend: 'stable' },
  },
  'Adana': {
    'Seyhan': { avgPricePerSqm: 18000, totalListings: 380, avgDaysOnMarket: 60, demandScore: 65, trend: 'stable' },
  },
}

const defaultDistrictData: DistrictDataItem = {
  avgPricePerSqm: 40000,
  totalListings: 500,
  avgDaysOnMarket: 50,
  demandScore: 70,
  trend: 'stable',
}

export function getDistrictData(city: string, district: string): DistrictDataItem {
  return districtDataMap[city]?.[district] ?? defaultDistrictData
}
