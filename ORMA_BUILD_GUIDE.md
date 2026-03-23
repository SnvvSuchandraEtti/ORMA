

# ORMA — Complete Build Guide & AI Prompts Document
## One-Place Rental Marketplace Application
### Full Step-by-Step Development Manual

---

## TABLE OF CONTENTS

```
SECTION 1:  PRE-WORK — Accounts, Tools & Preparation
SECTION 2:  PROJECT INITIALIZATION
SECTION 3:  SUPABASE DATABASE SETUP (Complete)
SECTION 4:  PROJECT CONFIGURATION FILES
SECTION 5:  SUPABASE CLIENT & TYPE DEFINITIONS
SECTION 6:  AUTHENTICATION SYSTEM (Complete)
SECTION 7:  LAYOUT — Navbar, CategoryBar, Footer
SECTION 8:  HOME PAGE — Listing Cards Grid
SECTION 9:  LISTING DETAIL PAGE
SECTION 10: CREATE LISTING — Multi-Step Form
SECTION 11: USER PROFILE & DASHBOARD
SECTION 12: WISHLIST PAGE
SECTION 13: SEARCH & FILTERS
SECTION 14: SEED DATA — Sample Listings
SECTION 15: POLISH, RESPONSIVENESS & UX
SECTION 16: DEPLOYMENT TO VERCEL
SECTION 17: CUSTOM DOMAIN SETUP
SECTION 18: POST-LAUNCH CHECKLIST
SECTION 19: TROUBLESHOOTING COMMON ISSUES
SECTION 20: EMERGENCY SHORTCUTS
```

---
---

## SECTION 1: PRE-WORK — ACCOUNTS, TOOLS & PREPARATION

---

### 1.1 CREATE ALL REQUIRED ACCOUNTS

Before you write any code, create these accounts. This should be done the night before or first thing in the morning.

#### Account 1: GitHub
```
URL: https://github.com
Purpose: Version control and connecting to Vercel for deployment
Action: If you don't have an account, create one now
```

#### Account 2: Supabase
```
URL: https://supabase.com
Purpose: Database, Authentication, File Storage, and APIs — all in one
Action: Sign up using your GitHub account (easiest method)
Free tier includes:
  - 500 MB database storage
  - 1 GB file storage
  - 50,000 monthly active users for auth
  - Unlimited API requests
This is more than enough for your project
```

#### Account 3: Vercel
```
URL: https://vercel.com
Purpose: Hosting your Next.js website for free
Action: Sign up using your GitHub account
Free tier includes:
  - Unlimited websites
  - Free SSL certificate
  - Automatic deployments from GitHub
  - Custom domain support
```

#### Account 4: Google Cloud Console (For Google OAuth Login)
```
URL: https://console.cloud.google.com
Purpose: To allow users to sign in with their Google account
Action: 
  Step 1: Go to console.cloud.google.com
  Step 2: Create a new project — name it "ORMA"
  Step 3: In the left sidebar, go to "APIs & Services" → "OAuth consent screen"
  Step 4: Choose "External" user type
  Step 5: Fill in:
    - App name: ORMA
    - User support email: your email
    - Developer contact email: your email
  Step 6: Click "Save and Continue" through all steps
  Step 7: Go to "APIs & Services" → "Credentials"
  Step 8: Click "Create Credentials" → "OAuth 2.0 Client IDs"
  Step 9: Application type: "Web application"
  Step 10: Name: "ORMA Web"
  Step 11: Authorized redirect URIs — Add these:
    - http://localhost:3000/auth/callback
    - https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback
    (You'll get the Supabase URL after creating the Supabase project)
  Step 12: Click "Create"
  Step 13: COPY and SAVE the "Client ID" and "Client Secret" — you'll need these
```

#### Account 5: Unsplash (Optional but recommended)
```
URL: https://unsplash.com
Purpose: Free high-quality stock images for sample/seed data
Action: No account needed for downloading images
Prepare: Download 30-40 images across categories:
  - 4 car images
  - 4 bike/motorcycle images
  - 4 camera images
  - 4 laptop images
  - 3 phone images
  - 4 furniture images
  - 3 appliance images
  - 2 gaming console images
  - 2 tool images
  - Save them in a folder called "orma-sample-images" on your desktop
```

---

### 1.2 INSTALL REQUIRED SOFTWARE

Make sure these are installed on your computer:

```
1. Node.js (version 18 or higher)
   Download: https://nodejs.org
   Verify: Open terminal → type "node --version" → should show v18.x.x or higher

2. npm (comes with Node.js)
   Verify: Open terminal → type "npm --version"

3. Git
   Download: https://git-scm.com
   Verify: Open terminal → type "git --version"

4. Visual Studio Code or your preferred code editor
   Download: https://code.visualstudio.com
   
5. Anti-Gravity IDE (your AI IDE)
   Make sure it's installed and ready to use

6. A modern web browser (Chrome recommended for DevTools)
```

---

### 1.3 PREPARE YOUR WORKSPACE

```
1. Create a dedicated folder for the project:
   - On Mac/Linux: mkdir ~/projects/orma
   - On Windows: Create a folder C:\projects\orma

2. Open your terminal/command prompt

3. Open your AI IDE (Anti-Gravity IDE)

4. Open Claude in a browser tab — keep it ready

5. Open your browser with these tabs:
   - Tab 1: Claude (https://claude.ai)
   - Tab 2: Supabase Dashboard (https://supabase.com/dashboard)
   - Tab 3: Vercel Dashboard (https://vercel.com/dashboard)
   - Tab 4: localhost:3000 (will be used once project starts)
   - Tab 5: This guide document

6. Set your phone to Do Not Disturb mode

7. Keep water and snacks ready — it's going to be a long day!
```

---
---

## SECTION 2: PROJECT INITIALIZATION

---

### 2.1 CREATE THE NEXT.JS PROJECT

Open your terminal and run these commands one by one:

```bash
# Navigate to your projects folder
cd ~/projects

# Create a new Next.js project with all the recommended settings
npx create-next-app@latest orma --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# When prompted, answer:
# ✔ Would you like to use TypeScript? → Yes
# ✔ Would you like to use ESLint? → Yes
# ✔ Would you like to use Tailwind CSS? → Yes
# ✔ Would you like to use `src/` directory? → Yes
# ✔ Would you like to use App Router? → Yes
# ✔ Would you like to customize the default import alias? → Yes → @/*

# Navigate into the project
cd orma

# Verify the project was created correctly
ls -la src/app/
# You should see: layout.tsx, page.tsx, globals.css
```

### 2.2 INSTALL ALL REQUIRED PACKAGES

Run this single command to install everything you need:

```bash
npm install @supabase/supabase-js @supabase/ssr lucide-react date-fns zustand react-hot-toast react-dropzone
```

Here's what each package does:
```
@supabase/supabase-js    → Supabase client library (database, auth, storage)
@supabase/ssr            → Supabase helpers for server-side rendering in Next.js
lucide-react             → Beautiful icon library (free, open source)
date-fns                 → Date formatting utility (for "Member since Jan 2024" etc.)
zustand                  → Simple state management (for multi-step form, auth state)
react-hot-toast          → Beautiful toast notifications (success, error messages)
react-dropzone           → Drag-and-drop file upload component
```

### 2.3 INITIALIZE GIT AND CONNECT TO GITHUB

```bash
# Initialize git (should already be done by create-next-app)
git init

# Create a GitHub repository:
# Go to github.com → New Repository → Name: "orma" → Create

# Connect your local project to GitHub
git remote add origin https://github.com/YOUR_USERNAME/orma.git
git branch -M main
git add .
git commit -m "Initial project setup with Next.js, Tailwind, and dependencies"
git push -u origin main
```

### 2.4 VERIFY PROJECT RUNS

```bash
# Start the development server
npm run dev

# Open your browser and go to http://localhost:3000
# You should see the default Next.js welcome page
# If you see it, everything is working!

# Keep this terminal running throughout the entire build process
# Open a NEW terminal tab/window for any other commands
```

---
---

## SECTION 3: SUPABASE DATABASE SETUP (COMPLETE)

---

### 3.1 CREATE SUPABASE PROJECT

```
Step 1: Go to https://supabase.com/dashboard
Step 2: Click "New Project"
Step 3: Select your organization (or create one)
Step 4: Fill in:
  - Project Name: orma
  - Database Password: Create a strong password and SAVE IT SOMEWHERE
  - Region: Choose the closest to your location
    (If you're in India, choose "South Asia (Mumbai)" or closest available)
Step 5: Click "Create new project"
Step 6: Wait 2-3 minutes for the project to provision

Step 7: Once ready, go to Settings → API
Step 8: Copy these two values and save them:
  - Project URL: https://xxxxxxxxxxxxx.supabase.co
  - anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

SAVE THESE — you'll need them in the .env.local file
```

### 3.2 CONFIGURE AUTHENTICATION PROVIDERS

```
Step 1: In Supabase Dashboard → Authentication → Providers

Step 2: Email provider (should already be enabled):
  - Confirm email: DISABLE this for now (for faster testing)
  - This means users can sign up and immediately use the app
    without verifying their email (you can enable this later)

Step 3: Google provider:
  - Toggle ON
  - Client ID: Paste the Google OAuth Client ID you saved earlier
  - Client Secret: Paste the Google OAuth Client Secret
  - Click Save

Step 4: Go to Authentication → URL Configuration:
  - Site URL: http://localhost:3000
  - Redirect URLs: Add these:
    - http://localhost:3000/auth/callback
    - http://localhost:3000
  (You'll add your production URL here later after deployment)
```

### 3.3 CREATE ALL DATABASE TABLES

Go to Supabase Dashboard → SQL Editor → Click "New query"

Copy and paste this ENTIRE SQL script and click "Run":

```sql
-- ================================================================
-- ORMA DATABASE SCHEMA — COMPLETE
-- Run this ENTIRE script in Supabase SQL Editor
-- ================================================================

-- ================================================================
-- TABLE 1: PROFILES
-- Extends the built-in auth.users table with additional user info
-- ================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  bio TEXT DEFAULT '',
  is_verified BOOLEAN DEFAULT FALSE,
  is_owner BOOLEAN DEFAULT FALSE,
  total_listings INTEGER DEFAULT 0,
  total_reviews_received INTEGER DEFAULT 0,
  average_rating DECIMAL(2,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ================================================================
-- TABLE 2: CATEGORIES
-- All rental categories (Cars, Bikes, Cameras, etc.)
-- ================================================================
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon_name TEXT NOT NULL,
  description TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ================================================================
-- TABLE 3: LISTINGS
-- The main table — all rental items listed on ORMA
-- ================================================================
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category_id INTEGER REFERENCES categories(id) NOT NULL,
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  condition TEXT DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair')),
  brand TEXT DEFAULT '',
  model TEXT DEFAULT '',
  
  -- Images (array of URLs)
  images TEXT[] DEFAULT '{}',
  
  -- Pricing
  price_per_hour DECIMAL(10,2) DEFAULT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  price_per_week DECIMAL(10,2) DEFAULT NULL,
  price_per_month DECIMAL(10,2) DEFAULT NULL,
  security_deposit DECIMAL(10,2) DEFAULT 0,
  
  -- Location
  city TEXT NOT NULL,
  area TEXT DEFAULT '',
  state TEXT DEFAULT '',
  pincode TEXT DEFAULT '',
  full_address TEXT DEFAULT '',
  latitude DECIMAL(10,8) DEFAULT NULL,
  longitude DECIMAL(11,8) DEFAULT NULL,
  
  -- Contact
  contact_phone TEXT NOT NULL DEFAULT '',
  contact_whatsapp TEXT DEFAULT '',
  contact_email TEXT DEFAULT '',
  preferred_contact TEXT DEFAULT 'phone' CHECK (preferred_contact IN ('phone', 'whatsapp', 'email', 'all')),
  
  -- Terms & Rules
  terms_and_conditions TEXT DEFAULT '',
  id_proof_required BOOLEAN DEFAULT TRUE,
  delivery_available BOOLEAN DEFAULT FALSE,
  minimum_rental_period TEXT DEFAULT '1 day',
  maximum_rental_period TEXT DEFAULT '',
  
  -- Status & Metrics
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'rented', 'inactive', 'pending', 'rejected')),
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  
  -- Ratings (denormalized for performance)
  average_rating DECIMAL(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  available_from TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  available_until TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- ================================================================
-- TABLE 4: REVIEWS
-- Reviews left by renters on listings
-- ================================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT DEFAULT '',
  comment TEXT DEFAULT '',
  is_verified_rental BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Prevent duplicate reviews from same user on same listing
  UNIQUE(listing_id, reviewer_id)
);

-- ================================================================
-- TABLE 5: WISHLISTS
-- Saved/favorited listings by users
-- ================================================================
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Prevent duplicate wishlist entries
  UNIQUE(user_id, listing_id)
);

-- ================================================================
-- TABLE 6: INQUIRIES (Optional — for tracking contact requests)
-- ================================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ================================================================
-- INDEXES — For faster queries
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_listings_owner_id ON listings(owner_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_city ON listings(city);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_is_available ON listings(is_available);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_price_per_day ON listings(price_per_day);
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id ON reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_listing_id ON wishlists(listing_id);

-- ================================================================
-- FULL TEXT SEARCH — For searching listings by title/description
-- ================================================================
ALTER TABLE listings ADD COLUMN IF NOT EXISTS fts tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(brand, '') || ' ' || coalesce(model, '') || ' ' || coalesce(city, ''))) STORED;

CREATE INDEX IF NOT EXISTS idx_listings_fts ON listings USING gin(fts);

-- ================================================================
-- ROW LEVEL SECURITY (RLS) — Controls who can read/write data
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- RLS POLICIES FOR PROFILES
-- ================================================================

-- Anyone can view any profile (public profiles)
CREATE POLICY "profiles_select_all" ON profiles
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- New profile is created automatically via trigger (see below)
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ================================================================
-- RLS POLICIES FOR CATEGORIES
-- ================================================================

-- Anyone can view categories
CREATE POLICY "categories_select_all" ON categories
  FOR SELECT USING (true);

-- ================================================================
-- RLS POLICIES FOR LISTINGS
-- ================================================================

-- Anyone can view active listings
CREATE POLICY "listings_select_all" ON listings
  FOR SELECT USING (true);

-- Authenticated users can create listings
CREATE POLICY "listings_insert_authenticated" ON listings
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Users can only update their own listings
CREATE POLICY "listings_update_own" ON listings
  FOR UPDATE USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Users can only delete their own listings
CREATE POLICY "listings_delete_own" ON listings
  FOR DELETE USING (auth.uid() = owner_id);

-- ================================================================
-- RLS POLICIES FOR REVIEWS
-- ================================================================

-- Anyone can read reviews
CREATE POLICY "reviews_select_all" ON reviews
  FOR SELECT USING (true);

-- Authenticated users can create reviews (not on their own listings)
CREATE POLICY "reviews_insert_authenticated" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Users can update their own reviews
CREATE POLICY "reviews_update_own" ON reviews
  FOR UPDATE USING (auth.uid() = reviewer_id);

-- Users can delete their own reviews
CREATE POLICY "reviews_delete_own" ON reviews
  FOR DELETE USING (auth.uid() = reviewer_id);

-- ================================================================
-- RLS POLICIES FOR WISHLISTS
-- ================================================================

-- Users can only see their own wishlists
CREATE POLICY "wishlists_select_own" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);

-- Users can add to their own wishlist
CREATE POLICY "wishlists_insert_own" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can remove from their own wishlist
CREATE POLICY "wishlists_delete_own" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- ================================================================
-- RLS POLICIES FOR INQUIRIES
-- ================================================================

-- Users can see inquiries they sent or received
CREATE POLICY "inquiries_select_own" ON inquiries
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = owner_id);

-- Authenticated users can create inquiries
CREATE POLICY "inquiries_insert_authenticated" ON inquiries
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ================================================================
-- FUNCTIONS & TRIGGERS
-- ================================================================

-- Function: Automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Run handle_new_user when a new auth user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Update listing's average rating when a review is added/updated/deleted
CREATE OR REPLACE FUNCTION public.update_listing_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rat DECIMAL(2,1);
  total_rev INTEGER;
  list_id UUID;
  own_id UUID;
BEGIN
  -- Determine which listing_id to update
  IF TG_OP = 'DELETE' THEN
    list_id := OLD.listing_id;
  ELSE
    list_id := NEW.listing_id;
  END IF;
  
  -- Calculate new average
  SELECT COALESCE(AVG(rating)::DECIMAL(2,1), 0), COUNT(*)
  INTO avg_rat, total_rev
  FROM reviews
  WHERE listing_id = list_id;
  
  -- Update the listing
  UPDATE listings
  SET average_rating = avg_rat,
      total_reviews = total_rev,
      updated_at = NOW()
  WHERE id = list_id;
  
  -- Get owner_id for updating profile
  SELECT owner_id INTO own_id FROM listings WHERE id = list_id;
  
  -- Update owner's profile aggregate rating
  UPDATE profiles
  SET average_rating = (
    SELECT COALESCE(AVG(l.average_rating)::DECIMAL(2,1), 0)
    FROM listings l WHERE l.owner_id = own_id AND l.total_reviews > 0
  ),
  total_reviews_received = (
    SELECT COALESCE(SUM(l.total_reviews), 0)
    FROM listings l WHERE l.owner_id = own_id
  ),
  updated_at = NOW()
  WHERE id = own_id;
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for review changes
DROP TRIGGER IF EXISTS on_review_change ON reviews;
CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_listing_rating();

-- Function: Increment views count
CREATE OR REPLACE FUNCTION public.increment_views(listing_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE listings
  SET views_count = views_count + 1
  WHERE id = listing_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Increment inquiries count
CREATE OR REPLACE FUNCTION public.increment_inquiries(listing_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE listings
  SET inquiries_count = inquiries_count + 1
  WHERE id = listing_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Update profile listing count
CREATE OR REPLACE FUNCTION public.update_profile_listing_count()
RETURNS TRIGGER AS $$
DECLARE
  own_id UUID;
BEGIN
  IF TG_OP = 'DELETE' THEN
    own_id := OLD.owner_id;
  ELSE
    own_id := NEW.owner_id;
  END IF;
  
  UPDATE profiles
  SET total_listings = (
    SELECT COUNT(*) FROM listings WHERE owner_id = own_id AND status = 'active'
  ),
  is_owner = (
    SELECT COUNT(*) > 0 FROM listings WHERE owner_id = own_id AND status = 'active'
  ),
  updated_at = NOW()
  WHERE id = own_id;
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_listing_change ON listings;
CREATE TRIGGER on_listing_change
  AFTER INSERT OR UPDATE OR DELETE ON listings
  FOR EACH ROW EXECUTE FUNCTION public.update_profile_listing_count();

-- ================================================================
-- SEED DATA: CATEGORIES
-- ================================================================
INSERT INTO categories (name, slug, icon_name, description, display_order) VALUES
  ('Cars', 'cars', 'Car', 'Rent cars for trips, events, or daily use', 1),
  ('Bikes', 'bikes', 'Bike', 'Motorcycles, scooters, and bicycles for rent', 2),
  ('Cameras', 'cameras', 'Camera', 'DSLR, mirrorless, and action cameras', 3),
  ('Laptops', 'laptops', 'Laptop', 'Laptops and notebooks for work or gaming', 4),
  ('Mobile Phones', 'mobile-phones', 'Smartphone', 'Smartphones and tablets on rent', 5),
  ('Furniture', 'furniture', 'Armchair', 'Beds, sofas, tables, chairs, and more', 6),
  ('Home Appliances', 'home-appliances', 'WashingMachine', 'AC, washing machine, fridge, and more', 7),
  ('Gaming', 'gaming', 'Gamepad2', 'Gaming consoles, VR headsets, controllers', 8),
  ('Tools & Equipment', 'tools-equipment', 'Wrench', 'Power tools, hand tools, and equipment', 9),
  ('Sports & Outdoor', 'sports-outdoor', 'Dumbbell', 'Sports gear, camping, trekking equipment', 10),
  ('Musical Instruments', 'musical-instruments', 'Music', 'Guitars, keyboards, drums, and more', 11),
  ('Event Equipment', 'event-equipment', 'PartyPopper', 'Speakers, mics, lights, decorations', 12),
  ('Books & Media', 'books-media', 'BookOpen', 'Textbooks, novels, courses, DVDs', 13),
  ('Drones', 'drones', 'Plane', 'Photography drones and FPV drones', 14),
  ('Clothing & Costumes', 'clothing-costumes', 'Shirt', 'Wedding wear, costumes, designer outfits', 15),
  ('Others', 'others', 'Package', 'Anything else you want to rent', 16)
ON CONFLICT (slug) DO NOTHING;

-- ================================================================
-- DONE! All tables, policies, functions, triggers, and seed data created.
-- ================================================================
```

### 3.4 CREATE SUPABASE STORAGE BUCKET

```
Step 1: Go to Supabase Dashboard → Storage
Step 2: Click "New bucket"
Step 3: Bucket name: listing-images
Step 4: Toggle "Public bucket" to ON
Step 5: Click "Create bucket"
```

Now go back to SQL Editor and run this policy for the storage:

```sql
-- Allow anyone to view images in the listing-images bucket
CREATE POLICY "Public Access to listing images"
ON storage.objects FOR SELECT
USING (bucket_id = 'listing-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload listing images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'listing-images' 
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own images
CREATE POLICY "Users can update own listing images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'listing-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own images
CREATE POLICY "Users can delete own listing images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'listing-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 3.5 VERIFY DATABASE SETUP

```
Step 1: Go to Supabase Dashboard → Table Editor
Step 2: You should see these tables:
  ☐ profiles
  ☐ categories (should have 16 rows of seed data)
  ☐ listings (empty for now)
  ☐ reviews (empty for now)
  ☐ wishlists (empty for now)
  ☐ inquiries (empty for now)

Step 3: Click on "categories" table
Step 4: Verify you see 16 categories (Cars, Bikes, Cameras, etc.)

Step 5: Go to Storage
Step 6: Verify "listing-images" bucket exists

If all checks pass, your database is fully ready!
```

---
---

## SECTION 4: PROJECT CONFIGURATION FILES

---

### 4.1 ENVIRONMENT VARIABLES

Create a file called `.env.local` in the ROOT of your project (same level as package.json):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here

# App Configuration
NEXT_PUBLIC_APP_NAME=ORMA
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace the values with YOUR actual Supabase URL and anon key from Section 3.1.

### 4.2 UPDATE TAILWIND CONFIG

Replace the contents of `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orma: {
          primary: '#FF385C',    // Airbnb-like coral red
          'primary-dark': '#E31C5F',
          'primary-light': '#FF5A7E',
          secondary: '#00A699',  // Teal accent
          dark: '#222222',       // Text dark
          gray: '#717171',       // Text gray
          'light-gray': '#B0B0B0',
          'super-light': '#F7F7F7', // Background light
          border: '#DDDDDD',     // Border color
          'border-light': '#EBEBEB',
          star: '#FFC107',       // Rating star color
          success: '#008A05',    // Green for success
          warning: '#C13515',    // Red for warnings
        },
      },
      fontFamily: {
        sans: ['Circular', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 6px 16px rgba(0,0,0,0.12)',
        'card-hover': '0 6px 20px rgba(0,0,0,0.2)',
        'navbar': '0 1px 0 rgba(0,0,0,0.08)',
        'search': '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        'search-hover': '0 2px 4px rgba(0,0,0,0.18)',
        'modal': '0 8px 28px rgba(0,0,0,0.28)',
        'sticky': '0 2px 8px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'card': '12px',
        'search': '32px',
        'button': '8px',
        'modal': '16px',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        'container': '1760px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

### 4.3 UPDATE GLOBAL CSS

Replace the contents of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================
   ORMA — Global Styles (Airbnb-inspired)
   ============================================ */

/* Smooth scrolling for the entire site */
html {
  scroll-behavior: smooth;
}

/* Body base styles */
body {
  color: #222222;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Remove default input styling */
input, textarea, select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Custom scrollbar for category bar */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Shimmer loading effect */
.shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal backdrop */
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Image aspect ratio container */
.aspect-card {
  aspect-ratio: 20 / 19;
}

/* Smooth image hover zoom */
.image-hover-zoom:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Custom focus styles matching Airbnb */
@layer utilities {
  .focus-orma {
    @apply focus:outline-none focus:ring-2 focus:ring-orma-primary focus:ring-offset-2;
  }
  
  .focus-orma-dark {
    @apply focus:outline-none focus:ring-2 focus:ring-orma-dark focus:ring-offset-2;
  }
}

/* Transition for all interactive elements */
button, a, input, textarea, select {
  transition: all 0.2s ease;
}

/* Toast notification overrides */
.toast-container {
  font-family: inherit !important;
}
```

---
---

## SECTION 5: SUPABASE CLIENT & TYPE DEFINITIONS

---

### 5.1 CREATE PROJECT FOLDER STRUCTURE

Create these folders in your `src/` directory:

```
src/
├── app/                    (already exists)
├── components/             (create this)
│   ├── listing-steps/      (create this)
│   └── ui/                 (create this)
├── hooks/                  (create this)
├── lib/                    (create this)
├── providers/              (create this)
├── store/                  (create this)
└── types/                  (create this)
```

Terminal commands:
```bash
mkdir -p src/components/listing-steps
mkdir -p src/components/ui
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/providers
mkdir -p src/store
mkdir -p src/types
```

### 5.2 TYPE DEFINITIONS

**🤖 AI PROMPT — Give this to Claude or Anti-Gravity IDE:**

```
I'm building ORMA, an Airbnb clone for renting everything, using Next.js 14, 
TypeScript, Tailwind CSS, and Supabase.

Create the file: src/types/index.ts

This file should contain ALL TypeScript type/interface definitions for my app.

My Supabase database has these tables:

1. profiles: id (UUID), full_name, email, avatar_url, phone, city, state, bio, 
   is_verified, is_owner, total_listings, total_reviews_received, average_rating, 
   created_at, updated_at

2. categories: id (serial), name, slug, icon_name, description, display_order, 
   is_active, created_at

3. listings: id (UUID), owner_id (FK→profiles), category_id (FK→categories), 
   title, description, condition (excellent/good/fair), brand, model, 
   images (text[]), price_per_hour, price_per_day, price_per_week, price_per_month, 
   security_deposit, city, area, state, pincode, full_address, latitude, longitude, 
   contact_phone, contact_whatsapp, contact_email, preferred_contact, 
   terms_and_conditions, id_proof_required, delivery_available, 
   minimum_rental_period, maximum_rental_period, status (active/rented/inactive/pending/rejected), 
   is_available, is_featured, views_count, inquiries_count, average_rating, 
   total_reviews, created_at, updated_at, available_from, available_until

4. reviews: id (UUID), listing_id (FK→listings), reviewer_id (FK→profiles), 
   owner_id (FK→profiles), rating (1-5), title, comment, is_verified_rental, 
   created_at, updated_at

5. wishlists: id (UUID), user_id (FK→profiles), listing_id (FK→listings), created_at

6. inquiries: id (UUID), listing_id (FK→listings), sender_id (FK→profiles), 
   owner_id (FK→profiles), message, status (sent/read/replied), created_at

Create these types:
- Profile
- Category
- Listing (with optional nested owner: Profile and category: Category)
- ListingWithDetails (Listing joined with owner Profile and Category)
- Review (with optional nested reviewer: Profile)
- WishlistItem (with nested listing: Listing)
- Inquiry
- CreateListingForm (for the multi-step form data)
- SearchFilters (for search/filter parameters)
- SortOption type

Also create a Database type that matches the Supabase schema for type-safe queries.

Export everything.
```

### 5.3 SUPABASE CLIENT SETUP

**🤖 AI PROMPT:**

```
I'm building ORMA using Next.js 14 App Router and Supabase.

Create TWO Supabase client files:

1. src/lib/supabase/client.ts — Browser/client-side Supabase client
   - Uses createBrowserClient from @supabase/ssr
   - Reads env variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Exports a function createClient() that returns the Supabase client

2. src/lib/supabase/server.ts — Server-side Supabase client (for server components)
   - Uses createServerClient from @supabase/ssr
   - Uses cookies from next/headers
   - Exports a function createClient() that returns server-side Supabase client

Also create:

3. src/lib/supabase/middleware.ts — For auth middleware
   - Creates a Supabase client that can refresh auth tokens
   - Exports updateSession function

4. src/middleware.ts (in the src root, NOT in lib) — Next.js middleware
   - Runs on every request
   - Uses the updateSession from supabase/middleware
   - Refreshes the auth session on every request
   - matcher config to exclude static files and images

Use the @supabase/ssr package (NOT @supabase/auth-helpers-nextjs which is deprecated).
Follow the latest Supabase docs for Next.js App Router.
```

### 5.4 UTILITY FUNCTIONS

**🤖 AI PROMPT:**

```
Create src/lib/utils.ts for ORMA with these utility functions:

1. formatPrice(amount: number): string
   - Formats number as Indian Rupee: ₹1,500 / ₹25,000
   - Use Intl.NumberFormat with 'en-IN' locale and 'INR' currency

2. formatDate(date: string | Date): string
   - Returns "Jan 2024", "Dec 2023" etc.
   - Use date-fns format function

3. timeAgo(date: string | Date): string
   - Returns "2 days ago", "3 months ago", "Just now"
   - Use date-fns formatDistanceToNow

4. truncateText(text: string, maxLength: number): string
   - Truncates text and adds "..." if longer than maxLength

5. generateSlug(text: string): string
   - Converts "Canon EOS R5" to "canon-eos-r5"

6. getImageUrl(path: string): string
   - If path starts with "http", return as-is
   - Otherwise, construct full Supabase storage URL

7. getInitials(name: string): string
   - "John Doe" → "JD", "Alice" → "A"

8. cn(...classes: (string | undefined | false)[]): string
   - Utility for conditionally joining class names
   - Like clsx/classnames but simple

9. getRentalPriceDisplay(listing: Listing): string
   - Returns the most relevant price display
   - "₹500/day" or "₹100/hr" or "₹5,000/month"
   - Prioritizes: per_day > per_hour > per_week > per_month

10. getConditionBadgeColor(condition: string): string
    - Returns Tailwind color class based on condition
    - "excellent" → "bg-green-100 text-green-800"
    - "good" → "bg-blue-100 text-blue-800"
    - "fair" → "bg-yellow-100 text-yellow-800"

Use TypeScript. Import types from @/types.
```

---
---

## SECTION 6: AUTHENTICATION SYSTEM (COMPLETE)

---

### 6.1 AUTH PROVIDER & CONTEXT

**🤖 AI PROMPT — This is a critical component. Give this to Claude for best results:**

```
I'm building ORMA, an Airbnb clone for renting everything.
Tech: Next.js 14 App Router, TypeScript, Supabase, Tailwind CSS.

Create a complete authentication system with these files:

FILE 1: src/providers/AuthProvider.tsx
- React Context provider that wraps the entire app
- Manages auth state: user, profile, loading, error
- On mount: Check if there's an existing session
- Listen to auth state changes (onAuthStateChange)
- When user signs in: fetch their profile from the profiles table
- Provide these values via context:
  * user (Supabase User object or null)
  * profile (Profile from our profiles table or null)  
  * isLoading (boolean)
  * isAuthenticated (boolean)
  * signInWithEmail(email, password)
  * signUpWithEmail(email, password, fullName)
  * signInWithGoogle()
  * signOut()
  * updateProfile(updates)
  * refreshProfile()
- Handle all errors gracefully with try/catch
- Use react-hot-toast for success/error notifications

FILE 2: src/hooks/useAuth.ts
- Custom hook that consumes the AuthContext
- Throws error if used outside AuthProvider
- Returns all auth values and functions

FILE 3: src/app/auth/callback/route.ts
- Next.js API route handler for OAuth callback
- Exchanges the auth code for a session
- Redirects to home page after successful auth
- Handles errors by redirecting to home with error param

FILE 4: src/components/AuthModal.tsx
- A beautiful modal popup for login/signup (NOT a separate page)
- Triggered by clicking "Log in" button in navbar
- Uses a prop 'isOpen' and 'onClose' to control visibility
- Has TWO TABS: "Log In" and "Sign Up"
- LOG IN TAB:
  * Email input with label and validation
  * Password input with show/hide toggle
  * "Log In" button (coral red, full width, rounded)
  * Loading spinner on button while processing
  * Error message display
  * "Forgot password?" link (can be non-functional for now)
  * Horizontal divider with "or" text
  * "Continue with Google" button (white bg, border, Google icon)
- SIGN UP TAB:
  * Full Name input
  * Email input
  * Phone number input (optional)
  * Password input (min 6 chars)
  * Confirm Password input
  * "Sign Up" button (coral red, full width)
  * "Continue with Google" button
- DESIGN:
  * Modal has white bg, rounded-xl corners, shadow-modal
  * Backdrop is semi-transparent black with blur
  * Close button (X icon) top-right
  * ORMA logo or title at top
  * Smooth fade-in animation
  * Responsive — full screen on mobile, centered card on desktop
  * Max-width: 568px (like Airbnb)
  * Padding: 24px

- When login/signup succeeds:
  * Close the modal
  * Show success toast: "Welcome to ORMA!"
  * Refresh the page state

- When login/signup fails:
  * Show error message below the form
  * Don't close the modal

Use Supabase client-side auth from @/lib/supabase/client.
Use the useAuth hook.
Use lucide-react for icons (X, Eye, EyeOff, Mail, Lock, User, Phone).
Use react-hot-toast for notifications.
```

### 6.2 PROTECTED ROUTE WRAPPER

**🤖 AI PROMPT:**

```
Create src/components/ProtectedRoute.tsx for ORMA.

This is a wrapper component that:
1. Checks if user is authenticated using useAuth() hook
2. If loading: shows a full-page loading spinner (centered, with ORMA logo)
3. If NOT authenticated: opens the AuthModal automatically and shows 
   a message "Please log in to access this page"
4. If authenticated: renders the children

Usage example:
<ProtectedRoute>
  <MyListingsPage />
</ProtectedRoute>

Make it a client component ("use client").
Style the loading screen nicely — centered spinner with "Loading..." text.
```

---
---

## SECTION 7: LAYOUT — NAVBAR, CATEGORY BAR, FOOTER

---

### 7.1 NAVBAR COMPONENT

**🤖 AI PROMPT — This is the most important visual component. Be very specific:**

```
I'm building ORMA, an Airbnb-clone rental marketplace. 
Tech: Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase.

Create src/components/Navbar.tsx — the main navigation bar.

This should look EXACTLY like the Airbnb navbar. Here's the exact specification:

STRUCTURE (Desktop — screen >= 768px):
┌──────────────────────────────────────────────────────────────────────┐
│  [ORMA Logo]          [Search Bar]              [List Item] [👤 ≡] │
│                                                                      │
│  Logo: "ORMA" text in coral red (#FF385C), bold, font-size ~24px    │
│  Clicking logo → navigates to home page (/)                         │
│                                                                      │
│  Search Bar: Rounded pill shape, border, centered                    │
│  Contains: "Search anything to rent" as placeholder                  │
│  Has a search icon (red circle with magnifying glass) on the right  │
│  Clicking opens expanded search (or navigates to /search)           │
│  Shadow on hover                                                     │
│                                                                      │
│  Right side:                                                         │
│  - "List Your Item" text link (font-weight: 600)                    │
│  - User menu button: hamburger icon (≡) + user avatar circle        │
│    * If logged out: generic person icon in circle                   │
│    * If logged in: user's avatar image or initials                  │
└──────────────────────────────────────────────────────────────────────┘

USER MENU DROPDOWN (when clicking the ≡/avatar button):
If NOT logged in:
  ┌─────────────────────┐
  │ Log in        (bold)│
  │ Sign up             │
  │ ─────────────────── │
  │ List your item      │
  │ How it works        │
  └─────────────────────┘

If LOGGED IN:
  ┌─────────────────────┐
  │ Profile             │
  │ My Listings         │
  │ Wishlist            │
  │ ─────────────────── │
  │ List your item      │
  │ ─────────────────── │
  │ Settings            │
  │ Log out             │
  └─────────────────────┘

STRUCTURE (Mobile — screen < 768px):
- Logo on left (smaller)
- Search bar (full width, below logo, or compact version)
- Hamburger menu on right
- User menu items in a slide-out drawer or full-screen menu

BEHAVIOR:
- Navbar is sticky (fixed at top on scroll)
- White background
- Bottom border/shadow: shadow-navbar (from tailwind config)
- Total height: ~80px on desktop, ~64px on mobile
- Max-width container centered (max-w-container from tailwind config)
- Horizontal padding: px-6 on desktop, px-4 on mobile

INTERACTIONS:
- "Log in" and "Sign up" should call a prop function `onOpenAuth()` 
  which will open the AuthModal in the parent
- "Log out" should call auth signOut
- "List your item" → navigate to /list-your-item
- "Profile" → navigate to /profile
- "My Listings" → navigate to /my-listings
- "Wishlist" → navigate to /wishlist
- Dropdown closes when clicking outside (useRef + useEffect click handler)
- Dropdown has subtle slide-down animation

TECHNICAL:
- "use client" component
- Use useAuth() hook for auth state
- Use next/navigation useRouter and usePathname
- Use lucide-react icons: Search, Menu, User, Globe, Heart, Plus
- The dropdown should close when navigating to a new page
- Use Link from next/link for navigation
- Make it fully accessible (aria labels, keyboard navigation)

Make this pixel-perfect Airbnb style. Every detail matters.
```

### 7.2 CATEGORY BAR COMPONENT

**🤖 AI PROMPT:**

```
Create src/components/CategoryBar.tsx for ORMA.

This is the horizontal scrolling category filter bar that appears 
directly below the navbar — exactly like Airbnb's category bar.

VISUAL DESIGN:
┌──────────────────────────────────────────────────────────────────────┐
│ [◄]  🚗    🏍️    📷    💻    📱    🪑    🏠    🎮    🔧    ⚽   [►] │
│      Cars  Bikes Camera Laptop Phone Furn  Appl  Gaming Tools Sports │
│      ───                                                              │
│ (underline under active category)                                     │
│                                                                       │
│                          [Toggle: Display total price ○]              │
└──────────────────────────────────────────────────────────────────────┘

SPECIFICATIONS:
- Sticky below navbar (top: ~80px on desktop, ~64px on mobile)
- White background
- Bottom border shadow
- Height: ~80px

CATEGORY ITEMS:
- Each category shows: Icon (from Lucide React) + Label text below
- Default state: Gray icon (#717171), gray text
- Active/selected state: Black icon, black text, 2px black underline
- Hover state: Slightly darker gray
- Categories come from the 'categories' table in Supabase
- Fetch categories on component mount
- If no category is selected, show "All" as default

SCROLL BEHAVIOR:
- Horizontal scrolling container (overflow-x: auto, hide scrollbar)
- Left arrow button: Only visible when scrolled right (not at start)
- Right arrow button: Only visible when NOT at the end
- Arrow buttons: White circular buttons with shadow, positioned at edges
- Smooth scroll on arrow click (scrollBy with behavior: 'smooth')
- Touch/swipe scrolling on mobile

"DISPLAY TOTAL PRICE" TOGGLE:
- On the far right side of the bar
- Toggle switch with label "Display total price"
- When ON: Listing cards show total price including all fees
- When OFF: Show base price per day
- This is a visual toggle — for ORMA, it can be cosmetic or 
  actually toggle between showing per-day vs per-month price
- Has a thin left border separating it from categories

TECHNICAL:
- "use client" component
- Accept props:
  * selectedCategory: string | null
  * onCategoryChange: (slug: string | null) => void
- Fetch categories from Supabase on mount using useEffect
- Use lucide-react for icons — dynamically render icon by icon_name
  (Create a helper function that maps icon_name string to Lucide component)
- Use useRef for the scroll container to control scroll position
- Use useState for scroll arrow visibility
- Add scroll event listener to show/hide arrows
- Clicking a category that's already selected should DESELECT it 
  (set to null, showing all listings)

ICON MAPPING:
Create a helper object or function that maps category icon_name strings 
to actual Lucide React components:
  "Car" → <Car />
  "Bike" → <Bike />
  "Camera" → <Camera />
  "Laptop" → <Laptop />
  "Smartphone" → <Smartphone />
  "Armchair" → <Armchair />
  "WashingMachine" → <WashingMachine />
  "Gamepad2" → <Gamepad2 />
  "Wrench" → <Wrench />
  "Dumbbell" → <Dumbbell />
  "Music" → <Music />
  "PartyPopper" → <PartyPopper />
  "BookOpen" → <BookOpen />
  "Plane" → <Plane />
  "Shirt" → <Shirt />
  "Package" → <Package />

Make this responsive and smooth. The scroll should feel native.
```

### 7.3 FOOTER COMPONENT

**🤖 AI PROMPT:**

```
Create src/components/Footer.tsx for ORMA.

This should look like the Airbnb footer. Here's the specification:

LAYOUT (Desktop):
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  About              Community           Renting             Support  │
│  How ORMA works     ORMA Blog           List your item      Help    │
│  Newsroom           Topics              Renter resources    Safety  │
│  Investors          Accessibility       Community forum     Contact │
│  Careers            Referrals           Responsible renting  FAQ    │
│  ORMA Luxe          Gift cards          Trust & Safety              │
│                                                                      │
│ ──────────────────────────────────────────────────────────────────── │
│                                                                      │
│  © 2025 ORMA, Inc.  ·  Privacy  ·  Terms  ·  Sitemap      🌐 EN   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

LAYOUT (Mobile):
- Single column accordion or stacked sections
- Each section header is clickable to expand/collapse

DESIGN:
- Background: #F7F7F7 (super light gray)
- Top border: 1px solid #DDDDDD
- Padding: 48px horizontal, 48px vertical
- Footer links: 14px, color #222222, no underline
- Link hover: underline
- Bottom bar: smaller text, gray color
- Max-width container centered

TECHNICAL:
- This can be a server component (no "use client" needed)
- Use Link from next/link for internal links
- Footer links can be placeholder "#" links for now — 
  just make the visual structure correct
- Use lucide-react Globe icon for the language selector
```

### 7.4 ROOT LAYOUT — PUTTING IT ALL TOGETHER

**🤖 AI PROMPT:**

```
Create/update src/app/layout.tsx for ORMA.

This is the root layout that wraps every page of the application.

It should:

1. Import and apply Inter font from next/font/google 
   (closest free alternative to Airbnb's Circular font)

2. Set metadata:
   - title: "ORMA — Rent Anything, From Anyone, Anywhere"
   - description: "ORMA is a one-place rental marketplace where you can 
     find and list anything for rent — cars, bikes, cameras, laptops, 
     furniture, and more."

3. Wrap everything in:
   - AuthProvider (from @/providers/AuthProvider)
   - Toaster from react-hot-toast (for notifications)

4. Include:
   - Navbar at the top (with AuthModal integration)
   - CategoryBar below navbar
   - Main content area: <main> with proper top padding 
     (to account for sticky navbar + category bar, approximately pt-[160px])
   - Footer at the bottom

5. The AuthModal should be rendered at the layout level and controlled 
   by a state variable. The Navbar should receive a callback to open it.

6. CategoryBar's selected category should be managed here and passed 
   down, OR use URL search params to track selected category.

Make the layout responsive. On mobile, adjust padding.
Use "use client" since it needs state management.

Actually, let me reconsider — the layout should be structured as:

src/app/layout.tsx (server component):
  - HTML, body, fonts, metadata
  - Wraps children in AuthProvider
  - Wraps children in a ClientLayout component

src/components/ClientLayout.tsx (client component):
  - Contains Navbar, CategoryBar, AuthModal state
  - Contains main content area
  - Contains Footer
  - Manages the auth modal open/close state
  - Manages category bar selection

This separation keeps the root layout as a server component 
(required by Next.js) while the interactive parts are client components.
```

---
---

## SECTION 8: HOME PAGE — LISTING CARDS GRID

---

### 8.1 LISTING CARD COMPONENT

**🤖 AI PROMPT:**

```
Create src/components/ListingCard.tsx for ORMA — the main listing card 
that appears on the home page grid.

This should look EXACTLY like an Airbnb listing card.

VISUAL STRUCTURE:
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                    ♡  │  │  ← Heart/wishlist icon (top-right)
│  │                       │  │
│  │    ITEM IMAGE         │  │  ← 20:19 aspect ratio
│  │                       │  │
│  │  ◄         • • • •  ► │  │  ← Carousel dots + arrows
│  │         VERIFIED      │  │  ← Badge if owner is verified
│  └───────────────────────┘  │
│                              │
│  Hyderabad, Telangana       │  ← City, State (bold, dark)
│  Canon EOS R5 Camera        │  ← Title (gray, 1 line truncated)
│  Cameras                    │  ← Category name (light gray)
│  ₹1,500/day                │  ← Price (bold) + period
│  ★ 4.8 (23 reviews)        │  ← Rating (if has reviews)
│                              │
└─────────────────────────────┘

SPECIFICATIONS:

IMAGE CAROUSEL:
- If listing has multiple images: show dot indicators at bottom center
- Left/Right arrow buttons: Only visible on card HOVER (desktop)
- Always visible on mobile (or swipe to navigate)
- Arrows: Small white circular buttons with chevron icons, with shadow
- Clicking arrows cycles through images
- Dots: Small white/gray dots, active dot is white, inactive is gray/transparent
- Images should fill the container (object-cover)
- Rounded corners on image container: rounded-xl (12px)
- Image aspect ratio: approximately 20:19 (like Airbnb) using aspect-[20/19]

HEART/WISHLIST ICON:
- Position: absolute, top-right corner of image (top-3 right-3)
- Icon: Heart from lucide-react
- Default: White stroke, transparent fill, with subtle drop shadow
- Hover: Scale up slightly
- When wishlisted: Filled red heart (#FF385C)
- Clicking toggles wishlist (calls Supabase insert/delete on wishlists table)
- If user not logged in: Open auth modal instead
- Prevent click from navigating to listing page (stopPropagation)

VERIFIED BADGE:
- If the listing owner's is_verified is true
- Show small badge on image: "VERIFIED" 
- Positioned: bottom-left of image
- White background, bold text, small rounded pill
- Similar to Airbnb's "SUPERHOST" badge

TEXT CONTENT:
- City, State: font-semibold, text-[15px], text-orma-dark, line-clamp-1
- Title: font-normal, text-[15px], text-orma-gray, line-clamp-1
- Category: text-[14px], text-orma-light-gray
- Rating: ★ icon (filled star), rating number, "(X reviews)" in gray
  Only show if total_reviews > 0
- Price: font-semibold, text-[15px], "₹X" + "/" + "day" (or appropriate period)

CARD BEHAVIOR:
- Entire card is clickable — navigates to /listing/[id]
- Use next/link for navigation
- No visible border on the card (borderless like Airbnb)
- Subtle cursor pointer on hover
- Gap between cards in grid: 24px (gap-6)

PROPS:
interface ListingCardProps {
  listing: ListingWithDetails;  // Listing joined with owner profile and category
  isWishlisted?: boolean;
  onWishlistToggle?: (listingId: string) => void;
}

TECHNICAL:
- "use client" component
- useState for current image index
- Use Image from next/image for optimized images (with unoptimized prop if using external URLs)
- Handle missing images gracefully (show placeholder)
- Responsive text sizes

Generate the complete component with all the above features.
```

### 8.2 LISTING CARD SKELETON LOADER

**🤖 AI PROMPT:**

```
Create src/components/ListingCardSkeleton.tsx for ORMA.

This is a loading placeholder that matches the exact shape and size 
of the ListingCard component. Shown while listings are being fetched.

Structure:
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                       │  │
│  │   [shimmer rectangle] │  │  ← Same aspect ratio as image
│  │                       │  │
│  └───────────────────────┘  │
│                              │
│  [shimmer line - 60% width]  │  ← City/State placeholder
│  [shimmer line - 80% width]  │  ← Title placeholder
│  [shimmer line - 40% width]  │  ← Category placeholder
│  [shimmer line - 30% width]  │  ← Price placeholder
│                              │
└─────────────────────────────┘

- Use the .shimmer CSS class from globals.css
- Same dimensions and spacing as the real ListingCard
- Rounded corners matching the card
- No interaction needed
- Accept a 'count' prop to render multiple skeletons
- Export a SkeletonGrid component that renders X skeleton cards in the same grid layout
```

### 8.3 HOME PAGE

**🤖 AI PROMPT:**

```
Create src/app/page.tsx — the HOME PAGE for ORMA.

This is the main landing page that shows all rental listings in a grid.

BEHAVIOR:
1. On page load: Fetch listings from Supabase
   - Query: SELECT * FROM listings 
     JOIN profiles ON listings.owner_id = profiles.id
     JOIN categories ON listings.category_id = categories.id
     WHERE listings.status = 'active' AND listings.is_available = true
     ORDER BY listings.created_at DESC
     LIMIT 40
   
2. When a category is selected from CategoryBar:
   - Filter listings by category_id
   - Either re-fetch with WHERE category_id = X
   - Or filter client-side from already fetched data

3. Show loading skeletons while fetching

4. If no listings found: Show empty state
   - Illustration or icon
   - "No items available yet"
   - "Be the first to list an item!"
   - "List Your Item" button

5. Also fetch user's wishlist (if logged in) to show which items are wishlisted

LAYOUT:
- Responsive grid:
  * xl+ (1280px+): 4 columns
  * lg (1024px-1279px): 3 columns  
  * md (768px-1023px): 2 columns
  * sm/xs (below 768px): 1 column
- Gap: 24px (gap-6)
- Container: max-w-container mx-auto px-6 md:px-10 lg:px-20
- Top padding: enough to clear sticky navbar + category bar

INTEGRATION:
- This page needs to receive the selected category from CategoryBar
- Options:
  a) Use URL search params: /?category=cameras 
  b) Use a shared state (zustand store)
  c) Use the ClientLayout component to pass down
  I recommend option (a) — URL search params, because:
  - Shareable URLs
  - Browser back/forward works
  - No extra state management needed

- Use useSearchParams() from next/navigation
- When category changes in CategoryBar → update URL: router.push('/?category=cameras')
- When page loads: read ?category= from URL → filter listings

WISHLIST TOGGLE:
- When user clicks heart on a card:
  * If not logged in → open auth modal
  * If logged in → toggle wishlist in Supabase
  * Optimistic UI update (immediately toggle heart, then sync with DB)
  * Show toast: "Saved to wishlist" or "Removed from wishlist"

Generate the complete page component with all data fetching, 
filtering, loading states, empty states, and wishlist functionality.
```

---
---

## SECTION 9: LISTING DETAIL PAGE

---

### 9.1 LISTING DETAIL PAGE

**🤖 AI PROMPT — This is long and detailed. Give to Claude:**

```
Create src/app/listing/[id]/page.tsx for ORMA — the listing detail page.

This should look EXACTLY like an Airbnb listing detail page.

URL: /listing/[id] where id is the listing UUID

DATA FETCHING:
- Fetch the listing by ID from Supabase
- JOIN with profiles (owner info) and categories
- Also fetch all reviews for this listing, joined with reviewer profiles
- Also check if current user has wishlisted this listing
- Increment views_count by calling the increment_views function
- If listing not found → show 404 page or redirect to home

PAGE STRUCTURE (Desktop — two column layout):

═══════════════════════════════════════════════════════════════

SECTION 1: IMAGE GALLERY (Full Width)
─────────────────────────────────────────────────────────────
If 5+ images:
  ┌─────────────────────────┬────────────┬────────────┐
  │                         │   Image 2  │   Image 3  │
  │      Main Image         ├────────────┼────────────┤
  │                         │   Image 4  │   Image 5  │
  └─────────────────────────┴────────────┴────────────┘
  (1 large image left, 4 smaller right, in a grid)

If 1-4 images:
  Simple carousel with dots

- All images clickable → opens fullscreen gallery modal
- "Show all photos" button (bottom-right of gallery)
- Rounded corners on the gallery container
- Gap between images: 8px

═══════════════════════════════════════════════════════════════

SECTION 2: MAIN CONTENT (Two Columns below gallery)

LEFT COLUMN (58-60%):
─────────────────────────────────────────────────────────────

A) TITLE & LOCATION HEADER:
   - Item Title: Large heading (text-2xl md:text-3xl, font-semibold)
   - Location: "Hyderabad, Telangana, India"
   - Quick stats: "Category · Condition · Listed X days ago"
   - Horizontal divider

B) OWNER INFO BAR:
   ┌─────────────────────────────────────────────┐
   │  Rented by [Owner Name]                      │
   │  [Avatar]  Member since Jan 2024             │
   │            ✓ Verified · ★ 4.8 avg rating    │
   └─────────────────────────────────────────────┘
   - Owner avatar (48px circle)
   - Owner name (clickable → /user/[owner_id])
   - Member since date
   - Verified badge if applicable
   - Owner's average rating
   - Horizontal divider

C) HIGHLIGHTS (3 key features with icons):
   ┌─────────────────────────────────────────────┐
   │ 🏷️  Great price                             │
   │    This item is priced below average for     │
   │    its category                              │
   │                                              │
   │ ✓  Verified owner                            │
   │    This owner has been verified by ORMA      │
   │                                              │
   │ 📋 ID proof required                         │
   │    You'll need to show ID before renting     │
   └─────────────────────────────────────────────┘
   - Show relevant highlights based on listing data
   - Horizontal divider

D) DESCRIPTION:
   - Full description text
   - If longer than 300 chars: Show first 300 chars + "Show more" button
   - "Show more" expands to full text
   - Horizontal divider

E) WHAT'S INCLUDED / TERMS:
   - Security deposit: ₹X (or "None")
   - ID proof required: Yes/No
   - Delivery available: Yes/No
   - Minimum rental period: X days
   - Maximum rental period: X days (or "No limit")
   - Any additional terms from terms_and_conditions field
   - Displayed as a clean list with check/x icons
   - Horizontal divider

F) REVIEWS SECTION:
   - Header: "★ 4.8 · 23 reviews" (large, bold)
   - If no reviews: "No reviews yet. Be the first to review!"
   - Reviews in 2-column grid (single column on mobile)
   - Each review card:
     ┌─────────────────────────────────┐
     │  [Avatar] Reviewer Name         │
     │           Jan 2024              │
     │  ★★★★★                         │
     │  "Great condition, owner was    │
     │   very responsive..."           │
     └─────────────────────────────────┘
   - Show max 6 reviews
   - "Show all X reviews" button if more than 6
   - "Write a review" button (only for logged-in users, 
     should not be the listing owner)
   - Clicking "Write a review" opens a review modal

RIGHT COLUMN (38-40%) — STICKY SIDEBAR:
─────────────────────────────────────────────────────────────

PRICE & CONTACT CARD (position: sticky, top: 100px):
  ┌─────────────────────────────────────────────┐
  │  ₹1,500 / day                               │
  │                                              │
  │  Also available:                             │
  │  ₹200/hr · ₹8,000/week · ₹25,000/month     │
  │                                              │
  │  Security deposit: ₹5,000                   │
  │                                              │
  │  ┌─────────────────────────────────────┐    │
  │  │     📞 Contact Owner               │    │  ← Big coral button
  │  └─────────────────────────────────────┘    │
  │                                              │
  │  You won't be charged on ORMA.               │
  │  All payments happen directly between        │
  │  you and the owner.                          │
  │                                              │
  │  ─────────────────────────────────────       │
  │                                              │
  │  [♡ Save]          [↗ Share]   [⚑ Report]   │
  │                                              │
  └─────────────────────────────────────────────┘

  - Card has border, rounded-xl, shadow-card, padding 24px
  - "Contact Owner" button: Full width, coral background, white text, 
    rounded-lg, 48px height, font-semibold
  - On click: Opens CONTACT MODAL (see below)
  - "Save" toggles wishlist
  - "Share" opens native share dialog or copies link
  - "Report" shows a simple "Report submitted" toast (placeholder)

═══════════════════════════════════════════════════════════════

SECTION 3: CONTACT MODAL (src/components/ContactModal.tsx):
─────────────────────────────────────────────────────────────

Opens when "Contact Owner" is clicked:
  ┌─────────────────────────────────────────────┐
  │  ✕                     Contact Owner        │
  │                                              │
  │  [Owner Avatar]  [Owner Name]               │
  │                  Typically responds within    │
  │                  a few hours                 │
  │                                              │
  │  📞 Phone                                    │
  │  +91 98765 43210              [Call]         │
  │                                              │
  │  💬 WhatsApp                                 │
  │  +91 98765 43210         [Open WhatsApp]    │
  │                                              │
  │  📧 Email                                    │
  │  owner@email.com         [Send Email]       │
  │                                              │
  │  ─────────────────────────────────────       │
  │                                              │
  │  💡 Tips for a safe rental:                  │
  │  • Always verify the item before paying      │
  │  • Ask for a receipt                         │
  │  • Meet in a public place if possible        │
  │  • Report suspicious behavior                │
  │                                              │
  └─────────────────────────────────────────────┘

- Modal with backdrop blur
- "Call" button: Opens tel: link
- "Open WhatsApp" button: Opens wa.me link with pre-filled message
  "Hi, I'm interested in renting your [Item Title] listed on ORMA."
- "Send Email" button: Opens mailto: link
- Only show contact methods that the owner has provided
- When modal opens: Call increment_inquiries function
- If user not logged in: Show auth modal instead

═══════════════════════════════════════════════════════════════

SECTION 4: SIMILAR ITEMS (Full Width, below main content):
─────────────────────────────────────────────────────────────
- "More items you might like"
- Fetch 6 listings from the same category (excluding current listing)
- Display in horizontal scrollable row of ListingCards
- Left/right scroll arrows (like category bar)

═══════════════════════════════════════════════════════════════

SECTION 5: REVIEW MODAL (src/components/ReviewModal.tsx):
─────────────────────────────────────────────────────────────

Opens when "Write a review" is clicked:
  ┌─────────────────────────────────────────────┐
  │  ✕                   Write a Review          │
  │                                              │
  │  Rating:  ★ ★ ★ ★ ★                        │
  │  (clickable stars, select 1-5)              │
  │                                              │
  │  Title (optional):                          │
  │  [________________________]                 │
  │                                              │
  │  Your review:                               │
  │  [________________________]                 │
  │  [________________________]                 │
  │  [________________________]                 │
  │                                              │
  │  [Submit Review]                            │
  │                                              │
  └─────────────────────────────────────────────┘

- Rating is required (1-5 stars)
- Comment is required (min 10 characters)
- On submit: INSERT into reviews table
- Show success toast
- Refresh reviews list
- Prevent owner from reviewing their own listing

═══════════════════════════════════════════════════════════════

MOBILE LAYOUT:
- Single column (no sidebar)
- Image gallery as a full-width carousel
- Price card appears at the BOTTOM of the page as a fixed bar:
  ┌──────────────────────────────────────────────┐
  │  ₹1,500/day          [Contact Owner]         │
  └──────────────────────────────────────────────┘
- All sections stack vertically

Generate ALL the code for:
1. src/app/listing/[id]/page.tsx (main page)
2. src/components/ContactModal.tsx
3. src/components/ReviewModal.tsx
4. src/components/ImageGallery.tsx (gallery component with modal)

Make everything fully functional with real Supabase data.
```

---
---

## SECTION 10: CREATE LISTING — MULTI-STEP FORM

---

### 10.1 MULTI-STEP LISTING FORM

**🤖 AI PROMPT:**

```
Create the CREATE LISTING feature for ORMA — a multi-step form that 
lets users list items for rent. This should feel like Airbnb's 
"Become a Host" flow.

Route: src/app/list-your-item/page.tsx
Protected: Only accessible to logged-in users.

STEP OVERVIEW:
Step 1: Select Category
Step 2: Upload Photos  
Step 3: Item Details (Title, Description, Condition)
Step 4: Set Pricing
Step 5: Location
Step 6: Contact & Terms
Step 7: Review & Publish

OVERALL LAYOUT:
┌──────────────────────────────────────────────────────────────┐
│  [ORMA Logo]               Step 3 of 7            [✕ Exit]  │
│                                                              │
│  ████████████░░░░░░░░░░░░░░░░░░░░░░  (Progress bar)        │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │                                                    │       │
│  │              STEP CONTENT HERE                    │       │
│  │                                                    │       │
│  │                                                    │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ──────────────────────────────────────────────────────      │
│  [← Back]                                    [Next →]       │
│                                                              │
└──────────────────────────────────────────────────────────────┘

- Progress bar at top (colored bar showing completion percentage)
- Clean, centered content area (max-width: 640px)
- Back/Next buttons at bottom
- "Exit" button → confirm dialog → navigate to home
- Step number indicator

STATE MANAGEMENT:
Use a Zustand store (src/store/listingFormStore.ts) to manage form state:

interface ListingFormState {
  currentStep: number;
  formData: {
    category_id: number | null;
    category_name: string;
    images: File[];
    imageUrls: string[];  // Preview URLs for uploaded files
    title: string;
    description: string;
    condition: 'excellent' | 'good' | 'fair';
    brand: string;
    model: string;
    price_per_hour: string;
    price_per_day: string;
    price_per_week: string;
    price_per_month: string;
    security_deposit: string;
    city: string;
    area: string;
    state: string;
    pincode: string;
    contact_phone: string;
    contact_whatsapp: string;
    contact_email: string;
    preferred_contact: string;
    terms_and_conditions: string;
    id_proof_required: boolean;
    delivery_available: boolean;
    minimum_rental_period: string;
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

═══════════════════════════════════════════════════════════════

STEP 1 — SELECT CATEGORY (src/components/listing-steps/StepCategory.tsx):

  "What kind of item are you listing?"
  
  Grid of category cards (4 columns desktop, 2 columns mobile):
  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
  │   🚗       │ │   🏍️       │ │   📷       │ │   💻       │
  │   Cars     │ │   Bikes    │ │   Cameras  │ │   Laptops  │
  └────────────┘ └────────────┘ └────────────┘ └────────────┘
  
  - Each card: border, rounded-lg, padding, icon + label
  - Selected state: border-2 border-orma-dark, bg-gray-50
  - Hover state: border-orma-dark
  - Fetch categories from Supabase
  - "Next" button enabled only when a category is selected

═══════════════════════════════════════════════════════════════

STEP 2 — UPLOAD PHOTOS (src/components/listing-steps/StepPhotos.tsx):

  "Add photos of your item"
  "Items with clear, well-lit photos get rented 3x faster"
  
  - Drag & drop zone (using react-dropzone)
  - "Click to upload or drag & drop" text with upload icon
  - Accepted formats: jpg, jpeg, png, webp
  - Max file size: 5MB per image
  - Max 10 images total
  - After upload: Show preview grid of thumbnails
  - Each thumbnail has:
    * The image preview
    * "X" button to remove
    * Drag handle to reorder (optional — skip if short on time)
    * First image shows "Cover photo" badge
  - Upload files to Supabase Storage immediately on drop
    * Folder: listing-images/{user_id}/{timestamp}_{filename}
    * Store the returned public URL in imageUrls array
  - Show upload progress indicator
  - Minimum 1 photo required to proceed
  - "Next" button enabled only when at least 1 photo uploaded

═══════════════════════════════════════════════════════════════

STEP 3 — ITEM DETAILS (src/components/listing-steps/StepDetails.tsx):

  "Tell renters about your item"
  
  - Title input:
    * Label: "Item Title"
    * Placeholder: "e.g., Canon EOS R5 with 24-70mm Lens"
    * Max 100 characters
    * Character counter shown
    * Required
  
  - Description textarea:
    * Label: "Description"
    * Placeholder: "Describe your item — condition, what's included, 
      any special features..."
    * Max 1000 characters
    * Character counter shown
    * Min height: 150px
    * Required (min 20 chars)
  
  - Brand input:
    * Label: "Brand (optional)"
    * Placeholder: "e.g., Canon, Honda, Samsung"
  
  - Model input:
    * Label: "Model (optional)"
    * Placeholder: "e.g., EOS R5, Activa 6G"
  
  - Condition dropdown:
    * Label: "Item Condition"
    * Options: Excellent, Good, Fair
    * Each option with description:
      - Excellent: "Like new, minimal to no signs of use"
      - Good: "Normal wear, fully functional"
      - Fair: "Visible wear, but works properly"

═══════════════════════════════════════════════════════════════

STEP 4 — SET PRICING (src/components/listing-steps/StepPricing.tsx):

  "Set your rental price"
  "You can set different prices for different rental periods"
  
  - Price per day (REQUIRED):
    * Label: "Price per day *"
    * Input with "₹" prefix
    * Numeric input only
    * Placeholder: "500"
  
  - Price per hour (optional):
    * Label: "Price per hour"
    * Input with "₹" prefix
  
  - Price per week (optional):
    * Label: "Price per week"
    * Helper text: "Suggested: ₹X (based on daily rate × 5)"
  
  - Price per month (optional):
    * Label: "Price per month"
    * Helper text: "Suggested: ₹X (based on daily rate × 20)"
  
  - Security deposit (optional):
    * Label: "Security deposit"
    * Input with "₹" prefix
    * Helper text: "Refundable deposit collected at the start of rental"
  
  - All price inputs should:
    * Accept only numbers
    * Format with Indian number system (commas)
    * Show validation errors for invalid inputs

═══════════════════════════════════════════════════════════════

STEP 5 — LOCATION (src/components/listing-steps/StepLocation.tsx):

  "Where is your item located?"
  "Renters in your area will find your listing more easily"
  
  - City (REQUIRED):
    * Text input with autocomplete suggestions
    * Popular cities: Hyderabad, Bangalore, Mumbai, Delhi, Chennai, 
      Pune, Kolkata, Jaipur, Ahmedabad, Kochi, Vizag, Lucknow, etc.
    * Show as dropdown suggestions when typing
  
  - Area / Locality (REQUIRED):
    * Label: "Area / Locality"
    * Placeholder: "e.g., Banjara Hills, Koramangala, Andheri"
  
  - State:
    * Auto-fill based on city selection (or manual input)
  
  - Pin Code:
    * 6-digit numeric input
    * Optional

═══════════════════════════════════════════════════════════════

STEP 6 — CONTACT & TERMS (src/components/listing-steps/StepContact.tsx):

  "How should renters reach you?"
  
  CONTACT SECTION:
  - Phone number (REQUIRED):
    * Label: "Phone Number"
    * Input with "+91" prefix
    * 10-digit validation
  
  - WhatsApp number:
    * Label: "WhatsApp Number"
    * Checkbox: "Same as phone number" (auto-fills if checked)
    * Input with "+91" prefix
  
  - Email:
    * Pre-filled from user profile
    * Editable
  
  - Preferred contact method:
    * Radio buttons: Phone / WhatsApp / Email / All
  
  TERMS SECTION:
  "Set your rental terms"
  
  - ID proof required: Toggle switch (default: ON)
  - Delivery available: Toggle switch (default: OFF)
  - Minimum rental period: Dropdown (1 hour, 1 day, 1 week, 1 month)
  
  - Additional terms (textarea):
    * Label: "Additional terms & conditions"
    * Placeholder: "Any other rules or conditions for renting your item..."
    * Pre-filled suggestions user can click to add:
      "Security deposit is refundable"
      "Item must be returned in same condition"
      "Late returns will incur additional charges"
      "Renter is responsible for any damages"

═══════════════════════════════════════════════════════════════

STEP 7 — REVIEW & PUBLISH (src/components/listing-steps/StepReview.tsx):

  "Review your listing"
  "Make sure everything looks good before publishing"
  
  - Show a preview of how the listing card will look (using ListingCard component)
  
  - Summary of all entered information in organized sections:
    * Category: [Selected category]
    * Photos: [Thumbnail grid of uploaded photos]
    * Details: Title, Description, Brand, Model, Condition
    * Pricing: All set prices + security deposit
    * Location: City, Area, State, Pin Code
    * Contact: Phone, WhatsApp, Email, Preferred method
    * Terms: ID required, Delivery, Min period, Additional terms
  
  - Each section has an "Edit" button → goes back to that step
  
  - "Publish Listing" button (large, coral, full width):
    * On click:
      1. Show loading state
      2. INSERT into Supabase listings table with all form data
      3. On success:
         - Show success animation/message
         - Reset the form store
         - Redirect to the new listing page (/listing/[new_id])
         - Show toast: "🎉 Your listing is live!"
      4. On error:
         - Show error message
         - Don't navigate away
         - Allow retry
  
  - "Save as Draft" link (optional — can implement later)

═══════════════════════════════════════════════════════════════

Also create: src/store/listingFormStore.ts (Zustand store)

Generate ALL files:
1. src/app/list-your-item/page.tsx (main page with step navigation)
2. src/store/listingFormStore.ts (Zustand form state)
3. src/components/listing-steps/StepCategory.tsx
4. src/components/listing-steps/StepPhotos.tsx
5. src/components/listing-steps/StepDetails.tsx
6. src/components/listing-steps/StepPricing.tsx
7. src/components/listing-steps/StepLocation.tsx
8. src/components/listing-steps/StepContact.tsx
9. src/components/listing-steps/StepReview.tsx

All fully functional with Supabase integration, validation, 
and proper error handling. Use TypeScript throughout.
```

---
---

## SECTION 11: USER PROFILE & DASHBOARD

---

### 11.1 PROFILE AND MY LISTINGS PAGES

**🤖 AI PROMPT:**

```
Create user management pages for ORMA:

═══════════════════════════════════════════════════════════════

FILE 1: src/app/profile/page.tsx — USER'S OWN PROFILE PAGE

Protected route (must be logged in).

Layout:
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌──────────┐                                              │
│   │          │  John Doe                                     │
│   │  Avatar  │  john.doe@email.com                           │
│   │  (100px) │  📍 Hyderabad, Telangana                     │
│   │          │  📅 Member since Jan 2024                     │
│   └──────────┘  ✓ Verified                                  │
│                                                              │
│   Bio: "I have gadgets and vehicles that I love to share    │
│         with people who need them temporarily."             │
│                                                              │
│   [Edit Profile]                                            │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│   Stats:                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│   │    5     │  │   4.8    │  │    23    │                 │
│   │ Listings │  │ Avg Rating│  │ Reviews  │                 │
│   └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│   Quick Links:                                               │
│   📋 My Listings →                                          │
│   ❤️ My Wishlist →                                          │
│   🏷️ List a New Item →                                     │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│   Settings:                                                  │
│   👤 Personal Information →                                 │
│   🔒 Login & Security →                                    │
│   📱 Contact Information →                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘

EDIT PROFILE:
- When "Edit Profile" is clicked, fields become editable inline
  OR open a modal/separate section with:
  - Avatar upload (to Supabase Storage)
  - Full Name
  - Phone
  - City
  - State
  - Bio (textarea)
  - "Save" and "Cancel" buttons
  - Update profile in Supabase profiles table
  - Show success toast

═══════════════════════════════════════════════════════════════

FILE 2: src/app/my-listings/page.tsx — MY LISTINGS DASHBOARD

Protected route (must be logged in).

Layout:
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  My Listings                          [+ Create New Listing] │
│                                                              │
│  Tabs: [All (5)]  [Active (3)]  [Rented (1)]  [Inactive (1)]│
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  [Image]  Canon EOS R5 Camera                        │   │
│  │           📍 Hyderabad · Cameras                     │   │
│  │           ₹1,500/day · ★ 4.8 (12 reviews)           │   │
│  │           Status: 🟢 Active                          │   │
│  │           👁 234 views · 📩 15 inquiries              │   │
│  │                                                       │   │
│  │           [Edit]  [Mark as Rented]  [Deactivate]  [🗑]│   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  [Image]  Honda Activa 6G                            │   │
│  │           📍 Hyderabad · Bikes                       │   │
│  │           ₹400/day · ★ 4.5 (8 reviews)              │   │
│  │           Status: 🔴 Rented                          │   │
│  │           👁 189 views · 📩 22 inquiries              │   │
│  │                                                       │   │
│  │           [Edit]  [Mark as Available]  [Deactivate] [🗑]│   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  (empty state if no listings):                              │
│  "You haven't listed anything yet!"                         │
│  "Start earning by listing your items for rent."           │
│  [List Your First Item →]                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘

FUNCTIONALITY:
- Fetch all listings where owner_id = current user's ID
- Tab filtering: All, Active, Rented, Inactive
- Each listing card shows:
  * Thumbnail image
  * Title
  * Location
  * Category
  * Price
  * Rating & review count
  * Status badge (green=Active, red=Rented, gray=Inactive)
  * Views and inquiries count
- Actions:
  * Edit → Navigate to /list-your-item?edit=[id] 
    (or open edit form — can be simplified)
  * Mark as Rented / Mark as Available → Toggle status in Supabase
  * Deactivate → Set status to 'inactive'
  * Delete → Confirmation modal → DELETE from Supabase
    (also delete images from storage)
- Delete confirmation modal:
  "Are you sure you want to delete '[Item Title]'?"
  "This action cannot be undone."
  [Cancel] [Delete]
  
═══════════════════════════════════════════════════════════════

FILE 3: src/app/user/[id]/page.tsx — PUBLIC USER PROFILE

NOT protected (anyone can view).

Shows another user's public profile:
- Avatar, Name, City, Member since, Verified status, Bio
- Average rating and total reviews received
- Grid of their ACTIVE listings (using ListingCard components)
- "No active listings" if none

This page is shown when clicking on an owner's name on a listing page.

═══════════════════════════════════════════════════════════════

Generate all three page files with complete Supabase integration,
loading states, empty states, and proper error handling.
Use Tailwind CSS for all styling. Make responsive.
```

---
---

## SECTION 12: WISHLIST PAGE

---

**🤖 AI PROMPT:**

```
Create src/app/wishlist/page.tsx for ORMA.

Protected route — must be logged in.

This page shows all items the user has saved/wishlisted.

LAYOUT:
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Your Wishlist                                    (X items)  │
│                                                              │
│  [Grid of ListingCard components — same as home page]       │
│                                                              │
│  Each card has the heart icon filled (red) since it's saved │
│  Clicking the heart removes it from wishlist                │
│                                                              │
│  (empty state if no saved items):                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  ❤️                                   │   │
│  │     No saved items yet                               │   │
│  │     Start exploring and save items you               │   │
│  │     are interested in renting!                       │   │
│  │                                                       │   │
│  │     [Explore Items →]                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘

DATA FETCHING:
- Query wishlists table WHERE user_id = current user
- JOIN with listings table to get listing details
- JOIN with profiles to get owner info
- JOIN with categories to get category info
- Filter: Only show active listings (the listing might have been deactivated)
- Order by: Most recently saved first

FUNCTIONALITY:
- Remove from wishlist: DELETE from wishlists table
- Optimistic UI update (remove card immediately, then sync with DB)
- Show toast: "Removed from wishlist"
- When list becomes empty, show empty state

Use the ListingCard component with isWishlisted={true}.
Grid layout same as home page.
```

---
---

## SECTION 13: SEARCH & FILTERS

---

**🤖 AI PROMPT:**

```
Build the complete SEARCH & FILTER system for ORMA.

═══════════════════════════════════════════════════════════════

FILE 1: src/app/search/page.tsx — SEARCH RESULTS PAGE

URL: /search?q=camera&category=cameras&city=hyderabad&minPrice=100&maxPrice=5000&sort=price_asc

LAYOUT:
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [Filters Button]  "X results for 'camera'"   [Sort ▾]     │
│                                                              │
│  Active Filters: [Cameras ✕] [Hyderabad ✕] [₹100-₹5000 ✕] │
│  [Clear all filters]                                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Grid of ListingCard components]                    │    │
│  │                                                       │    │
│  │   Card  Card  Card  Card                             │    │
│  │   Card  Card  Card  Card                             │    │
│  │   Card  Card  Card  Card                             │    │
│  │                                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  [Load More] or [Showing X of Y results]                    │
│                                                              │
│  (empty state if no results):                               │
│  "No items found matching your search"                      │
│  "Try adjusting your filters or search terms"              │
│  [Clear Filters] [Browse All Items]                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘

DATA FETCHING (Supabase query):
- Read search params from URL
- Build dynamic query:
  * Text search: Use the fts (full text search) column
    .textSearch('fts', searchQuery)  
    OR use .ilike('title', `%${query}%`) for simpler approach
  * Category filter: .eq('category_id', categoryId)
  * City filter: .ilike('city', `%${city}%`)
  * Price range: .gte('price_per_day', minPrice).lte('price_per_day', maxPrice)
  * Status: Always filter .eq('status', 'active')
  * Availability: .eq('is_available', true)
  * Sort:
    - "newest" → .order('created_at', { ascending: false })
    - "price_asc" → .order('price_per_day', { ascending: true })
    - "price_desc" → .order('price_per_day', { ascending: false })
    - "rating" → .order('average_rating', { ascending: false })
  * Pagination: .range(0, 19) for first 20 results

═══════════════════════════════════════════════════════════════

FILE 2: src/components/SearchBar.tsx — ENHANCED SEARCH BAR

This replaces or enhances the simple search bar in the Navbar.

DESKTOP BEHAVIOR:
When the search bar in Navbar is clicked, it expands into a detailed search:

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  What?           │  Where?         │  🔍           │     │
│  │  [Search items]  │  [City name]    │  [Search]     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Popular searches: Camera, Laptop, Bike, Car, PS5           │
│                                                              │
└──────────────────────────────────────────────────────────────┘

- Two input fields: search query and city/location
- Red search button
- Popular searches shown below as clickable chips
- On search: Navigate to /search?q=...&city=...
- On mobile: Full-screen search overlay
  * Back arrow at top
  * Full-width search input
  * City input
  * Category quick-select buttons
  * Recent searches (stored in localStorage)

═══════════════════════════════════════════════════════════════

FILE 3: src/components/FilterPanel.tsx — FILTER SIDEBAR/MODAL

On desktop: Shows as inline filter chips + sort dropdown above results
On mobile: Shows as a full-screen modal when "Filters" button is clicked

FILTERS:

1. Category (checkbox list):
   ☐ Cars
   ☐ Bikes
   ☐ Cameras
   ☐ Laptops
   ... etc.

2. Price Range:
   Min: [₹___]  Max: [₹___]
   (or a range slider component)

3. City / Location:
   [Text input with suggestions]

4. Condition:
   ☐ Excellent
   ☐ Good
   ☐ Fair

5. Availability:
   [✓] Available now only

6. Sort By:
   ○ Newest First
   ○ Price: Low to High
   ○ Price: High to Low
   ○ Top Rated

BEHAVIOR:
- Filters update URL search params
- Results update automatically when filters change
- "Clear all filters" button
- Show count of active filters
- On mobile: "Show X results" button at bottom of filter modal

═══════════════════════════════════════════════════════════════

Generate all files with complete functionality.
Use URL search params (useSearchParams, useRouter) for filter state.
Make everything responsive.
```

---
---

## SECTION 14: SEED DATA — SAMPLE LISTINGS

---

**🤖 AI PROMPT:**

```
Generate a SQL INSERT script to seed 30 sample rental listings 
into the ORMA database.

IMPORTANT: These listings need an owner_id. Since I don't have 
real users yet, I'll create test users first. Generate the SQL 
in this order:

STEP 1: I'll manually sign up 3 test users through my app, 
then get their UUIDs from the Supabase auth.users table.

STEP 2: Use those UUIDs as owner_ids in the listings.

For now, generate the INSERT statements with PLACEHOLDER 
owner_ids that I can replace:
- OWNER_1_UUID → First test user
- OWNER_2_UUID → Second test user  
- OWNER_3_UUID → Third test user

Generate 30 listings across all categories. Each listing should have:

Realistic Indian context:
- Indian cities: Hyderabad, Bangalore, Mumbai, Chennai, Pune, 
  Delhi, Jaipur, Kochi, Ahmedabad, Vizag, Lucknow, Chandigarh
- Indian pricing in INR (realistic rental rates)
- Indian phone numbers (format: +91 9XXXXXXXXX)
- Realistic item descriptions

Here are the 30 listings to generate:

CARS (category_id = 1):
1. "Maruti Swift Dzire 2022 — Well Maintained" - Hyderabad - ₹1,800/day
2. "Hyundai Creta 2023 — SUV for Road Trips" - Bangalore - ₹2,500/day
3. "Toyota Innova Crysta — 7-Seater Family Car" - Mumbai - ₹3,000/day

BIKES (category_id = 2):
4. "Royal Enfield Classic 350 — Weekend Rides" - Jaipur - ₹800/day
5. "Honda Activa 6G — City Commute Scooter" - Hyderabad - ₹300/day
6. "KTM Duke 200 — Sports Bike for Thrill Seekers" - Pune - ₹1,200/day

CAMERAS (category_id = 3):
7. "Canon EOS R5 with 24-70mm f/2.8 Lens" - Mumbai - ₹2,500/day
8. "Sony A7III — Full Frame Mirrorless Camera" - Bangalore - ₹2,000/day
9. "GoPro Hero 12 — Action Camera with Accessories" - Chennai - ₹500/day

LAPTOPS (category_id = 4):
10. "MacBook Pro 14 M3 — For Video Editing & Design" - Hyderabad - ₹1,500/day
11. "Dell XPS 15 — High Performance Windows Laptop" - Delhi - ₹1,000/day
12. "HP Pavilion Gaming Laptop — For Gaming Sessions" - Pune - ₹800/day

MOBILE PHONES (category_id = 5):
13. "iPhone 15 Pro Max — 256GB, Natural Titanium" - Mumbai - ₹800/day
14. "Samsung Galaxy S24 Ultra — For Photography" - Bangalore - ₹600/day

FURNITURE (category_id = 6):
15. "Complete Study Desk Setup — Desk + Chair" - Hyderabad - ₹200/day
16. "3-Seater Sofa Set — Premium Fabric" - Chennai - ₹350/day
17. "King Size Bed with Mattress — Guest Room Setup" - Bangalore - ₹500/day

HOME APPLIANCES (category_id = 7):
18. "Samsung 7kg Washing Machine — Fully Automatic" - Hyderabad - ₹150/day
19. "1.5 Ton Split AC — LG Dual Inverter" - Delhi - ₹300/day
20. "Samsung 253L Double Door Refrigerator" - Pune - ₹200/day

GAMING (category_id = 8):
21. "PlayStation 5 with 2 Controllers & 5 Games" - Bangalore - ₹700/day
22. "Meta Quest 3 — VR Headset with Games" - Mumbai - ₹500/day

TOOLS (category_id = 9):
23. "Bosch Professional Power Drill Set" - Hyderabad - ₹300/day
24. "Complete Home Renovation Tool Kit" - Chennai - ₹500/day

SPORTS (category_id = 10):
25. "Trek Mountain Bike — 21 Speed Gear" - Bangalore - ₹400/day
26. "Complete Camping Kit — Tent, Sleeping Bag, Stove" - Pune - ₹600/day

MUSICAL INSTRUMENTS (category_id = 11):
27. "Yamaha Acoustic Guitar with Case" - Hyderabad - ₹200/day
28. "Casio CTK-3500 Electronic Keyboard" - Chennai - ₹250/day

EVENT EQUIPMENT (category_id = 12):
29. "JBL PartyBox 310 — Bluetooth Party Speaker" - Mumbai - ₹800/day
30. "Complete DJ Setup — Controller + Speakers + Lights" - Delhi - ₹3,000/day

For EACH listing, generate:
- title
- description (2-4 sentences, realistic and engaging)
- condition (excellent/good/fair — vary it)
- brand and model
- images (use Unsplash URLs — I'll provide a mapping below)
- All 4 price tiers (hourly = daily/8, weekly = daily*5, monthly = daily*20)
- security_deposit (usually 2-5x daily rate)
- city, area (use real area names for each city), state
- contact_phone (Indian format)
- contact_whatsapp (same as phone)
- terms_and_conditions
- id_proof_required (true for expensive items)
- delivery_available (random true/false)
- minimum_rental_period
- status: 'active'
- is_available: true
- Generate some with reviews (add INSERT statements for reviews too)
- Vary created_at dates over the past 3 months

Use these Unsplash image URLs (or similar):
Cars: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'
Bikes: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
Cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'
Laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
Phones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'
Furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
Appliances: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800'
Gaming: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800'
Tools: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800'
Sports: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800'
Music: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800'
Events: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800'

Use multiple images per listing (2-4 each, use different Unsplash URLs).

Generate the complete SQL with all INSERTs.
```

---
---

## SECTION 15: POLISH, RESPONSIVENESS & UX

---

**🤖 AI PROMPT:**

```
I need to polish and finalize my ORMA application. Review and fix 
these aspects:

1. RESPONSIVE DESIGN CHECK:
   - Test all pages at these breakpoints: 
     320px, 375px, 414px, 768px, 1024px, 1280px, 1440px, 1920px
   - Fix any overflow issues
   - Fix any text truncation issues
   - Ensure touch targets are at least 44px on mobile
   - Ensure images don't break layout

2. LOADING STATES:
   - Every page should show a skeleton loader or spinner while fetching data
   - Buttons should show loading spinner when processing
   - Image should show placeholder while loading

3. ERROR STATES:
   - Network errors: "Something went wrong. Please try again."
   - 404 pages: Nice custom 404 with ORMA branding
   - Empty states: Appropriate messages with CTAs

4. TOAST NOTIFICATIONS:
   - Success: Green, bottom-right
   - Error: Red, bottom-right  
   - Info: Blue, bottom-right
   - Use react-hot-toast consistently across the app
   - Messages for:
     * Login success: "Welcome back!"
     * Signup success: "Welcome to ORMA!"
     * Listing created: "🎉 Your listing is live!"
     * Listing updated: "Listing updated successfully"
     * Listing deleted: "Listing deleted"
     * Wishlist added: "Saved to wishlist ❤️"
     * Wishlist removed: "Removed from wishlist"
     * Profile updated: "Profile updated successfully"
     * Review submitted: "Review submitted! Thank you."
     * Error: "Something went wrong. Please try again."

5. SEO & META:
   - Each page should have appropriate <title> and meta description
   - Listing detail page: Dynamic title = listing title
   - Search page: "Search results for [query] — ORMA"
   - Profile: "[User Name] — ORMA"

6. FAVICON & BRANDING:
   - Create a simple favicon (use an "O" letter in coral color)
   - Or use a simple house/rent icon
   - Add to public/favicon.ico
   - Add Open Graph meta tags for social sharing

7. 404 PAGE (src/app/not-found.tsx):
   - "Oops! This page doesn't exist."
   - ORMA logo
   - "The page you're looking for might have been removed or is temporarily unavailable."
   - [Go to Home Page] button

Generate all the code needed for these improvements.
```

---
---

## SECTION 16: DEPLOYMENT TO VERCEL

---

### Step-by-Step Deployment Process

```
STEP 1: Commit all changes to Git
─────────────────────────────────
Open terminal in project folder:

git add .
git commit -m "ORMA v1.0 — complete rental marketplace"
git push origin main


STEP 2: Deploy on Vercel
─────────────────────────
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Find and select your "orma" repository
5. Click "Import"

6. Configure project:
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: ./ (leave default)
   - Build Command: next build (leave default)
   - Output Directory: .next (leave default)

7. Environment Variables — ADD THESE:
   - Name: NEXT_PUBLIC_SUPABASE_URL
     Value: https://your-project-id.supabase.co
   
   - Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
     Value: eyJhbGciOiJIUzI... (your anon key)

8. Click "Deploy"
9. Wait 2-5 minutes for build to complete
10. If build succeeds → Your site is live!
    URL will be: https://orma-xxxxx.vercel.app

11. If build fails → Read the error log and fix issues
    Common issues:
    - TypeScript errors: Fix type issues
    - Missing env variables: Double-check you added them
    - Import errors: Check file paths


STEP 3: Update Supabase for Production
───────────────────────────────────────
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Update Site URL: https://your-vercel-url.vercel.app
3. Add Redirect URL: https://your-vercel-url.vercel.app/auth/callback
4. Save

5. Go to Google Cloud Console → OAuth Credentials
6. Add Authorized Redirect URI:
   https://your-supabase-project-id.supabase.co/auth/v1/callback
7. Add Authorized JavaScript Origin:
   https://your-vercel-url.vercel.app
8. Save


STEP 4: Test Production Site
─────────────────────────────
☐ Open production URL in browser
☐ Test home page loads with listings
☐ Test category filtering
☐ Test search functionality
☐ Test signup with email
☐ Test Google login
☐ Test create listing flow
☐ Test listing detail page
☐ Test contact modal
☐ Test on mobile device
☐ Test wishlist functionality
```

---
---

## SECTION 17: CUSTOM DOMAIN SETUP

---

```
OPTION A: Connect Your Own Domain via Vercel
──────────────────────────────────────────────

1. Vercel Dashboard → Your Project (orma) → Settings → Domains
2. Enter your domain: orma.yourdomain.com or yourdomain.com
3. Click "Add"
4. Vercel will show you DNS records to add:
   
   For subdomain (orma.yourdomain.com):
   - Type: CNAME
   - Name: orma
   - Value: cname.vercel-dns.com
   
   For root domain (yourdomain.com):
   - Type: A
   - Value: 76.76.21.21

5. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
6. Add the DNS records as instructed
7. Wait for DNS propagation (5 minutes to 48 hours, usually ~30 mins)
8. Vercel automatically provisions SSL certificate
9. Your site is now live at your custom domain!

10. IMPORTANT: Update these after domain is active:
    - Supabase → Auth → URL Configuration → Update Site URL to your domain
    - Supabase → Auth → Redirect URLs → Add your domain/auth/callback
    - Google Cloud Console → Update redirect URIs with your domain
    - Update .env.local NEXT_PUBLIC_APP_URL (for production)


OPTION B: Deploy to wasl.app
──────────────────────────────
Follow wasl.app's specific deployment instructions.
You may need to:
1. Build the project locally: npm run build
2. Upload the build output
3. Or point wasl.app to your Vercel deployment
4. Configure DNS as instructed by wasl.app
```

---
---

## SECTION 18: POST-LAUNCH CHECKLIST

---

```
FUNCTIONALITY TESTING:
☐ Home page loads properly with all listings
☐ Category bar scrolling works smoothly
☐ Clicking a category filters listings correctly
☐ Clicking a listing card opens detail page
☐ Detail page shows all information correctly
☐ Image gallery works (carousel, fullscreen)
☐ "Contact Owner" shows contact modal with phone/whatsapp
☐ WhatsApp link opens correctly on mobile
☐ Phone link initiates call on mobile
☐ User can sign up with email
☐ User can log in with email
☐ Google login works
☐ User can log out
☐ User can update profile
☐ User can create a new listing (all 7 steps)
☐ Photo upload works in create listing
☐ New listing appears on home page
☐ User can edit their listing
☐ User can delete their listing
☐ User can mark listing as rented/available
☐ Wishlist save/unsave works
☐ Wishlist page shows saved items
☐ Search by text works
☐ Search filters work (category, city, price range)
☐ Reviews can be submitted
☐ Reviews appear on listing detail page
☐ Public user profile page works

MOBILE TESTING:
☐ All pages look good on mobile (test on real phone)
☐ Navigation works on mobile
☐ Touch gestures work (swipe image carousel)
☐ Forms are easy to fill on mobile
☐ Buttons are large enough to tap
☐ No horizontal scrolling issues
☐ Mobile bottom bar (if implemented) works

PERFORMANCE:
☐ Pages load within 3 seconds
☐ Images are optimized (not too large)
☐ No console errors in browser DevTools
☐ No network errors in DevTools

CONTENT:
☐ Sample/seed data is loaded
☐ Categories show correct icons
☐ Prices display in ₹ format correctly
☐ Dates format correctly
☐ No placeholder/lorem ipsum text visible
```

---
---

## SECTION 19: TROUBLESHOOTING COMMON ISSUES

---

```
ISSUE: "Module not found" errors
─────────────────────────────────
FIX: Check import paths. Use @/ prefix for src/ imports.
Example: import { supabase } from '@/lib/supabase/client'
Run: npm install (to ensure all packages are installed)


ISSUE: Supabase "permission denied" or RLS errors
──────────────────────────────────────────────────
FIX: Check RLS policies are created correctly.
Go to Supabase → Table Editor → Click on table → 
RLS tab → verify policies exist.
Quick fix: Temporarily disable RLS for testing:
ALTER TABLE listings DISABLE ROW LEVEL SECURITY;
(Re-enable before deploying to production!)


ISSUE: Google login not working
─────────────────────────────────
FIX: 
1. Check Google OAuth credentials are correct in Supabase
2. Check redirect URIs match in Google Cloud Console
3. Ensure OAuth consent screen is configured
4. Check browser console for specific error


ISSUE: Images not uploading to Supabase Storage
────────────────────────────────────────────────
FIX:
1. Check storage bucket exists and is public
2. Check storage policies are created
3. Check file size (max 50MB on free tier)
4. Check CORS settings in Supabase


ISSUE: Vercel build fails
──────────────────────────
FIX:
1. Read the build log carefully
2. Most common: TypeScript errors
   - Run `npm run build` locally first
   - Fix any TypeScript errors
3. Missing environment variables
   - Add all env vars in Vercel project settings
4. Case-sensitive imports (Linux/Vercel is case-sensitive, Mac is not)
   - Check all file names match import paths exactly


ISSUE: Page shows "Loading..." forever
───────────────────────────────────────
FIX:
1. Check browser DevTools → Console for errors
2. Check Network tab for failed API calls
3. Verify Supabase URL and anon key are correct
4. Check if data exists in the table


ISSUE: Auth state not persisting (user logs out on page refresh)
────────────────────────────────────────────────────────────────
FIX:
1. Ensure middleware.ts is set up correctly
2. Check that createServerClient is configured properly
3. Verify cookies are being set correctly


ISSUE: Styles look different in production vs development
─────────────────────────────────────────────────────────
FIX:
1. Clear browser cache
2. Check Tailwind purging isn't removing needed classes
3. Ensure all dynamic class names are complete strings 
   (not constructed with template literals)
   BAD: `text-${color}-500`  
   GOOD: color === 'red' ? 'text-red-500' : 'text-blue-500'
```

---
---

## SECTION 20: EMERGENCY SHORTCUTS

---

If you're running out of time, here's what to cut and what to keep:

```
═══════════════════════════════════════════════════════════════
ABSOLUTE MINIMUM — Must ship with these (6 hours):
═══════════════════════════════════════════════════════════════

1. ✅ Home page with listing card grid
2. ✅ Category bar with filtering  
3. ✅ Listing detail page with contact info
4. ✅ Email login/signup (skip Google OAuth)
5. ✅ Simple single-page create listing form (skip multi-step)
6. ✅ Seed data (30 sample listings)
7. ✅ Deployed to Vercel

═══════════════════════════════════════════════════════════════
GOOD VERSION — Ship with these if possible (10 hours):
═══════════════════════════════════════════════════════════════

Everything above PLUS:
8. ✅ Google OAuth login
9. ✅ Multi-step create listing form
10. ✅ User profile page
11. ✅ My listings dashboard
12. ✅ Wishlist functionality
13. ✅ Contact modal with WhatsApp link

═══════════════════════════════════════════════════════════════
FULL VERSION — Ship with everything (14+ hours):
═══════════════════════════════════════════════════════════════

Everything above PLUS:
14. ✅ Search page with filters
15. ✅ Reviews system
16. ✅ Public user profiles
17. ✅ Image gallery with fullscreen
18. ✅ All polish items (loading states, error states, etc.)
19. ✅ Custom domain

═══════════════════════════════════════════════════════════════
SIMPLIFICATION SHORTCUTS:
═══════════════════════════════════════════════════════════════

Instead of multi-step form → Use a single long form on one page
Instead of image carousel on cards → Show just the first image
Instead of image upload to storage → Accept image URL input
Instead of real-time search → Simple category + city filter
Instead of review system → Static "No reviews yet" placeholder
Instead of wishlist → Just show listings without save button
Instead of Google OAuth → Email/password only
Instead of separate search page → Filter on home page itself
Instead of custom Navbar → Simple header with logo and links
```

---
---

## QUICK REFERENCE: ALL FILES TO CREATE

```
src/
├── app/
│   ├── layout.tsx                          ← Root layout
│   ├── page.tsx                            ← Home page
│   ├── globals.css                         ← Global styles (updated)
│   ├── not-found.tsx                       ← Custom 404 page
│   ├── listing/
│   │   └── [id]/
│   │       └── page.tsx                    ← Listing detail page
│   ├── list-your-item/
│   │   └── page.tsx                        ← Create listing (multi-step)
│   ├── search/
│   │   └── page.tsx                        ← Search results + filters
│   ├── profile/
│   │   └── page.tsx                        ← User's own profile
│   ├── my-listings/
│   │   └── page.tsx                        ← Manage user's listings
│   ├── wishlist/
│   │   └── page.tsx                        ← Saved items
│   ├── user/
│   │   └── [id]/
│   │       └── page.tsx                    ← Public user profile
│   └── auth/
│       └── callback/
│           └── route.ts                    ← OAuth callback handler
│
├── components/
│   ├── Navbar.tsx                          ← Main navigation bar
│   ├── CategoryBar.tsx                     ← Horizontal category filter
│   ├── Footer.tsx                          ← Site footer
│   ├── ClientLayout.tsx                    ← Client-side layout wrapper
│   ├── ListingCard.tsx                     ← Rental item card
│   ├── ListingCardSkeleton.tsx             ← Loading skeleton
│   ├── AuthModal.tsx                       ← Login/Signup popup
│   ├── ContactModal.tsx                    ← Owner contact details popup
│   ├── ReviewModal.tsx                     ← Write review popup
│   ├── ImageGallery.tsx                    ← Image viewer with fullscreen
│   ├── SearchBar.tsx                       ← Enhanced search component
│   ├── FilterPanel.tsx                     ← Search filters
│   ├── ProtectedRoute.tsx                  ← Auth guard wrapper
│   ├── ui/                                 ← Reusable UI components
│   │   ├── Button.tsx                      ← Styled button
│   │   ├── Input.tsx                       ← Styled input
│   │   ├── Modal.tsx                       ← Reusable modal
│   │   └── Spinner.tsx                     ← Loading spinner
│   └── listing-steps/                      ← Create listing steps
│       ├── StepCategory.tsx
│       ├── StepPhotos.tsx
│       ├── StepDetails.tsx
│       ├── StepPricing.tsx
│       ├── StepLocation.tsx
│       ├── StepContact.tsx
│       └── StepReview.tsx
│
├── providers/
│   └── AuthProvider.tsx                    ← Auth context provider
│
├── hooks/
│   ├── useAuth.ts                          ← Auth hook
│   └── useListings.ts                      ← Listings data hook (optional)
│
├── store/
│   └── listingFormStore.ts                 ← Zustand store for form
│
├── lib/
│   ├── utils.ts                            ← Utility functions
│   └── supabase/
│       ├── client.ts                       ← Browser Supabase client
│       ├── server.ts                       ← Server Supabase client
│       └── middleware.ts                   ← Auth middleware helper
│
├── types/
│   └── index.ts                            ← TypeScript type definitions
│
└── middleware.ts                            ← Next.js auth middleware

Other files (root level):
├── .env.local                              ← Environment variables
├── tailwind.config.ts                      ← Tailwind configuration
├── package.json                            ← Dependencies
└── tsconfig.json                           ← TypeScript config
```

---
---

## FINAL NOTE

```
This document contains EVERYTHING you need to build ORMA in one day.

The prompts are designed to be given directly to AI tools 
(Claude, Anti-Gravity IDE, GPT, Copilot) and they will generate 
complete, functional code.

WORKFLOW:
1. Read the section
2. Copy the AI prompt
3. Paste into your AI tool
4. Get the generated code
5. Paste into your project files
6. Run `npm run dev` to test
7. Fix any issues (ask AI to fix errors)
8. Commit to git
9. Move to next section
10. Repeat until done

REMEMBER:
- Test frequently (after every major component)
- Commit to git often (save your progress)
- If stuck on something for more than 15 minutes, 
  simplify it or skip it
- The goal is a WORKING website, not a perfect one
- You can always improve it later

Good luck! Build ORMA today! 🚀
```

---

**END OF DOCUMENT**