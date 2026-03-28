// EstaMind - Database Type Definitions

export type PlanType = 'lite' | 'pro' | 'elite';
export type PropertyType = 'apartment' | 'residence' | 'villa' | 'house' | 'farmhouse' | 'mansion' | 'yalı' | 'yali_dairesi' | 'summerhouse' | 'land' | 'commercial' | 'studio' | 'duplex' | 'penthouse';
export type ListingType = 'sale' | 'rent';
export type PropertyStatus = 'draft' | 'active' | 'pending' | 'sold' | 'rented' | 'archived';
export type AnalysisType = 'pricing' | 'market' | 'comparable' | 'trend' | 'buyer_segment' | 'title_optimization' | 'photo_quality';
export type ReportType = 'pricing' | 'market_analysis' | 'comparable' | 'full' | 'buyer_presentation';
export type TrendDirection = 'up' | 'down' | 'stable';

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  company: string | null;
  avatar_url: string | null;
  plan_type: PlanType;
  monthly_credits: number;
  used_credits: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface District {
  id: string;
  name: string;
  city: string;
  district_code: string | null;
  latitude: number | null;
  longitude: number | null;
  avg_price_per_sqm: number | null;
  demand_score: number;
  trend_direction: TrendDirection;
  total_listings: number;
  avg_days_on_market: number;
  updated_at: string;
}

export interface Property {
  id: string;
  user_id: string;
  district_id: string | null;
  title: string | null;
  description: string | null;
  property_type: PropertyType;
  listing_type: ListingType;
  address: string | null;
  city: string | null;
  district: string | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  area_sqm: number;
  room_count: number | null;
  living_room_count: number;
  bathroom_count: number;
  floor_number: number | null;
  total_floors: number | null;
  building_age: number | null;
  building_type: string | null;
  heating_type: string | null;
  facade: string | null;
  has_elevator: boolean;
  has_parking: boolean;
  has_balcony: boolean;
  has_garden: boolean;
  has_storage: boolean;
  is_renovated: boolean;
  renovation_year: number | null;
  images: string[];
  video_url: string | null;
  price: number | null;
  currency: string;
  ai_condition_score: number | null;
  ai_condition_label: string | null;
  suggested_price_min: number | null;
  suggested_price_max: number | null;
  confidence_score: number | null;
  buyer_segments: BuyerSegment[];
  title_suggestions: string[];
  status: PropertyStatus;
  views_count: number;
  inquiry_count: number;
  is_featured: boolean;
  featured_until: string | null;
  created_at: string;
  updated_at: string;
  listed_at: string | null;
  sold_at: string | null;
}

export interface BuyerSegment {
  segment: string;
  probability: number;
  description: string;
}

export interface Analysis {
  id: string;
  user_id: string;
  property_id: string | null;
  analysis_type: AnalysisType;
  input_params: Record<string, unknown>;
  results: Record<string, unknown>;
  base_price: number | null;
  adjusted_price: number | null;
  price_per_sqm: number | null;
  district_avg_price: number | null;
  condition_adjustment: number | null;
  trend_adjustment: number | null;
  confidence_level: number | null;
  similar_properties_count: number | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message: string | null;
  credits_used: number;
  created_at: string;
  completed_at: string | null;
}

export interface Report {
  id: string;
  user_id: string;
  property_id: string | null;
  analysis_id: string | null;
  title: string | null;
  report_type: ReportType;
  format: 'pdf' | 'html' | 'json';
  file_url: string | null;
  file_size: number | null;
  data: Record<string, unknown>;
  is_shared: boolean;
  share_token: string | null;
  shared_via: string | null;
  created_at: string;
  expires_at: string | null;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_provider: string | null;
  provider_transaction_id: string | null;
  plan_type: PlanType | null;
  billing_cycle: string;
  period_start: string | null;
  period_end: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  failure_reason: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface PropertyFormData {
  property_type: PropertyType;
  listing_type: ListingType;
  address: string;
  city: string;
  district: string;
  neighborhood?: string;
  area_sqm: number;
  room_count: number;
  living_room_count?: number;
  bathroom_count?: number;
  floor_number?: number;
  total_floors?: number;
  building_age?: number;
  building_type?: string;
  heating_type?: string;
  facade?: string;
  has_elevator?: boolean;
  has_parking?: boolean;
  has_balcony?: boolean;
  has_garden?: boolean;
  has_storage?: boolean;
  is_renovated?: boolean;
  has_pool?: boolean;
  has_jacuzzi?: boolean;
  has_sea_view?: boolean;
  has_closed_parking?: boolean;
  has_generator?: boolean;
  has_smart_home?: boolean;
  renovation_year?: number;
  price?: number;
  title?: string;
  description?: string;
}

export interface AnalysisRequest {
  property_type: PropertyType;
  listing_type: ListingType;
  city: string;
  district: string;
  area_sqm: number;
  room_count: number;
  building_age?: number;
  condition?: 'luxury' | 'good' | 'average' | 'poor';
  has_elevator?: boolean;
  has_parking?: boolean;
  is_renovated?: boolean;
}
