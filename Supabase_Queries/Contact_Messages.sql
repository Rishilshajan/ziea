-- ─────────────────────────────────────────────────────────────────────────────
-- Contact / Enquiries table used by the Contact Us form and the admin Enquiries
-- inbox. The table is likely already created (the form inserts into it); this
-- script is written idempotently so it is safe to run as-is.
-- ─────────────────────────────────────────────────────────────────────────────

-- Base table (no-op if it already exists).
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT,
    phone TEXT,
    inquiry_type TEXT, -- 'business' | 'personal' | 'collaboration'
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Read-tracking columns for the admin inbox (Unread / Read).
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ;

-- Speeds up the unread counter + tab queries.
CREATE INDEX IF NOT EXISTS contact_messages_is_read_idx ON contact_messages (is_read);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages (created_at DESC);

-- Row Level Security.
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone (the public Contact Us form) may submit an enquiry.
DROP POLICY IF EXISTS "Enable insert access for all users" ON contact_messages;
CREATE POLICY "Enable insert access for all users" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Authenticated admins may read every enquiry.
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON contact_messages;
CREATE POLICY "Enable read access for authenticated users" ON contact_messages
    FOR SELECT TO authenticated USING (true);

-- Authenticated admins may toggle read state (is_read / read_at).
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON contact_messages;
CREATE POLICY "Enable update access for authenticated users" ON contact_messages
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Realtime: let the admin sidebar badge update live on INSERT/UPDATE.
-- (Safe to run even if the table is already in the publication — it errors only
--  if already added; wrap in a DO block to ignore that.)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE contact_messages;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
