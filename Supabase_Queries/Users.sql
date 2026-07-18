-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the custom users table
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL, -- Note: Store hashed passwords only if managing auth outside Supabase
    role TEXT DEFAULT 'Customer' CHECK (role IN ('Customer', 'Admin')),
    last_login_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Enable Row Level Security (RLS) on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Policy: Admins have full access to the users table
CREATE POLICY "Admins have full access"
ON public.users
FOR ALL
USING (
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin'
);

-- 5. Create a function to automatically copy users from Supabase Auth to our public.users table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_first_name TEXT;
  v_last_name TEXT;
  v_full_name TEXT;
BEGIN
  v_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', '');
  v_last_name := COALESCE(NEW.raw_user_meta_data->>'last_name', '');
  
  -- If first_name is missing (e.g. Google OAuth), try parsing full_name
  IF v_first_name = '' THEN
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '');
    IF v_full_name != '' THEN
      v_first_name := split_part(v_full_name, ' ', 1);
      v_last_name := trim(substring(v_full_name from length(v_first_name) + 2));
    END IF;
  END IF;

  INSERT INTO public.users (id, first_name, last_name, email, phone, password, role)
  VALUES (
    NEW.id,
    v_first_name,
    v_last_name,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    '', -- Supabase Auth handles the real hashed password internally
    'Customer' -- Default role
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create the trigger to execute the function when a new user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

