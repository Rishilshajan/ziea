-- ─────────────────────────────────────────────────────────────────────────────
-- WhatsApp orders. Buy Now (and later the cart) records the customer's intent
-- here BEFORE redirecting them to WhatsApp, so no lead is ever lost. Payment and
-- confirmation happen in the WhatsApp chat; admins move the row through statuses.
-- Idempotent — safe to run as-is.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- null for guests
    customer_name TEXT,
    customer_phone TEXT,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_code TEXT,
    product_name TEXT,
    size TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC NOT NULL DEFAULT 0,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Initiated', -- Initiated | Confirmed | Fulfilled | Cancelled
    source TEXT NOT NULL DEFAULT 'buy_now',   -- buy_now | cart
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fast filters for the admin inbox (status tabs) + newest-first ordering.
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);

-- Row Level Security.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Anyone (incl. guests) may place an order.
DROP POLICY IF EXISTS "Enable insert access for all users" ON orders;
CREATE POLICY "Enable insert access for all users" ON orders
    FOR INSERT WITH CHECK (true);

-- Authenticated admins may read every order.
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON orders;
CREATE POLICY "Enable read access for authenticated users" ON orders
    FOR SELECT TO authenticated USING (true);

-- Authenticated admins may update the status.
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON orders;
CREATE POLICY "Enable update access for authenticated users" ON orders
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Realtime: live admin sidebar counter on new orders / status changes.
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE orders;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
