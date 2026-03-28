# EstaMind - Real Estate AI Platform Specification

## Project Overview
- **Project Name**: EstaMind
- **Type**: SaaS Web Application
- **Core Functionality**: AI-powered property analysis, pricing optimization, and marketing automation for real estate professionals
- **Target Users**: Professional real estate agents struggling with pricing, portfolio monetization, and client acquisition

---

## UI/UX Specification

### Design Philosophy
- **Aesthetic**: Glassmorphism meets modern SaaS - premium, trustworthy, tech-forward
- **Mood**: "Apple meets Wall Street" - clean, sophisticated, authoritative

### Color Palette
```
css
--primary: #0F172A          /* Deep Navy - Trust, Authority */
--primary-light: #1E293B   /* Slate - Depth */
--accent: #F59E0B          /* Amber Gold - Premium, Value */
--accent-hover: #D97706    /* Darker Amber */
--success: #10B981         /* Emerald - Positive AI */
--warning: #F97316         /* Orange - Attention */
--error: #EF4444           /* Red - Alerts */
--glass-bg: rgba(255, 255, 255, 0.08)
--glass-border: rgba(255, 255, 255, 0.18)
--glass-highlight: rgba(255, 255, 255, 0.25)
--dark-surface: #0C1222    /* Near Black - Background */
--card-bg: #1A2332         /* Card Background */
--text-primary: #F8FAFC    /* White-ish */
--text-secondary: #94A3B8  /* Muted */
--text-muted: #64748B      /* Very Muted */
```

### Typography
- **Headings**: "Outfit" - Modern, geometric, premium feel
- **Body**: "DM Sans" - Clean, readable, professional
- **Monospace**: "JetBrains Mono" - For numbers/data

### Spacing System
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px

### Visual Effects
- **Glassmorphism**: backdrop-blur-xl, semi-transparent backgrounds
- **Gradients**: Subtle amber-to-orange for CTAs
- **Shadows**: Layered shadows for depth
- **Animations**: Framer Motion for smooth transitions

---

## Page Structure

### 1. Landing Page (/)

#### Hero Section
- Full viewport height
- Animated gradient background with floating orbs
- Glassmorphism card containing:
  - Logo + tagline
  - Main headline: "Bölgenizdeki en akıllı emlakçı siz olun"
  - Subheadline: "İlan girme, analiz et. Veriyle sat, güven kazan."
  - CTA buttons: "Ücretsiz Dene" / "Demo İzle"
  - Trust badges (encryption, accuracy stats)

#### Dashboard Demo Widget
- Interactive "Örnek Analiz Raporu" preview
- Shows mini:
  - Price range indicator
  - Demand heat map simulation
  - Quick stats (days on market, competition)

#### Features Section
- 3-column grid showcasing:
  - Smart Analysis
  - AI Pricing
  - Marketing Automation
- Each with icon, title, description

#### Pricing Section
- 3 cards: Lite (Free), Pro (₺999/mo), Elite (₺2499/mo)
- Feature comparison
- Glassmorphism cards with hover effects

#### Footer
- Links, social, legal

### 2. Dashboard (/dashboard)

#### Layout
- Fixed sidebar (280px) with navigation
- Main content area with header
- Responsive (collapsible sidebar on mobile)

#### Sidebar Items
- Logo
- Dashboard (overview)
- Properties (listings)
- New Analysis (+)
- Reports
- Settings
- User profile

#### Main Content - Overview
- Stats cards row: Total Properties, Active Listings, Avg Price, Conversion Rate
- Recent analyses grid
- Price trend chart placeholder
- Demand heat map section
- Quick actions

---

## Functionality Specification

### Core Features

1. **Property Input Form**
   - Address, m², room count
   - Additional details: facade, building age, renovation status, elevator, parking
   - Image upload with AI condition analysis
   - Multiple property support

2. **AI Analysis Engine**
   - Price suggestion algorithm:
     
```
     Price = (DistrictAverage × ConditionCoefficient) ± TrendFactor
     
```
   - Buyer segmentation (% probability for family/investor/etc.)
   - Title optimization suggestions
   - Market timing recommendations

3. **Reporting**
   - PDF generation
   - WhatsApp sharing integration
   - Comparative market analysis

### Database Schema (PostgreSQL)

#### Users Table
```
sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  plan_type VARCHAR(20) DEFAULT 'lite',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
