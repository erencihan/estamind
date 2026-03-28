-- EstaMind Database Schema
-- PostgreSQL / Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    company VARCHAR(255),
    avatar_url TEXT,
    plan_type VARCHAR(20) DEFAULT 'lite' CHECK (plan_type IN ('lite', 'pro', 'elite')),
    monthly_credits INTEGER DEFAULT 1,
    used_credits INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_plan ON users(plan_type);

-- =============================================
-- DISTRICTS TABLE (Caching market data)
-- =============================================
CREATE TABLE districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district_code VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    avg_price_per_sqm DECIMAL(15, 2),
    demand_score INTEGER DEFAULT 50,
    trend_direction VARCHAR(20) DEFAULT 'stable' CHECK (trend_direction IN ('up', 'down', 'stable')),
    total_listings INTEGER DEFAULT 0,
    avg_days_on_market INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_districts_city ON districts(city);
CREATE INDEX idx_districts_demand ON districts(demand_score DESC);

-- =============================================
-- PROPERTIES TABLE
-- =============================================
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    district_id UUID REFERENCES districts(id),
    
    -- Basic Info
    title VARCHAR(500),
    description TEXT,
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('apartment', 'villa', 'house', 'land', 'commercial', 'studio', 'duplex', 'penthouse')),
    listing_type VARCHAR(20) NOT NULL CHECK (listing_type IN ('sale', 'rent')),
    
    -- Location
    address TEXT,
    city VARCHAR(100),
    district VARCHAR(100),
    neighborhood VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Property Details
    area_sqm INTEGER NOT NULL,
    room_count INTEGER,
    living_room_count INTEGER DEFAULT 1,
    bathroom_count INTEGER DEFAULT 1,
    floor_number INTEGER,
    total_floors INTEGER,
    building_age INTEGER,
    building_type VARCHAR(50),
    heating_type VARCHAR(50),
    facade VARCHAR(50),
    
    -- Features
    has_elevator BOOLEAN DEFAULT false,
    has_parking BOOLEAN DEFAULT false,
    has_balcony BOOLEAN DEFAULT false,
    has_garden BOOLEAN DEFAULT false,
    has_storage BOOLEAN DEFAULT false,
    is_renovated BOOLEAN DEFAULT false,
    renovation_year INTEGER,
    
    -- Media
    images JSONB DEFAULT '[]',
    video_url TEXT,
    
    -- Pricing
    price DECIMAL(15, 2),
    currency VARCHAR(10) DEFAULT 'TRY',
    
    -- AI Analysis Results
    ai_condition_score INTEGER,
    ai_condition_label VARCHAR(50),
    suggested_price_min DECIMAL(15, 2),
    suggested_price_max DECIMAL(15, 2),
    confidence_score DECIMAL(5, 2),
    buyer_segments JSONB DEFAULT '[]',
    title_suggestions JSONB DEFAULT '[]',
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'pending', 'sold', 'rented', 'archived')),
    views_count INTEGER DEFAULT 0,
    inquiry_count INTEGER DEFAULT 0,
    
    -- Metadata
    is_featured BOOLEAN DEFAULT false,
    featured_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    listed_at TIMESTAMP WITH TIME ZONE,
    sold_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_properties_user ON properties(user_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_district ON properties(district_id);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_created ON properties(created_at DESC);

-- =============================================
-- ANALYSES TABLE
-- =============================================
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    
    -- Analysis Type
    analysis_type VARCHAR(50) DEFAULT 'pricing' CHECK (analysis_type IN ('pricing', 'market', 'comparable', 'trend', 'buyer_segment', 'title_optimization', 'photo_quality')),
    
    -- Input Parameters (stored as JSON)
    input_params JSONB DEFAULT '{}',
    
    -- AI Analysis Results
    results JSONB NOT NULL DEFAULT '{}',
    
    -- Price Calculation
    base_price DECIMAL(15, 2),
    adjusted_price DECIMAL(15, 2),
    price_per_sqm DECIMAL(15, 2),
    district_avg_price DECIMAL(15, 2),
    condition_adjustment DECIMAL(10, 2),
    trend_adjustment DECIMAL(10, 2),
    
    -- Confidence
    confidence_level DECIMAL(5, 2),
    similar_properties_count INTEGER,
    
    -- Status
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    error_message TEXT,
    
    -- Credits Used
    credits_used INTEGER DEFAULT 1,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_analyses_user ON analyses(user_id);
CREATE INDEX idx_analyses_property ON analyses(property_id);
CREATE INDEX idx_analyses_type ON analyses(analysis_type);
CREATE INDEX idx_analyses_created ON analyses(created_at DESC);

-- =============================================
-- REPORTS TABLE
-- =============================================
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    analysis_id UUID REFERENCES analyses(id) ON DELETE SET NULL,
    
    -- Report Details
    title VARCHAR(255),
    report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('pricing', 'market_analysis', 'comparable', 'full', 'buyer_presentatio')),
    format VARCHAR(20) DEFAULT 'pdf' CHECK (format IN ('pdf', 'html', 'json')),
    
    -- File Storage
    file_url TEXT,
    file_size INTEGER,
    
    -- Report Data
    data JSONB DEFAULT '{}',
    
    -- Status
    is_shared BOOLEAN DEFAULT false,
    share_token VARCHAR(255),
    shared_via VARCHAR(20),
    
    -- Soft Delete
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_reports_property ON reports(property_id);
CREATE INDEX idx_reports_token ON reports(share_token);

-- =============================================
-- PAYMENTS TABLE
-- =============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Payment Details
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'TRY',
    payment_method VARCHAR(50),
    payment_provider VARCHAR(50),
    provider_transaction_id VARCHAR(255),
    
    -- Subscription
    plan_type VARCHAR(20),
    billing_cycle VARCHAR(20) DEFAULT 'monthly',
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled')),
    failure_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);

-- =============================================
-- USER ACTIVITY LOG
-- =============================================
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Activity Details
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);

-- =============================================
-- TRIGGERS
-- =============================================

-- Update updated_at timestamp on users
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- =============================================
-- ROW LEVEL SECURITY (For Supabase)
-- =============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "users_select_own" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Properties: owners can do all operations
CREATE POLICY "properties_select_own" ON properties
    FOR SELECT USING (user_id = auth.uid()::uuid);

CREATE POLICY "properties_insert_own" ON properties
    FOR INSERT WITH CHECK (user_id = auth.uid()::uuid);

CREATE POLICY "properties_update_own" ON properties
    FOR UPDATE USING (user_id = auth.uid()::uuid);

CREATE POLICY "properties_delete_own" ON properties
    FOR DELETE USING (user_id = auth.uid()::uuid);

-- Similar policies for analyses and reports
CREATE POLICY "analyses_select_own" ON analyses
    FOR SELECT USING (user_id = auth.uid()::uuid);

CREATE POLICY "reports_select_own" ON reports
    FOR SELECT USING (user_id = auth.uid()::uuid);
