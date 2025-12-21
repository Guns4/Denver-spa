-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC,
    image_url TEXT,
    category TEXT
);
-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_name TEXT NOT NULL,
    client_whatsapp TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    selected_service TEXT,
    status TEXT DEFAULT 'pending'
);
-- Enable Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- Policy for services: Public can View (SELECT)
-- Drop policy if exists to avoid errors on re-run
DROP POLICY IF EXISTS "Public can view services" ON services;
CREATE POLICY "Public can view services" ON services FOR
SELECT TO public USING (true);
-- Policy for bookings: Public can Insert (INSERT)
DROP POLICY IF EXISTS "Public can create bookings" ON bookings;
CREATE POLICY "Public can create bookings" ON bookings FOR
INSERT TO public WITH CHECK (true);
-- Optional: Allow public to view their own bookings? 
-- The user only requested INSERT for bookings, but usually you might want some read access. 
-- For now I will strictly follow the request: "public bisa menginput (INSERT) bookings".