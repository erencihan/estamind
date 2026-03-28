import type { ReportData, ReportFormatters } from '@/types/report'

/**
 * Profesyonel HTML rapor gövdesi (PDF/html2pdf ile uyumlu).
 */
export function renderProfessionalReportHtml(
  report: ReportData,
  fmt: ReportFormatters
): string {
  const { formData, analysisResults, createdAt } = report
  const { formatCurrency, formatPrice, getTrendIcon, getTrendText } = fmt
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${report.title} - EstaMind Rapor</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
      padding: 40px;
      max-width: 850px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 3px solid #e94560;
      margin-bottom: 30px;
    }
    
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a2e;
      margin-bottom: 5px;
    }
    
    .logo span {
      color: #e94560;
    }
    
    .report-title {
      font-size: 22px;
      color: #1a1a2e;
      margin-top: 10px;
    }
    
    .report-meta {
      color: #666;
      font-size: 14px;
      margin-top: 8px;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 18px;
      color: #1a1a2e;
      border-bottom: 2px solid #e94560;
      padding-bottom: 8px;
      margin-bottom: 15px;
    }
    
    .property-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    
    .info-card {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #e94560;
    }
    
    .info-card label {
      display: block;
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    
    .info-card .value {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a2e;
    }
    
    .price-section {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 25px;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    
    .price-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      text-align: center;
    }
    
    .price-item {
      padding: 15px;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
    }
    
    .price-item label {
      display: block;
      font-size: 12px;
      opacity: 0.8;
      margin-bottom: 8px;
    }
    
    .price-item .value {
      font-size: 24px;
      font-weight: bold;
      color: #e94560;
    }
    
    .price-item .value.success {
      color: #00bf63;
    }
    
    .suggested-price {
      background: #00bf63;
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin-top: 20px;
    }
    
    .suggested-price label {
      font-size: 14px;
      opacity: 0.9;
    }
    
    .suggested-price .value {
      font-size: 32px;
      font-weight: bold;
      margin-top: 5px;
    }
    
    .analysis-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .analysis-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }
    
    .analysis-card .label {
      font-size: 13px;
      color: #666;
      margin-bottom: 5px;
    }
    
    .analysis-card .value {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a2e;
    }
    
    .strategy-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    
    .strategy-item.quick-sale {
      border-left: 4px solid #00bf63;
    }
    
    .strategy-item.optimal {
      border-left: 4px solid #e94560;
    }
    
    .investment-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .investment-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    
    .investment-card .label {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
    }
    
    .investment-card .value {
      font-size: 20px;
      font-weight: bold;
      color: #1a1a2e;
    }
    
    .investment-card .value.high {
      color: #00bf63;
    }
    
    .investment-card .value.medium {
      color: #e94560;
    }
    
    .marketing-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .marketing-card {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
    }
    
    .marketing-card .label {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      font-weight: 600;
    }
    
    .feature-tag {
      display: inline-block;
      background: #e94560;
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      margin: 3px;
    }
    
    .channel-tag {
      display: inline-block;
      background: #4a90d9;
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      margin: 3px;
    }
    
    .title-suggestion {
      background: #f8f9fa;
      padding: 12px 15px;
      border-radius: 6px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer {
      text-align: center;
      padding-top: 30px;
      border-top: 2px solid #eee;
      margin-top: 40px;
      color: #666;
      font-size: 12px;
    }
    
    .executive-summary {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 24px;
      border-radius: 12px;
      border-left: 5px solid #e94560;
      margin-bottom: 30px;
    }
    
    .executive-summary h2 {
      font-size: 16px;
      color: #1a1a2e;
      margin-bottom: 12px;
    }
    
    .executive-summary p {
      color: #444;
      font-size: 14px;
      line-height: 1.7;
    }
    
    .methodology {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      font-size: 13px;
      color: #555;
      margin-bottom: 30px;
    }
    
    .methodology ul {
      margin: 10px 0 0 20px;
    }
    
    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      margin: 15px 0;
    }
    
    .comparison-table th,
    .comparison-table td {
      border: 1px solid #dee2e6;
      padding: 12px;
      text-align: left;
    }
    
    .comparison-table th {
      background: #1a1a2e;
      color: white;
      font-weight: 600;
    }
    
    .comparison-table tr:nth-child(even) {
      background: #f8f9fa;
    }
    
    .segment-bar {
      height: 24px;
      border-radius: 4px;
      background: #e9ecef;
      overflow: hidden;
      margin: 8px 0;
    }
    
    .segment-bar-fill {
      height: 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding-left: 8px;
      color: white;
      font-size: 12px;
      font-weight: 600;
    }
    
    .disclaimer-box {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 16px;
      font-size: 12px;
      color: #856404;
      margin-top: 30px;
    }
    
    .disclaimer-box strong {
      display: block;
      margin-bottom: 8px;
    }
    
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #e94560;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(233, 69, 96, 0.3);
    }
    
    .print-button:hover {
      background: #d63d56;
    }
    
    @media print {
      .print-button {
        display: none;
      }
      body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <button class="print-button" onclick="window.print()">📄 PDF Olarak Kaydet</button>
  
  <div class="header">
    <div class="logo">Esta<span>Mind</span></div>
    <div class="report-title">${report.title}</div>
    <div class="report-meta">
      <span>${report.type}</span> • 
      <span>Oluşturulma Tarihi: ${createdAt || report.date}</span> •
      <span>Konum: ${formData.city || 'N/A'} / ${formData.district || 'N/A'}</span>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Özet</h2>
    <div class="executive-summary">
      <h2>Yönetici Özeti</h2>
      <p>
        Bu rapor, <strong>${formData.city || 'N/A'} / ${formData.district || 'N/A'}</strong> bölgesinde yer alan 
        <strong>${formData.area_sqm || 'N/A'} m²</strong> alanlı, <strong>${formData.room_count || 'N/A'}+1</strong> oda sayılı 
        mülk için hazırlanmıştır. AI destekli fiyat analizi sonucunda önerilen fiyat aralığı 
        <strong>${formatPrice(analysisResults.suggestedPriceMin)} - ${formatPrice(analysisResults.suggestedPriceMax)}</strong> olup, 
        bölge ortalaması (${formatCurrency(analysisResults.districtAvgPricePerSqm)}/m²) ile karşılaştırıldığında 
        ${Number(analysisResults.agentAnalysis?.marketComparison?.difference) >= 0 ? 'pazarın üzerinde' : 'pazarın altında'} bir konumdadır. 
        Tahmini satış süresi ${analysisResults.daysOnMarket || 'N/A'} gün olarak hesaplanmıştır. 
        Rapor aşağıda detaylı bölümlerle sunulmaktadır.
      </p>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Analiz Yöntemi</h2>
    <div class="methodology">
      <p>Bu rapor aşağıdaki veri kaynakları ve yöntemler kullanılarak oluşturulmuştur:</p>
      <ul>
        <li>İlçe ve il bazlı ortalama m² fiyat verileri</li>
        <li>Benzer mülk ilanları ve satış geçmişi karşılaştırması</li>
        <li>Talep ve pazar trendi göstergeleri</li>
        <li>Bina yaşı, konum ve özellikler için düzeltme katsayıları</li>
        <li>Makine öğrenmesi tabanlı fiyat tahmin modeli (güven skoru: %${analysisResults.confidenceScore || 'N/A'})</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">🏠 Mülk Bilgileri</h2>
    <div class="property-info">
      <div class="info-card">
        <label>Mülk Türü</label>
        <span class="value">${formData.property_type || 'N/A'}</span>
      </div>
      <div class="info-card">
        <label>Net Alan (m²)</label>
        <span class="value">${formData.area_sqm || 'N/A'} m²</span>
      </div>
      <div class="info-card">
        <label>Oda Sayısı</label>
        <span class="value">${formData.room_count || 'N/A'}+1</span>
      </div>
      <div class="info-card">
        <label>Banyo Sayısı</label>
        <span class="value">${formData.bathroom_count || 'N/A'}</span>
      </div>
      <div class="info-card">
        <label>İl/İlçe</label>
        <span class="value">${formData.city || 'N/A'} / ${formData.district || 'N/A'}</span>
      </div>
      <div class="info-card">
        <label>Güven Skoru</label>
        <span class="value">%${analysisResults.confidenceScore || 'N/A'}</span>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">💰 Fiyat Analizi</h2>
    <div class="price-section">
      <div class="price-grid">
        <div class="price-item">
          <label>İlçe Ortalama</label>
          <div class="value">${formatCurrency(analysisResults.districtAvgPricePerSqm)}/m²</div>
        </div>
        <div class="price-item">
          <label>Bu Mülkün m² Fiyatı</label>
          <div class="value">${formatCurrency(analysisResults.pricePerSqm)}/m²</div>
        </div>
        <div class="price-item">
          <label>İl Geneli Ortalama</label>
          <div class="value">${formatCurrency(analysisResults.agentAnalysis?.marketComparison?.cityAvg)}/m²</div>
        </div>
      </div>
      <div class="suggested-price">
        <label>🤖 AI Önerilen Fiyat Aralığı</label>
        <div class="value">${formatPrice(analysisResults.suggestedPriceMin)} - ${formatPrice(analysisResults.suggestedPriceMax)}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">📊 Pazar Analizi</h2>
    <div class="analysis-grid">
      <div class="analysis-card">
        <div class="label">Pazar Durumu</div>
        <div class="value" style="color: ${Number(analysisResults.agentAnalysis?.marketComparison?.difference) >= 0 ? '#e94560' : '#00bf63'}">
          ${Number(analysisResults.agentAnalysis?.marketComparison?.difference) >= 0 ? 'Pazarın Üstünde' : 'Pazarın Altında'} 
          (%${Math.abs(analysisResults.agentAnalysis?.marketComparison?.difference || 0)})
        </div>
      </div>
      <div class="analysis-card">
        <div class="label">Talep Seviyesi</div>
        <div class="value">${analysisResults.demandLevel || 'N/A'}</div>
      </div>
      <div class="analysis-card">
        <div class="label">Tahmini Satış Süresi</div>
        <div class="value">${analysisResults.daysOnMarket || 'N/A'} gün</div>
      </div>
      <div class="analysis-card">
        <div class="label">Aktif İlan Sayısı</div>
        <div class="value">${analysisResults.districtData?.totalListings || 'N/A'}</div>
      </div>
      <div class="analysis-card">
        <div class="label">Benzer İlan Sayısı</div>
        <div class="value">${analysisResults.agentAnalysis?.competition?.similarProperties || 'N/A'}</div>
      </div>
      <div class="analysis-card">
        <div class="label">Trend Yönü</div>
        <div class="value">${getTrendIcon(analysisResults.districtData?.trend)} ${getTrendText(analysisResults.districtData?.trend)}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">💼 Fiyatlandırma Stratejisi</h2>
    <div class="strategy-item quick-sale">
      <div>
        <div style="font-weight: 600;">Hızlı Satış Fiyatı</div>
        <div style="font-size: 12px; color: #666;">${analysisResults.daysOnMarket ? analysisResults.daysOnMarket - 10 : 'N/A'} gün içinde satış</div>
      </div>
      <div style="font-size: 20px; font-weight: bold; color: #00bf63;">
        ${formatPrice(analysisResults.agentAnalysis?.pricingStrategy?.quickSalePrice)}
      </div>
    </div>
    <div class="strategy-item optimal">
      <div>
        <div style="font-weight: 600;">Optimal Fiyat</div>
        <div style="font-size: 12px; color: #666;">${analysisResults.daysOnMarket || 'N/A'} gün içinde satış</div>
      </div>
      <div style="font-size: 20px; font-weight: bold; color: #e94560;">
        ${formatPrice(analysisResults.agentAnalysis?.pricingStrategy?.optimalPrice)}
      </div>
    </div>
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 10px;">
      <div style="font-weight: 600; margin-bottom: 5px;">📋 Strateji Önerisi</div>
      <div style="color: #666;">${analysisResults.agentAnalysis?.pricingStrategy?.strategy || 'Strateji önerisi bulunmuyor.'}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">📈 Yatırım Potansiyeli</h2>
    <div class="investment-grid">
      <div class="investment-card">
        <div class="label">Yatırım Getirisi</div>
        <div class="value ${analysisResults.agentAnalysis?.investment?.roi === 'Yüksek' ? 'high' : 'medium'}">
          ${analysisResults.agentAnalysis?.investment?.roi || 'N/A'}
        </div>
      </div>
      <div class="investment-card">
        <div class="label">Kiralama Getirisi</div>
        <div class="value">%${analysisResults.agentAnalysis?.investment?.rentalYield || 'N/A'}</div>
        <div style="font-size: 11px; color: #666;">Aylık brüt</div>
      </div>
      <div class="investment-card">
        <div class="label">Değer Artışı</div>
        <div class="value ${analysisResults.agentAnalysis?.investment?.appreciationPotential === 'Yüksek' ? 'high' : ''}">
          ${analysisResults.agentAnalysis?.investment?.appreciationPotential || 'N/A'}
        </div>
      </div>
    </div>
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
      <div style="font-weight: 600; margin-bottom: 5px;">📋 Yatırım Değerlendirmesi</div>
      <div style="color: #666;">${analysisResults.agentAnalysis?.investment?.recommendation || 'Yatırım değerlendirmesi bulunmuyor.'}</div>
    </div>
  </div>

  ${analysisResults.agentAnalysis?.marketing ? `
  <div class="section">
    <h2 class="section-title">🎯 Pazarlama Önerileri</h2>
    <div class="marketing-grid">
      <div class="marketing-card">
        <div class="label">Öne Çıkarılacak Özellikler</div>
        <div>
          ${analysisResults.agentAnalysis?.marketing?.keyFeatures?.map((f: string) => `<span class="feature-tag">${f}</span>`).join('') || 'Konum ve fiyat avantajı'}
        </div>
      </div>
      <div class="marketing-card">
        <div class="label">Hedef Kitle</div>
        <div>${analysisResults.agentAnalysis?.marketing?.targetAudience || 'Belirtilmemiş'}</div>
      </div>
      <div class="marketing-card">
        <div class="label">En İyi Listeleme Zamanı</div>
        <div>${analysisResults.agentAnalysis?.marketing?.bestTimeToList || 'Belirtilmemiş'}</div>
      </div>
      <div class="marketing-card">
        <div class="label">Önerilen Platformlar</div>
        <div>
          ${analysisResults.agentAnalysis?.marketing?.channels?.map((c: string) => `<span class="channel-tag">${c}</span>`).join('') || ''}
        </div>
      </div>
    </div>
  </div>
  ` : ''}

  ${analysisResults.titleSuggestions && analysisResults.titleSuggestions.length > 0 ? `
  <div class="section">
    <h2 class="section-title">✏️ İlan Başlığı Önerileri</h2>
    ${analysisResults.titleSuggestions.map((title: string) => `
      <div class="title-suggestion">
        <span>${title}</span>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${analysisResults.buyerSegments && analysisResults.buyerSegments.length > 0 ? `
  <div class="section">
    <h2 class="section-title">Alıcı Segmentleri (Detay)</h2>
    <p style="margin-bottom: 15px; color: #666; font-size: 14px;">Bu mülk için en uygun alıcı profilleri ve olasılık dağılımı aşağıdadır.</p>
    ${analysisResults.buyerSegments.map((seg: { segment: string; probability: number; color: string }) => `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-weight: 600;">${seg.segment}</span>
          <span style="color: #666;">%${seg.probability}</span>
        </div>
        <div class="segment-bar">
          <div class="segment-bar-fill" style="width: ${seg.probability}%; background: ${seg.color || '#e94560'};">
            ${seg.probability}%
          </div>
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  <div class="section">
    <h2 class="section-title">Benzer Mülk Karşılaştırması</h2>
    <p style="margin-bottom: 15px; color: #666; font-size: 14px;">Aynı bölgedeki benzer özellikte mülklerin fiyat aralığı (referans).</p>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Kriter</th>
          <th>Değer</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>İlçe ortalama m² fiyatı</td><td>${formatCurrency(analysisResults.districtAvgPricePerSqm)}</td></tr>
        <tr><td>Bu mülk tahmini m² fiyatı</td><td>${formatCurrency(analysisResults.pricePerSqm)}</td></tr>
        <tr><td>Benzer ilan sayısı (bölge)</td><td>${analysisResults.agentAnalysis?.competition?.similarProperties ?? 'N/A'}</td></tr>
        <tr><td>Önerilen min. fiyat</td><td>${formatPrice(analysisResults.agentAnalysis?.competition?.priceRange?.min)}</td></tr>
        <tr><td>Önerilen max. fiyat</td><td>${formatPrice(analysisResults.agentAnalysis?.competition?.priceRange?.max)}</td></tr>
      </tbody>
    </table>
    ${analysisResults.agentAnalysis?.competition?.recommendation ? `
    <p style="margin-top: 12px; font-size: 13px; color: #555;"><strong>Rekabet önerisi:</strong> ${analysisResults.agentAnalysis.competition.recommendation}</p>
    ` : ''}
  </div>

  <div class="disclaimer-box">
    <strong>Önemli Uyarı ve Sorumluluk Reddi</strong>
    Bu rapor yalnızca bilgilendirme ve profesyonel destek amaçlıdır. Gerçek piyasa koşulları, bölgesel farklılıklar ve güncel talep değişebilir. 
    Nihai fiyat ve satış kararlarında uzman bir emlak danışmanı veya değerleme uzmanı ile çalışmanız önerilir. 
    Rapor verileri belirli bir tarihe aittir; önemli piyasa hareketlerinde raporun yenilenmesi faydalıdır.
  </div>

  <div class="footer">
    <p>Bu rapor <strong>EstaMind</strong> tarafından oluşturulmuştur.</p>
    <p>Oluşturulma Tarihi: ${createdAt || report.date}</p>
    <p style="margin-top: 10px; font-size: 10px;">
      Bu rapor yalnızca bilgilendirme amaçlıdır. Gerçek piyasa koşulları farklılık gösterebilir.
    </p>
  </div>
</body>
</html>`
}
