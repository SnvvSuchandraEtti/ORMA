

# 🎉 All Code is Generated! Here's What To Do Next

Your code is ready. Now you need to **connect everything, test, fix, and deploy**. Follow this exact sequence:

---

## STEP 1: SET UP SUPABASE PROJECT (15 mins)

```
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: orma
4. Set database password (SAVE IT)
5. Region: Choose closest to you
6. Click "Create new project"
7. Wait 2-3 minutes

8. Once ready, go to Settings → API
9. COPY these two values:
   - Project URL:  https://xxxxxxxxxx.supabase.co
   - anon public key:  eyJhbGciOiJIUzI1NiIs...
```

---

## STEP 2: UPDATE YOUR .env.local FILE (2 mins)

Open `.env.local` in your project and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_ACTUAL_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

---

## STEP 3: RUN THE DATABASE SCHEMA SQL (10 mins)

```
1. Go to Supabase Dashboard → SQL Editor
2. Click "New query"
3. Open your schema.sql file that Anti-Gravity generated
4. Copy the ENTIRE contents
5. Paste into the SQL Editor
6. Click "Run"
7. Wait for it to complete (should see "Success")

VERIFY:
8. Go to Table Editor
9. You should see these tables:
   ☐ profiles
   ☐ categories (should have 16 rows)
   ☐ listings (empty)
   ☐ reviews (empty)
   ☐ wishlists (empty)
   ☐ inquiries (empty)

If you see errors, read the error message carefully.
Common fix: Run the SQL in parts — tables first, 
then policies, then functions, then seed data.
```

---

## STEP 4: CREATE STORAGE BUCKET (5 mins)

```
1. Supabase Dashboard → Storage
2. Click "New bucket"
3. Name: listing-images
4. Toggle "Public bucket" → ON
5. Click "Create bucket"

6. Go back to SQL Editor
7. Run these storage policies:

CREATE POLICY "Public Access to listing images"
ON storage.objects FOR SELECT
USING (bucket_id = 'listing-images');

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'listing-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## STEP 5: CONFIGURE AUTHENTICATION (10 mins)

```
Supabase Dashboard → Authentication → Providers:

EMAIL:
1. Email provider should already be enabled
2. Go to Authentication → Settings
3. Turn OFF "Confirm email" (for easier testing)

GOOGLE (optional — do this only if you have time):
1. Go to console.cloud.google.com
2. Create OAuth 2.0 credentials
3. Get Client ID and Client Secret
4. Back in Supabase → Providers → Google → Enable
5. Paste Client ID and Secret
6. Save

URL CONFIGURATION:
1. Authentication → URL Configuration
2. Site URL: http://localhost:3000
3. Redirect URLs: Add http://localhost:3000/auth/callback
```

---

## STEP 6: TEST LOCALLY — FIRST RUN (15 mins)

```bash
# Make sure you're in the project folder
cd orma

# Start the dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

### What to expect and fix:

```
SCENARIO A — Page loads with empty state:
✅ This is CORRECT! You have no listings yet.
   The app is working. Move to Step 7 to add seed data.

SCENARIO B — Compilation errors in terminal:
❌ You need to fix these. Here's how:

Copy the EXACT error message from terminal and give it 
to Anti-Gravity IDE or Claude with this prompt:
```

**🤖 Error Fix Prompt:**

```
I'm building ORMA (Airbnb clone for rentals) with Next.js 14, 
TypeScript, Tailwind CSS, and Supabase.

I'm getting this compilation error:

[PASTE THE EXACT ERROR HERE]

The file causing the error is: [filename]

Here's the current content of that file:

[PASTE THE FILE CONTENT]

Fix this error. Give me the complete corrected file.
Do not change the overall structure or design — only fix the error.
```

### Common errors and quick fixes:

```
ERROR: "Module not found: Can't resolve '@/components/XXX'"
FIX: Check if the file exists. Check the exact file name 
     and path. File names are case-sensitive.

ERROR: "'X' is not assignable to type 'Y'"
FIX: TypeScript type mismatch. Give the error to AI to fix.

ERROR: "Cannot find module '@supabase/ssr'"
FIX: Run → npm install @supabase/ssr

ERROR: "Hydration mismatch" or "Text content mismatch"
FIX: Add "use client" to the component, or wrap dynamic 
     content in useEffect.

ERROR: "createServerClient is not a function"
FIX: Check @supabase/ssr version. Run → npm install @supabase/ssr@latest

ERROR: Image-related errors with next/image
FIX: Add domains to next.config.ts:
     images: { 
       remotePatterns: [
         { protocol: 'https', hostname: '**' }
       ],
       unoptimized: true 
     }

ERROR: "window is not defined" or "document is not defined"
FIX: The component needs "use client" directive at the top,
     and the code accessing window/document should be inside 
     useEffect.
```

---

## STEP 7: RUN SEED DATA (10 mins)

Once the app loads without errors:

```
1. First, create 2-3 test accounts through your app:
   - Open http://localhost:3000
   - Click "Log in" → "Sign Up"
   - Create accounts with test emails:
     * test1@orma.com / password123
     * test2@orma.com / password123
     * test3@orma.com / password123

2. Go to Supabase → Table Editor → profiles
3. You should see 3 profiles created
4. Copy the UUID (id) of each profile

5. Open your seed-data.sql file
6. Find and replace:
   - OWNER_1_UUID → paste first user's UUID
   - OWNER_2_UUID → paste second user's UUID
   - OWNER_3_UUID → paste third user's UUID

7. Go to Supabase → SQL Editor
8. Paste the updated seed-data.sql
9. Click "Run"

10. Go back to http://localhost:3000
11. Refresh the page
12. You should now see 30 sample listings! 🎉
```

**If you don't have a seed-data.sql file**, give this prompt to Claude:

```
Generate a SQL INSERT script for 30 sample rental listings for my 
ORMA app. The table is called "listings" with these columns:

id (UUID, auto-generated), owner_id (UUID), category_id (integer), 
title, description, condition, brand, model, 
images (text array), price_per_hour, price_per_day, price_per_week, 
price_per_month, security_deposit, city, area, state, pincode,
contact_phone, contact_whatsapp, terms_and_conditions,
id_proof_required (boolean), delivery_available (boolean),
minimum_rental_period, status (default 'active'), 
is_available (default true), created_at

Category IDs: 1=Cars, 2=Bikes, 3=Cameras, 4=Laptops, 5=Phones, 
6=Furniture, 7=Appliances, 8=Gaming, 9=Tools, 10=Sports, 
11=Music, 12=Events, 13=Books, 14=Drones, 15=Clothing, 16=Others

Use these 3 owner UUIDs (I'll replace them):
- OWNER_1_UUID
- OWNER_2_UUID  
- OWNER_3_UUID

Use Indian cities, INR pricing, Indian phone numbers.
Use Unsplash image URLs for images.
Generate 2-3 listings per category.
Make descriptions realistic and engaging.
```

---

## STEP 8: FULL TESTING CHECKLIST (20 mins)

Go through each feature and test it:

```
HOME PAGE:
☐ Page loads with listing cards
☐ Images display correctly on cards
☐ Category bar shows all 16 categories with icons
☐ Clicking a category filters the listings
☐ Clicking the same category again shows all listings
☐ Category bar scrolls horizontally
☐ Cards show price in ₹ format
☐ Cards show rating (if reviews exist)
☐ Responsive: Check on mobile size (Chrome DevTools → toggle device)

AUTHENTICATION:
☐ Click "Log in" → modal opens
☐ Sign up with new email works
☐ Log in with existing email works
☐ After login: navbar shows avatar/user menu
☐ User menu dropdown shows all options
☐ Log out works
☐ Google login works (if configured)

LISTING DETAIL:
☐ Click a listing card → detail page opens
☐ Images display correctly
☐ Owner info shows correctly
☐ Description displays
☐ Price card shows on right sidebar (desktop)
☐ Price bar shows at bottom (mobile)
☐ "Contact Owner" button opens contact modal
☐ Phone number shows in contact modal
☐ WhatsApp link opens correctly
☐ Back to home works

CREATE LISTING:
☐ Click "List Your Item" (must be logged in)
☐ Step 1: Category selection works
☐ Step 2: Photo upload works
☐ Step 3: Title and description fields work
☐ Step 4: Pricing inputs work
☐ Step 5: City and area inputs work
☐ Step 6: Contact and terms work
☐ Step 7: Review shows all entered data
☐ "Publish" creates the listing
☐ New listing appears on home page

WISHLIST:
☐ Click heart icon on a card (must be logged in)
☐ Heart turns red
☐ Go to Wishlist page → item is there
☐ Click heart again → item removed

SEARCH:
☐ Type in search bar → search page opens
☐ Results match the search query
☐ Filters work (category, city, price range)
☐ Sort options work

PROFILE:
☐ Profile page shows user info
☐ Edit profile works
☐ My Listings page shows user's listings
☐ Can toggle listing status
☐ Can delete a listing

MOBILE:
☐ Check everything above on mobile viewport
☐ Navigation menu works on mobile
☐ Forms are usable on mobile
☐ Images don't break layout
```

---

## STEP 9: FIX ANY ISSUES (30 mins)

For any issue you find during testing, use this prompt:

```
I'm testing my ORMA app (Airbnb clone for rentals). 
Next.js 14, TypeScript, Tailwind CSS, Supabase.

I found this issue:

[DESCRIBE THE ISSUE — what you expected vs what happened]

[IF THERE'S A CONSOLE ERROR, PASTE IT]

[IF IT'S A VISUAL ISSUE, DESCRIBE WHAT IT LOOKS LIKE]

The relevant file is: [filename]

Here's the current code:
[PASTE THE CODE]

Fix this issue. Give me the corrected code.
```

---

## STEP 10: DEPLOY TO VERCEL (15 mins)

```bash
# Commit everything to Git
git add .
git commit -m "ORMA v1.0 — complete and tested"
git push origin main
```

```
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your "orma" GitHub repo
4. Framework: Next.js (auto-detected)

5. ADD ENVIRONMENT VARIABLES:
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key

6. Click "Deploy"
7. Wait 3-5 minutes

8. If build SUCCEEDS → Your site is LIVE! 🎉
   URL: https://orma-xxxxx.vercel.app

9. If build FAILS → Read the error log
   Copy the error → paste to Claude → get the fix
   Push the fix → Vercel auto-redeploys
```

---

## STEP 11: UPDATE SUPABASE FOR PRODUCTION (5 mins)

```
After successful deployment:

1. Supabase → Authentication → URL Configuration
2. Change Site URL to: https://your-vercel-url.vercel.app
3. Add Redirect URL: https://your-vercel-url.vercel.app/auth/callback

4. If using Google OAuth:
   Google Cloud Console → Credentials → Edit your OAuth client
   Add redirect URI: https://your-supabase-id.supabase.co/auth/v1/callback
   Add JavaScript origin: https://your-vercel-url.vercel.app
```

---

## STEP 12: CONNECT CUSTOM DOMAIN (10 mins)

```
Vercel Dashboard → Your Project → Settings → Domains

Add your domain → Follow DNS instructions → Wait for propagation

Then update Supabase Site URL to your custom domain.
```

---

## 🏁 YOU'RE DONE!

```
Your ORMA rental marketplace is now:
✅ Built with all features
✅ Connected to a real database
✅ Has 30 sample listings
✅ Users can sign up and log in
✅ Users can create and manage listings
✅ Users can search and filter
✅ Users can contact owners via phone/WhatsApp
✅ Deployed and live on the internet
✅ Accessible on your custom domain

🎉 CONGRATULATIONS — ORMA IS LIVE! 🎉
```