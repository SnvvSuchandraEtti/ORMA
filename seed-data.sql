-- ================================================================
-- ORMA — Seed Data (30 Sample Listings)
-- ⚠  IMPORTANT: Replace placeholder owner UUIDs with real ones.
-- 1. Sign up 3 users via the app (or Supabase Auth dashboard)
-- 2. Run this query to get their UUIDs:
--    SELECT id, email FROM auth.users;
-- 3. Replace OWNER_A, OWNER_B, OWNER_C below with real UUIDs
-- ================================================================

-- Real UUIDs (replaced from Supabase profiles table)
-- OWNER_A = Suchandra  (suchandra@gmail.com)
-- OWNER_B = Prudvi     (prudvi@gmail.com)
-- OWNER_C = Sandip     (sandip@gmail.com)

DO $$
DECLARE
  owner_a UUID := '7382e1c1-72d7-4269-a48c-14a4c456d2ed';
  owner_b UUID := '9b922684-338b-4518-9f54-99783be25459';
  owner_c UUID := '0cad79f7-e7fa-4737-93fe-990676bee0c7';

  cat_cars     INT;
  cat_bikes    INT;
  cat_cameras  INT;
  cat_laptops  INT;
  cat_phones   INT;
  cat_gaming   INT;
  cat_tools    INT;
  cat_sports   INT;
  cat_music    INT;
  cat_events   INT;
  cat_travel   INT;
  cat_furniture INT;
  cat_appli    INT;
  cat_clothing INT;
  cat_books    INT;
  cat_others   INT;

BEGIN
  SELECT id INTO cat_cars      FROM categories WHERE slug = 'cars';
  SELECT id INTO cat_bikes     FROM categories WHERE slug = 'bikes';
  SELECT id INTO cat_cameras   FROM categories WHERE slug = 'cameras';
  SELECT id INTO cat_laptops   FROM categories WHERE slug = 'laptops';
  SELECT id INTO cat_phones    FROM categories WHERE slug = 'smartphones';
  SELECT id INTO cat_gaming    FROM categories WHERE slug = 'gaming';
  SELECT id INTO cat_tools     FROM categories WHERE slug = 'tools';
  SELECT id INTO cat_sports    FROM categories WHERE slug = 'sports';
  SELECT id INTO cat_music     FROM categories WHERE slug = 'musical-instruments';
  SELECT id INTO cat_events    FROM categories WHERE slug = 'events';
  SELECT id INTO cat_travel    FROM categories WHERE slug = 'travel';
  SELECT id INTO cat_furniture FROM categories WHERE slug = 'furniture';
  SELECT id INTO cat_appli     FROM categories WHERE slug = 'appliances';
  SELECT id INTO cat_clothing  FROM categories WHERE slug = 'clothing';
  SELECT id INTO cat_books     FROM categories WHERE slug = 'books';
  SELECT id INTO cat_others    FROM categories WHERE slug = 'others';

  -- ── CARS ────────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_cars,
    'Honda City 2022 – Automatic, Full Tank',
    'Rent my well-maintained Honda City (2022, Petrol, AT). Includes full insurance. Pick-up from HSR Layout. Min 1 day, max 30 days. Valid DL + Aadhaar required.',
    'excellent', 'Honda', 'City 2022',
    ARRAY['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', 'https://images.unsplash.com/photo-1535732820275-9ffd998cac22?w=800'],
    1800, 10000, 35000, 15000, 'Bangalore', 'HSR Layout', 'Karnataka', '560102',
    '9876543210', '9876543210', 'whatsapp', TRUE, FALSE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_cars,
    'Maruti Swift 2021 – Petrol Manual, Clean',
    'Clean and well-serviced Swift. Perfect for local trips and outings. Available on weekends and weekdays. Fuel cost extra. Advance booking required.',
    'good', 'Maruti Suzuki', 'Swift 2021',
    ARRAY['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800'],
    1200, 7000, 25000, 10000, 'Mumbai', 'Andheri West', 'Maharashtra', '400053',
    '9123456789', '9123456789', 'phone', TRUE, FALSE, '1 day', 'active', TRUE
  );

  -- ── BIKES ───────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_bikes,
    'Royal Enfield Classic 350 – Road Trips Ready',
    'Beautiful RE Classic 350 BS6. Ideal for road trips. Well serviced, all accessories included. Helmet provided. Need valid 2-wheeler DL.',
    'excellent', 'Royal Enfield', 'Classic 350',
    ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1568772585407-9f217b9cd8e4?w=800'],
    800, 4500, 2000, 'Delhi', 'Malviya Nagar', 'Delhi', '110017',
    '9988776655', '9988776655', 'whatsapp', TRUE, TRUE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_bikes,
    'Honda Activa 6G – City Commuter',
    'Honda Activa 6G, ideal for daily city commuting. Fully serviced, good mileage. Pick-up from Koramangala. No smoking.',
    'good', 'Honda', 'Activa 6G',
    ARRAY['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800'],
    300, 1700, 1000, 'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '9876543210', '9876543210', 'phone', TRUE, FALSE, '1 day', 'active', TRUE
  );

  -- ── CAMERAS ─────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_cameras,
    'Sony A7 III Full Frame Mirrorless + 3 Lenses',
    'Professional Sony A7 III with 28-70mm kit, 50mm f/1.8, and 85mm f/1.4 lenses. Extra batteries, memory cards, and carrying case included. Perfect for events/portraits.',
    'excellent', 'Sony', 'Alpha A7 III',
    ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1587802247818-5d2a57ef5fe6?w=800'],
    2500, 14000, 20000, 'Hyderabad', 'Banjara Hills', 'Telangana', '500034',
    '9123456789', '9123456789', 'whatsapp', TRUE, TRUE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_cameras,
    'Canon EOS R5 with RF 24-70mm Lens',
    'Canon EOS R5 — the king of hybrid shooters. 45MP stills + 8K RAW video. Comes with RF 24-70mm f/2.8 L IS USM. Ideal for professional shoots.',
    'excellent', 'Canon', 'EOS R5',
    ARRAY['https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800'],
    3500, 18000, 30000, 'Mumbai', 'Bandra West', 'Maharashtra', '400050',
    '9988776655', '9988776655', 'phone', TRUE, FALSE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_cameras,
    'GoPro Hero 11 Black + Accessories Kit',
    'GoPro Hero 11 Black with all accessories: chest mount, head mount, handlebar mount, 2 batteries, 64GB card, waterproof case. Great for adventure sports.',
    'excellent', 'GoPro', 'Hero 11 Black',
    ARRAY['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'],
    500, 5000, 'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '9876543210', '9876543210', 'whatsapp', FALSE, TRUE, '1 day', 'active', TRUE
  );

  -- ── LAPTOPS ─────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_laptops,
    'MacBook Pro M2 16" – Perfect for Work',
    '2023 MacBook Pro 16" with M2 Pro chip, 16GB RAM, 512GB SSD. Ideal for video editing, development, and design. Includes charger and sleeve.',
    'excellent', 'Apple', 'MacBook Pro 16 M2',
    ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'],
    800, 4500, 15000, 10000, 'Pune', 'Viman Nagar', 'Maharashtra', '411014',
    '9123456789', '9123456789', 'phone', TRUE, TRUE, '2 days', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_laptops,
    'ASUS ROG Strix G15 – Gaming Laptop',
    'ASUS ROG Strix G15 with RTX 3070, Ryzen 9, 32GB RAM. 165Hz display. Perfect for gaming, 3D rendering, or any GPU-heavy task.',
    'good', 'ASUS', 'ROG Strix G15',
    ARRAY['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'],
    900, 5000, 16000, 12000, 'Chennai', 'Anna Nagar', 'Tamil Nadu', '600040',
    '9988776655', '9988776655', 'whatsapp', TRUE, FALSE, '1 day', 'active', TRUE
  );

  -- ── SMARTPHONES ─────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_phones,
    'iPhone 15 Pro – Titanium, 256GB',
    'Latest iPhone 15 Pro, Titanium finish, 256GB. Comes with MagSafe charger. Available for short-term rentals. Perfect for travel or product photoshoots.',
    'excellent', 'Apple', 'iPhone 15 Pro',
    ARRAY['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'],
    500, 2800, 8000, 'Bangalore', 'Whitefield', 'Karnataka', '560066',
    '9876543210', '9876543210', 'phone', TRUE, FALSE, '1 day', 'active', TRUE
  );

  -- ── GAMING ──────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_gaming,
    'PlayStation 5 + 8 Games + 2 Controllers',
    'Sony PS5 Disc Edition with 8 top games (God of War Ragnarök, Spider-Man 2, FIFA24, etc.) and 2 DualSense controllers. Perfect for house parties.',
    'good', 'Sony', 'PlayStation 5',
    ARRAY['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', 'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=800'],
    600, 3500, 5000, 'Delhi', 'Lajpat Nagar', 'Delhi', '110024',
    '9123456789', '9123456789', 'whatsapp', FALSE, TRUE, 'Few hours', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_gaming,
    'Xbox Series X + Game Pass + 4K TV Stand Setup',
    'Xbox Series X with 1 month Game Pass, 2 controllers. Optional 55" Samsung 4K TV rental add-on. Great for LAN parties and events.',
    'excellent', 'Microsoft', 'Xbox Series X',
    ARRAY['https://images.unsplash.com/photo-1585565804112-f201f68c48b4?w=800'],
    700, 4000, 6000, 'Hyderabad', 'HITEC City', 'Telangana', '500081',
    '9988776655', '9988776655', 'phone', FALSE, TRUE, '1 day', 'active', TRUE
  );

  -- ── TOOLS ───────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_tools,
    'Bosch Power Drill + 14-Piece Bit Set',
    'Bosch GSB 16 RE impact drill with complete 14-piece drill bit set. Perfect for home renovation, installation, and DIY projects.',
    'good', 'Bosch', 'GSB 16 RE',
    ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800'],
    200, 1000, 1000, 'Mumbai', 'Dadar', 'Maharashtra', '400028',
    '9876543210', '9876543210', 'whatsapp', FALSE, TRUE, '1 day', 'active', TRUE
  );

  -- ── SPORTS ──────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_sports,
    'Yonex Badminton Set – 4 Racquets + Shuttles',
    'Kit includes 4 Yonex badminton racquets (2 intermediate, 2 beginner), 6 nylon shuttlecocks, and 1 carrying bag. Great for parks and indoor courts.',
    'good', 'Yonex', 'Badminton Set',
    ARRAY['https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800'],
    150, 700, 500, 'Bangalore', 'JP Nagar', 'Karnataka', '560078',
    '9123456789', '9123456789', 'phone', FALSE, TRUE, 'Few hours', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_sports,
    'Trek Marlin 7 Mountain Bike – 29er',
    'Trek Marlin 7 mountain bike (Small/Medium, 29" wheels). Shimano gears, hydraulic disc brakes. Great for trail riding and weekend adventures.',
    'excellent', 'Trek', 'Marlin 7',
    ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800'],
    400, 2200, 3000, 'Pune', 'Kothrud', 'Maharashtra', '411038',
    '9988776655', '9988776655', 'whatsapp', FALSE, FALSE, '1 day', 'active', TRUE
  );

  -- ── MUSICAL INSTRUMENTS ─────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_music,
    'Yamaha P-45 Digital Piano – 88 Keys Weighted',
    'Yamaha P-45 digital piano with 88 fully weighted keys. Includes sustain pedal, power adapter, and music stand. Perfect for practice, rehearsals, or events.',
    'good', 'Yamaha', 'P-45',
    ARRAY['https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800'],
    500, 2500, 3000, 'Chennai', 'T. Nagar', 'Tamil Nadu', '600017',
    '9876543210', '9876543210', 'phone', FALSE, TRUE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_music,
    'Fender Player Stratocaster + Fender Frontman Amp',
    'Fender Player Stratocaster (Surf Green) with a Fender Frontman 20G amp. Great for practice sessions, bedroom recordings, and small events.',
    'excellent', 'Fender', 'Player Stratocaster',
    ARRAY['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800', 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800'],
    600, 3000, 4000, 'Mumbai', 'Bandra East', 'Maharashtra', '400051',
    '9123456789', '9123456789', 'whatsapp', FALSE, TRUE, '1 day', 'active', TRUE
  );

  -- ── EVENTS ──────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_events,
    'PA Sound System (Mixer + 2 Speakers + Mic)',
    'Complete PA system: Yamaha MG10 mixer, 2x Mackie Thump 12 powered speakers, 2 Shure SM58 microphones, all cables. Ideal for house parties, small concerts.',
    'good', 'Yamaha + Mackie', 'PA Bundle',
    ARRAY['https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800'],
    1500, 8000, 5000, 'Bangalore', 'Domlur', 'Karnataka', '560071',
    '9988776655', '9988776655', 'whatsapp', FALSE, TRUE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_events,
    '300+ Piece Crockery & Cutlery Set for Events',
    'Premium crockery set: 60 dinner plates, 60 side plates, 60 glasses, complete cutlery for 60 people. White ceramic, ideal for weddings and corporate events. Delivery available.',
    'good', 'Mixed', 'Crockery Set',
    ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
    300, 1500, 2000, 'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '9876543210', '9876543210', 'phone', FALSE, TRUE, '1 day', 'active', TRUE
  );

  -- ── TRAVEL ──────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_travel,
    '4-Person Camping Tent + Sleeping Bags + Mats',
    'Quechua 4-person camping tent + 4 sleeping bags (rated -5°C) + 4 foam sleeping mats. All packed in carry bags. Perfect for Kodai, Coorg, or Ladakh trips.',
    'good', 'Quechua', 'Camping Bundle',
    ARRAY['https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'],
    400, 2000, 2000, 'Bangalore', 'Hebbal', 'Karnataka', '560024',
    '9123456789', '9123456789', 'whatsapp', FALSE, TRUE, '2 days', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_travel,
    'American Tourister 28" Hard Luggage – Blue x2',
    'Two 28-inch hard shell rolling suitcases (American Tourister). TSA-approved locks, 4-wheel spinner. Ideal for international trips or family vacations.',
    'good', 'American Tourister', '28" Hard Shell',
    ARRAY['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800'],
    150, 700, 1000, 'Delhi', 'Karol Bagh', 'Delhi', '110005',
    '9988776655', '9988776655', 'phone', FALSE, TRUE, '2 days', 'active', TRUE
  );

  -- ── FURNITURE ───────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_furniture,
    'Ergonomic Office Chair + Standing Desk Bundle',
    'Herman Miller Aeron ergonomic chair + motorized standing desk (140cm wide). Perfect for short-term furnished flat setups or home office trials.',
    'excellent', 'Herman Miller', 'Aeron Chair',
    ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
    350, 2000, 6000, 5000, 'Bangalore', 'Electronic City', 'Karnataka', '560100',
    '9876543210', '9876543210', 'whatsapp', TRUE, TRUE, '1 week', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_furniture,
    'Folding Chairs x30 + Round Tables x6 – Event Set',
    '30 plastic folding chairs + 6 round banquet tables (diameter 150cm). Perfect for birthday parties, corporate events, pujas. Delivery in Mumbai.',
    'good', 'Generic', 'Folding Event Set',
    ARRAY['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800'],
    500, 2500, 8000, 1000, 'Mumbai', 'Andheri East', 'Maharashtra', '400069',
    '9123456789', '9123456789', 'phone', FALSE, TRUE, '1 day', 'active', TRUE
  );

  -- ── APPLIANCES ──────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_appli,
    'LG 1.5 Ton 5-Star AC – Perfect for Short-term Stay',
    'LG 5-star split AC (1.5 ton). Ideal for furnished flat tenants or short-term stays. Includes installation by our technician. Energy efficient.',
    'good', 'LG', 'KS-Q18YNZA 1.5T',
    ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
    200, 1100, 3500, 3000, 'Chennai', 'Velachery', 'Tamil Nadu', '600042',
    '9988776655', '9988776655', 'whatsapp', TRUE, TRUE, '1 week', 'active', TRUE
  );

  -- ── CLOTHING ────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_clothing,
    'Men''s Sherwani Set – Ivory Gold (Size 40-42)',
    'Designer cream and gold sherwani with matching churidar and dupatta. Dry cleaned after each use. Perfect for weddings, receptions, and festive occasions.',
    'excellent', 'Manyavar', 'Designer Sherwani',
    ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'],
    600, 3000, 3000, 'Hyderabad', 'Secunderabad', 'Telangana', '500025',
    '9876543210', '9876543210', 'phone', FALSE, TRUE, '1 day', 'active', TRUE
  );

  -- ── BOOKS ───────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_books,
    'UPSC 2024 Complete Study Set – 35 Books',
    'Complete UPSC preparation library: NCERT set (6-12), Laxmikanth Polity, Spectrum Modern History, Bipin Chandra, GC Leong, and 20 more essential references.',
    'good', 'Various Publishers', 'UPSC 2024 Set',
    ARRAY['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'],
    50, 280, 900, 500, 'Bangalore', 'Rajajinagar', 'Karnataka', '560010',
    '9123456789', '9123456789', 'whatsapp', FALSE, TRUE, '1 week', 'active', TRUE
  );

  -- ── OTHERS ──────────────────────────────────────────────────────
  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_others,
    'DJI Mini 3 Pro Drone – 4K, 3-Axis Gimbal',
    'DJI Mini 3 Pro drone. 4K/30fps, 3-axis stabilization, obstacle avoidance. Under 249g — no permit required. 3 batteries, ND filters, carrying case. Perfect for aerial photography.',
    'excellent', 'DJI', 'Mini 3 Pro',
    ARRAY['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
    1500, 8000, 8000, 'Delhi', 'Greater Noida', 'Delhi', '201310',
    '9988776655', '9988776655', 'phone', TRUE, FALSE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_a, cat_others,
    'Projector 4K + 120" Screen – Party/Presentation',
    'Epson EH-TW7000 4K Ultra HD projector + 120-inch tripod screen. 3000 lumens. Perfect for movie nights, product launches, office presentations, or sports screenings.',
    'excellent', 'Epson', 'EH-TW7000',
    ARRAY['https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800'],
    1200, 6500, 8000, 'Bangalore', 'Hebbal', 'Karnataka', '560024',
    '9876543210', '9876543210', 'whatsapp', FALSE, TRUE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_b, cat_cameras,
    'Osmo Pocket 3 – Creator Combo + Accessories',
    'DJI Osmo Pocket 3 with Creator Combo: wide-angle lens, mini tripod, 2 batteries, mic adapter. Perfect for travel vlogs, tutorials, and content creation.',
    'excellent', 'DJI', 'Osmo Pocket 3',
    ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
    800, 4500, 5000, 'Mumbai', 'Powai', 'Maharashtra', '400076',
    '9123456789', '9123456789', 'phone', FALSE, TRUE, '1 day', 'active', TRUE
  );

  INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, id_proof_required, delivery_available, minimum_rental_period, status, is_available)
  VALUES (
    owner_c, cat_gaming,
    'VR Setup – Meta Quest 3 + Beat Saber + 10 Games',
    'Meta Quest 3 standalone VR headset. 10+ games including Beat Saber, Superhot VR, Pistol Whip. Great for gaming events, team building, or just having fun.',
    'excellent', 'Meta', 'Quest 3',
    ARRAY['https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800'],
    200, 1000, 4000, 'Bangalore', 'Marathahalli', 'Karnataka', '560037',
    '9988776655', '9988776655', 'whatsapp', FALSE, TRUE, 'Few hours', 'active', TRUE
  );

  -- ── REVIEWS (Sample 15 reviews) ─────────────────────────────────
  -- We'll just randomly attach reviews from owner_a and owner_b to some listings
  INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental)
  SELECT 
    l.id,
    CASE WHEN (row_number() over()) % 2 = 0 THEN owner_a ELSE owner_b END,
    l.owner_id,
    4 + (row_number() over() % 2),
    'Great experience!',
    'The item was in amazing condition and the owner was very helpful and responsive.',
    TRUE
  FROM listings l
  WHERE l.owner_id != owner_a AND l.owner_id != owner_b
  LIMIT 15;

END $$;

-- Verify seed data
SELECT c.name as category, l.title, l.city, l.price_per_day
FROM listings l
JOIN categories c ON l.category_id = c.id
ORDER BY c.name, l.created_at;
