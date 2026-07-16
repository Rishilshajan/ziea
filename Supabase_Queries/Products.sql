-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_code TEXT UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    original_price NUMERIC,
    discounted_price NUMERIC,
    material TEXT,
    care_instructions TEXT,
    shipping_info TEXT,
    contents TEXT,
    is_published BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    sizes JSONB DEFAULT '[]'::jsonb, -- e.g., [{"size": "S", "quantity": 10}, {"size": "M", "quantity": 15}]
    images JSONB DEFAULT '[]'::jsonb, -- e.g., [{"url": "...", "is_highlight": true, "crop_x": 50, "crop_y": 50}]
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create a sequence and trigger to auto-generate Z-0001 style codes
CREATE SEQUENCE IF NOT EXISTS products_code_seq START 1;

CREATE OR REPLACE FUNCTION set_product_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.product_code IS NULL THEN
    NEW.product_code := 'Z-' || LPAD(nextval('products_code_seq')::TEXT, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_product_code ON products;
CREATE TRIGGER trigger_set_product_code
BEFORE INSERT ON products
FOR EACH ROW
EXECUTE FUNCTION set_product_code();

-- 4. Create an RPC function to increment the view counter safely from the frontend
CREATE OR REPLACE FUNCTION increment_product_view_count(p_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE products SET view_count = view_count + 1 WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create an RPC function to reset all views to zero (for pre-deployment)
CREATE OR REPLACE FUNCTION reset_all_product_views()
RETURNS void AS $$
BEGIN
  UPDATE products SET view_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: Ensure Row Level Security (RLS) is configured appropriately in the Supabase Dashboard
-- based on your public access requirements (e.g. public can select published products).


-- 1. Add the badges array column
ALTER TABLE products ADD COLUMN badges text[] DEFAULT '{}';

-- 2. Add the status column (with draft, published, and hidden as the allowed states)
ALTER TABLE products ADD COLUMN status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden'));
