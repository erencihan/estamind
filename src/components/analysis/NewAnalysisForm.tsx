'use client'

import Image from 'next/image'
import {
  Brain,
  Camera,
  Loader2,
  ArrowRight,
  Upload,
} from 'lucide-react'
import type { User, PropertyFormData } from '@/types/database'
import {
  propertyTypes,
  cities,
  districts,
  neighborhoods,
  buildingTypes,
  heatingTypes,
  facades,
} from '@/data/analysisFormData'
import type { AnalysisFormBag } from '@/hooks/useAnalysisForm'

export interface NewAnalysisFormProps {
  user: User
  form: AnalysisFormBag
}

export function NewAnalysisForm({ user, form }: NewAnalysisFormProps) {
  const {
    isAnalyzing,
    formData,
    setFormData,
    uploadedImages,
    isUploading,
    formatPriceDisplay,
    handlePriceChange,
    handleImageUpload,
    removeImage,
    handleChange,
    toggleFeature,
    handleAnalyze,
  } = form

  return (
    <main className="min-h-screen py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto w-full min-w-0">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-dm font-bold mb-2">
            Yeni <span className="gradient-text">Emlak Analizi</span>
          </h1>
          <p className="text-gray-400">
            Mülk detaylarını girin, AI size anında fiyat ve pazar analizi sunsun
          </p>
        </div>

        <div className="flex items-center justify-center gap-1 sm:gap-4 mb-8 overflow-x-auto pb-1">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center shrink-0">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
                1 >= step ? 'bg-accent text-primary' : 'bg-primary-light text-gray-500'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-8 sm:w-16 h-1 mx-1.5 sm:mx-2 ${1 > step ? 'bg-accent' : 'bg-primary-light'}`} />
              )}
            </div>
          ))}
        </div>

        <form className="space-y-4">
          <div className="glass-card rounded-3xl p-4 sm:p-6">
            <h3 className="font-dm font-semibold mb-4">Mülk Türü</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {propertyTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, property_type: type.value }))}
                  className={`p-3 sm:p-4 rounded-xl border text-center transition-all touch-manipulation ${
                    formData.property_type === type.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-glass-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <span className="text-2xl block mb-1">{type.icon}</span>
                  <span className="text-xs">{type.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-3">İlan Türü</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, listing_type: 'sale' }))}
                  className={`flex-1 py-3 rounded-xl border font-semibold transition-all touch-manipulation ${
                    formData.listing_type === 'sale'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-glass-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  Satılık
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, listing_type: 'rent' }))}
                  className={`flex-1 py-3 rounded-xl border font-semibold transition-all touch-manipulation ${
                    formData.listing_type === 'rent'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-glass-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  Kiralık
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-4 sm:p-6">
            <h3 className="font-dm font-semibold mb-4">
              Temel Bilgiler
            </h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Şehir</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-glass"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">İlçe</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="input-glass"
                  >
                    <option value="">Seçiniz</option>
                    {(districts[formData.city] || []).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Mahalle</label>
                  <select
                    name="neighborhood"
                    value={formData.neighborhood || ''}
                    onChange={handleChange}
                    className="input-glass"
                    disabled={!formData.district}
                  >
                    <option value="">Seçiniz</option>
                    {((neighborhoods[formData.city] && neighborhoods[formData.city][formData.district]) || []).map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">m² (Brüt)</label>
                  <input
                    type="number"
                    name="area_sqm"
                    min={0}
                    value={formData.area_sqm || ''}
                    onChange={(e) => {
                      const v = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value))
                      setFormData(prev => ({ ...prev, area_sqm: v }))
                    }}
                    placeholder="120"
                    className="input-glass"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Oda Sayısı</label>
                  <select
                    name="room_count"
                    value={formData.room_count || ''}
                    onChange={handleChange}
                    className="input-glass"
                  >
                    <option value="">Seçiniz</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                      <option key={n} value={n}>{n}+1</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Banyo Sayısı</label>
                  <select
                    name="bathroom_count"
                    value={formData.bathroom_count}
                    onChange={handleChange}
                    className="input-glass"
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Bulunduğu Kat</label>
                  <input
                    type="number"
                    name="floor_number"
                    value={formData.floor_number || ''}
                    onChange={handleChange}
                    placeholder="3"
                    className="input-glass"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Toplam Kat</label>
                  <input
                    type="number"
                    name="total_floors"
                    value={formData.total_floors || ''}
                    onChange={handleChange}
                    placeholder="10"
                    className="input-glass"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-4 sm:p-6">
            <h3 className="font-dm font-semibold mb-4">
              Bina Detayları
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Bina Yaşı</label>
                <input
                  type="number"
                  name="building_age"
                  value={formData.building_age || ''}
                  onChange={handleChange}
                  placeholder="5"
                  className="input-glass"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Bina Tipi</label>
                  <select
                    name="building_type"
                    value={formData.building_type || ''}
                    onChange={handleChange}
                    className="input-glass"
                  >
                    <option value="">Seçiniz</option>
                    {buildingTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Isıtma Tipi</label>
                  <select
                    name="heating_type"
                    value={formData.heating_type || ''}
                    onChange={handleChange}
                    className="input-glass"
                  >
                    <option value="">Seçiniz</option>
                    {heatingTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Cephe</label>
                <select
                  name="facade"
                  value={formData.facade || ''}
                  onChange={handleChange}
                  className="input-glass"
                >
                  <option value="">Seçiniz</option>
                  {facades.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-4 sm:p-6">
            <h3 className="font-dm font-semibold mb-4">
              Özellikler
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'has_elevator', label: 'Asansör' },
                { key: 'has_parking', label: 'Otopark' },
                { key: 'has_balcony', label: 'Balkon' },
                { key: 'has_garden', label: 'Bahçe' },
                { key: 'has_storage', label: 'Depo' },
                { key: 'is_renovated', label: 'Tadilatlı' },
                { key: 'has_pool', label: 'Havuz' },
                { key: 'has_jacuzzi', label: 'Jakuzi' },
                { key: 'has_sea_view', label: 'Deniz Manzarası' },
                { key: 'has_closed_parking', label: 'Kapalı Otopark' },
                { key: 'has_generator', label: 'Jeneratör' },
                { key: 'has_smart_home', label: 'Smart Home' },
              ].map((feature) => {
                const k = feature.key as keyof PropertyFormData
                const on = Boolean(formData[k])
                return (
                <button
                  key={feature.key}
                  type="button"
                  onClick={() => toggleFeature(feature.key)}
                  className={`p-3 sm:p-4 rounded-xl border flex items-center gap-3 text-left transition-all ${
                    on
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-glass-border text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <span className="break-words text-sm sm:text-base">{feature.label}</span>
                </button>
                )
              })}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-4 sm:p-6">
            <h3 className="font-dm font-semibold mb-4">Mevcut Fiyat <span className="text-error">*</span></h3>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                name="price"
                value={formatPriceDisplay(formData.price)}
                onChange={handlePriceChange}
                placeholder="1.500.000"
                className="input-glass text-xl font-mono"
              />
              {formData.price ? (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₺</span>
              ) : null}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Binlik ayırıcı olarak nokta kullanılır (örn: 1.500.000)
            </p>
          </div>

          <div className="glass-card rounded-3xl p-4 sm:p-6">
            <h3 className="font-dm font-semibold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-accent" />
              İlan Fotoğrafları (Opsiyonel)
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Mülk fotoğraflarını yükleyin, AI analiz sonuçlarına fotoğraf kalitesi değerlendirmesi ekleyelim
            </p>
            
            <div className="border-2 border-dashed border-glass-border rounded-xl p-6 text-center hover:border-accent/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isUploading}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  {isUploading ? (
                    <Loader2 className="w-10 h-10 text-accent animate-spin mb-3" />
                  ) : (
                    <Upload className="w-10 h-10 text-gray-500 mb-3" />
                  )}
                  <span className="text-gray-400 mb-1">
                    {isUploading ? 'Yükleniyor...' : 'Fotoğraf yüklemek için tıklayın'}
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG veya WEBP ( maks. 10MB )
                  </span>
                </div>
              </label>
            </div>

            {uploadedImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Yüklenen fotoğraflar ({uploadedImages.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {uploadedImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-20 overflow-hidden rounded-lg">
                        <Image
                          src={img}
                          alt={`Uploaded ${index + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!formData.district || !formData.area_sqm || !formData.price || formData.price <= 0 || isAnalyzing}
            className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                AI Analiz Ediyor...
              </>
            ) : (
              <>
                <Brain className="w-6 h-6" />
                Analiz Yap
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Bu analiz 1 kredi kullanacak. Kalan krediniz: {user ? user.monthly_credits - user.used_credits : 0}
          </p>
        </form>
      </div>
    </main>
  )
}
