-- Create the activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    type TEXT NOT NULL, -- e.g., 'Customer Registration', 'Customer Login', 'Category Added'
    description TEXT NOT NULL, -- e.g., 'Customer John Doe logged in'
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (e.g. for registration/login before session is fully established, or server-side actions)
-- In a real production app, we would restrict this to authenticated users or service roles.
-- For this prototype, we'll allow insert from anywhere, and select from authenticated users.
CREATE POLICY "Enable insert access for all users" ON activity_logs
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view logs (Admins usually)
CREATE POLICY "Enable read access for authenticated users" ON activity_logs
    FOR SELECT TO authenticated USING (true);

-- Function to automatically log new customer registrations
CREATE OR REPLACE FUNCTION public.log_user_registration_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_logs (user_id, type, description)
  VALUES (
    NEW.id,
    'Customer Registration',
    'New customer ' || trim(COALESCE(NEW.first_name, '') || ' ' || COALESCE(NEW.last_name, '')) || ' registered'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute the logging function when a new user is inserted into public.users
CREATE OR REPLACE TRIGGER on_public_user_created_log_activity
  AFTER INSERT ON public.users
  FOR EACH ROW EXECUTE PROCEDURE public.log_user_registration_activity();
