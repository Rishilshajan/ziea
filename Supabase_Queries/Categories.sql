-- 1. Create the categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Allow anyone to read categories
CREATE POLICY "Allow public read access on categories" 
    ON public.categories
    FOR SELECT 
    USING (true);

-- Allow admins to manage categories
CREATE POLICY "Allow admins full access on categories" 
    ON public.categories
    FOR ALL 
    USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role = 'Admin'
        )
    );

-- 4. Seed the table with existing data
INSERT INTO public.categories (name, image_url) VALUES 
('Nightwear', 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&q=80'),
('Loungewear', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'),
('Accessories', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80'),
('Home', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80');
