/**
 * Uygulama genelinde kullanılan sabitler.
 * Canlıya alırken env ve feature flag'ler bu yapıya eklenebilir.
 */

export const APP_NAME = 'EstaMind'

/** localStorage anahtarları – tek yerden yönetim, typo önleme */
export const STORAGE_KEYS = {
  USER: 'estamind_user',
  DATA_CONTRIBUTIONS: 'data_contributions',
  SAVED_REPORTS: 'savedReports',
} as const

/** Middleware ile korumalı rotalarda kullanılan oturum çerezi (client girişte set edilir). */
export const SESSION_COOKIE_NAME = 'estamind_session'
export const SESSION_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 30

/** true ise analiz sunucu `POST /api/analysis` üzerinden çalışır (çerez gerekir). */
export const ANALYSIS_VIA_API =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_ANALYSIS_VIA_API === 'true'

/** İleride kullanılacak: özellik bayrakları (canlıda A/B test vb.) */
export const FEATURE_FLAGS = {
  USE_REAL_AI_ANALYSIS: false,
  USE_REAL_AUTH: false,
} as const
