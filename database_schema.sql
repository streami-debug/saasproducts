-- Enable cryptographic extensions for reliable unique sequencing configurations
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Global System Profiles Matrix Account Classification
CREATE TYPE user_role AS ENUM ('user', 'creator', 'admin');
CREATE TYPE subscription_tier AS ENUM ('free', 'premium');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    encrypted_password TEXT NOT NULL,
    role user_role DEFAULT 'user'::user_role,
    sub_tier subscription_tier DEFAULT 'free'::subscription_tier,
    stripe_customer_id TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Template Computational Asset Catalog Manifest Schema
CREATE TYPE template_category AS ENUM ('chatgpt', 'claude', 'midjourney', 'cursor', 'saas', 'automation', 'marketing');
CREATE TYPE product_tier AS ENUM ('basic', 'bundle', 'premium');

CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_cents INTEGER NOT NULL CHECK (price_cents BETWEEN 1500 AND 4000), -- Hard boundaries enforcing pricing policies
    category template_category NOT NULL,
    tier product_tier NOT NULL,
    tags TEXT[] DEFAULT '{}'::TEXT[],
    features TEXT[] DEFAULT '{}'::TEXT[],
    compatibility TEXT[] DEFAULT '{}'::TEXT[],
    file_payload_url TEXT NOT NULL, -- Secure S3 / Cloudinary payload target locator string
    creator_id UUID REFERENCES users(id) ON DELETE RESTRICT NOT NULL,
    rating_cache NUMERIC(3,2) DEFAULT 0.00,
    review_count_cache INTEGER DEFAULT 0,
    download_count_cache INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Core Transaction Ledger Settlement Processing Log Table
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    stripe_intent_id TEXT UNIQUE NOT NULL,
    amount_paid_cents INTEGER NOT NULL,
    status transaction_status DEFAULT 'pending'::transaction_status,
    coupon_applied TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Relational Order Matrix Component Links Table (Deconstructs Multi-Item Checkout Bundles)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE NOT NULL,
    template_id UUID REFERENCES templates(id) ON DELETE RESTRICT NOT NULL,
    unit_price_cents INTEGER NOT NULL
);

-- Cryptographically Audited Verification Table for Access Validation
CREATE TABLE asset_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE NOT NULL,
    download_token UUID UNIQUE DEFAULT uuid_generate_v4() NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    downloaded_at TIMESTAMP WITH TIME ZONE
);

-- High Efficiency Performance Acceleration Database Indexes
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_price ON templates(price_cents);
CREATE INDEX idx_order_items_template ON order_items(template_id);
