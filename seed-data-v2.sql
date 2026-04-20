-- ================================================================
-- ORMA — Seed Data V2 (Hyper-Realistic Marketplace Data)
-- Run in Supabase SQL Editor AFTER schema.sql
-- ================================================================

DO $$
DECLARE
  owner_a UUID := '7382e1c1-72d7-4269-a48c-14a4c456d2ed'; -- Suchandra
  owner_b UUID := '9b922684-338b-4518-9f54-99783be25459'; -- Prudvi
  owner_c UUID := '0cad79f7-e7fa-4737-93fe-990676bee0c7'; -- Sandip

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

  -- Listing IDs for review references
  lid1 UUID;
  lid2 UUID;
  lid3 UUID;
  lid4 UUID;
  lid5 UUID;
  lid6 UUID;
  lid7 UUID;
  lid8 UUID;
  lid9 UUID;
  lid10 UUID;
  lid11 UUID;
  lid12 UUID;
  lid13 UUID;
  lid14 UUID;
  lid15 UUID;
  lid16 UUID;
  lid17 UUID;
  lid18 UUID;
  lid19 UUID;
  lid20 UUID;
  lid21 UUID;
  lid22 UUID;
  lid23 UUID;
  lid24 UUID;
  lid25 UUID;
  lid26 UUID;
  lid27 UUID;
  lid28 UUID;
  lid29 UUID;
  lid30 UUID;

BEGIN

-- ── CLEANUP ──────────────────────────────────────────────────────
DELETE FROM reviews;
DELETE FROM wishlists;
DELETE FROM inquiries;
DELETE FROM listings;

-- ── UPDATE PROFILES ──────────────────────────────────────────────
UPDATE profiles SET
  full_name = 'Suchandra Etti',
  city = 'Hyderabad',
  state = 'Telangana',
  bio = 'Tech enthusiast and photography lover. I rent out my gadgets when I''m not using them. Quick responses guaranteed! All items are well-maintained and come with accessories.',
  phone = '+91 9876543210',
  is_verified = TRUE,
  is_owner = TRUE,
  avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
WHERE id = owner_a;

UPDATE profiles SET
  full_name = 'Prudvi Satya Teja',
  city = 'Hyderabad',
  state = 'Telangana',
  bio = 'Mechanical engineering student with a passion for bikes and cars. Renting out my vehicles on weekends. All vehicles are insured and serviced regularly.',
  phone = '+91 9123456789',
  is_verified = TRUE,
  is_owner = TRUE,
  avatar_url = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
WHERE id = owner_b;

UPDATE profiles SET
  full_name = 'Sandip Pal',
  city = 'Bangalore',
  state = 'Karnataka',
  bio = 'Freelance videographer and content creator. Renting out my production equipment when not on shoots. Premium gear, competitive prices.',
  phone = '+91 9988776655',
  is_verified = TRUE,
  is_owner = TRUE,
  avatar_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
WHERE id = owner_c;

-- ── LOAD CATEGORIES ──────────────────────────────────────────────
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

-- ================================================================
-- LISTINGS (30 hyper-realistic entries)
-- ================================================================

-- ── 1. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_cars,
  '2022 Hyundai Creta SX(O) Diesel AT — Polar White, 18000km, Fully Loaded',
  'Renting out my personal 2022 Hyundai Creta SX(O) Diesel Automatic in Polar White. The car has only done 18,000 km and is in showroom condition. Full feature list includes panoramic sunroof, ventilated leather seats, Bose premium sound system, 360-degree camera, ADAS Level 2, wireless Android Auto and Apple CarPlay, and powered driver seat. I purchased it from Advaith Hyundai, Jubilee Hills in March 2022. Regular servicing done every 10,000 km with genuine Hyundai parts — all service records available. The car has zero scratches and has been ceramic coated. Comes with a full tank of diesel. Perfect for family road trips to Srisailam, Araku Valley, or weekend getaways. I also have a Fastag installed for toll-free highway travel. Pick up from my residence in Jubilee Hills, Hyderabad. Smoking strictly not allowed inside the car.',
  'excellent', 'Hyundai', 'Creta SX(O) 2022',
  ARRAY[
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop'
  ],
  2500, 14000, 45000, 15000,
  'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'Valid driving license and government ID (Aadhaar/PAN) required. Security deposit of ₹15,000 payable via UPI or cash at pickup. Deposit fully refundable upon return in original condition. Late return: ₹500/hour. Fuel to be returned at same level. No smoking, no pets. Renter responsible for challans during rental period.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  1247, 52, NOW() - INTERVAL '67 days'
) RETURNING id INTO lid1;

-- ── 2. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_cars,
  '2021 Maruti Suzuki Swift ZXi+ — Solid Fire Red, Petrol Manual, 25000km',
  'My daily driver Maruti Swift ZXi+ 2021 in Solid Fire Red. 25,000 km driven, fully serviced at Maruti authorized service center in Ameerpet. Features include SmartPlay Studio touchscreen with navigation, cruise control, auto headlamps, push-button start, and dual airbags. The car gives amazing mileage — around 20 kmpl in city and 24 on highway. Perfect for someone who needs a zippy city car for a few days. I have comprehensive insurance valid till March 2025. First-party and third-party both covered. The tyres are CEAT SecuraDrive with 80 percent tread life remaining. Ideal for Hyderabad commute or short trips to Warangal or Vijayawada. Pickup from my place near Ameerpet metro station. I will explain all the controls before handover.',
  'good', 'Maruti Suzuki', 'Swift ZXi+ 2021',
  ARRAY[
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'
  ],
  1400, 8500, 28000, 10000,
  'Hyderabad', 'Ameerpet', 'Telangana', '500016',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'Valid DL mandatory. Aadhaar card xerox required. Security deposit ₹10,000 (UPI/cash). Deposit refunded within 24 hours of return. Late return charges: ₹400 per hour. Fuel cost on renter. No inter-state travel without prior approval. Renter liable for traffic violations.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  834, 38, NOW() - INTERVAL '45 days'
) RETURNING id INTO lid2;

-- ── 3. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_cars,
  '2023 Tata Nexon EV Max LR — Pristine White, 12000km, Extended Range',
  'Offering my Tata Nexon EV Max Long Range for rent. This is the top-end XZ+ Lux variant with 40.5 kWh battery giving 437 km ARAI range (real-world around 320 km). Features include a massive 12.8-inch touchscreen, JBL sound system with 9 speakers, ventilated leatherette seats, wireless charging pad, electric sunroof, 360-degree camera, and connected car tech via ZConnect app. Only 12,000 km done — purchased in January 2023 from Concorde Motors, Koramangala. I have a Tata Power EZ Charge home charger included and you can use any public DC fast charger. Charges from 10-80 percent in just 56 minutes on a 50kW DC charger. Zero road tax, zero fuel cost — just electricity. Perfect for someone wanting to experience an EV before buying. Pickup from Koramangala 4th Block. I will give you a 30-minute orientation on EV driving and regenerative braking.',
  'excellent', 'Tata', 'Nexon EV Max LR 2023',
  ARRAY[
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop'
  ],
  2000, 12000, 40000, 20000,
  'Bangalore', 'Koramangala', 'Karnataka', '560034',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'Valid DL + Aadhaar mandatory. Deposit ₹20,000 via UPI at pickup. Home charger provided — you pay electricity. Public charging costs on renter. No smoking. Return with at least 20 percent battery. Late return: ₹600/hour. Damage liability on renter.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  1892, 73, NOW() - INTERVAL '21 days'
) RETURNING id INTO lid3;

-- ── 4. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_bikes,
  '2023 Royal Enfield Himalayan 411cc — Glacier Blue, 8000km, Well Maintained',
  'My Royal Enfield Himalayan 411cc BS6 in Glacier Blue, purchased August 2023 from Royal Enfield showroom Secunderabad. Only 8,000 km on the odo — mostly highway rides to Lambasingi and Ananthagiri Hills. The bike comes with a touring kit: saddle bags, tankpad, engine guard, handlebar risers, and Ceat Gripp XL tyres. Last serviced at 7,500 km with full synthetic oil change. The bike is perfect for weekend getaways or Ladakh prep rides. Starts first kick every time. I have the original toolkit, two keys, and all service records. Insurance valid till August 2025, comprehensive coverage. Pickup from my apartment in Secunderabad near Paradise circle. Helmet not included — please bring your own. I can also arrange a riding jacket rental for ₹200 per day extra.',
  'excellent', 'Royal Enfield', 'Himalayan 411cc 2023',
  ARRAY[
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&h=600&fit=crop'
  ],
  1200, 6000, 5000,
  'Hyderabad', 'Secunderabad', 'Telangana', '500003',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'Valid two-wheeler DL mandatory. Aadhaar xerox + selfie with bike at pickup required. Security deposit ₹5,000 in cash or UPI. Fuel on renter. Return bike clean. Late return: ₹200/hour. Any scratches or damage — repair cost deducted from deposit. No pillion without helmet.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  956, 41, NOW() - INTERVAL '30 days'
) RETURNING id INTO lid4;

-- ── 5. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_bikes,
  '2024 Ola S1 Pro — Midnight Blue, 3500km, 181km Range, Fast Charging',
  'Renting out my Ola S1 Pro electric scooter in Midnight Blue. Purchased in February 2024, only 3,500 km done. 181 km true range on Eco mode, 131 km in Normal. The scooter has MoveOS 4 with features like Hill Hold, Cruise Control, proximity unlock via phone, and turn-by-turn navigation on the touchscreen dashboard. Hyper charging supported — 0 to 50 percent in 18 minutes at any Ola Hypercharger. I have the portable home charger included which takes about 6.5 hours for full charge. Perfect for Hyderabad city commute — saves a ton on petrol. The scooter is super fun to ride with instant torque. Pickup from Madhapur near Durgam Cheruvu. I will walk you through all the features and app setup before handover.',
  'excellent', 'Ola Electric', 'S1 Pro 2024',
  ARRAY[
    'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1597075903470-3a6a0bae3cce?w=800&h=600&fit=crop'
  ],
  600, 3500, 12000, 3000,
  'Hyderabad', 'Madhapur', 'Telangana', '500081',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'Any valid DL (two-wheeler). Aadhaar mandatory. Deposit ₹3,000 UPI. Charging costs on renter — home charger provided. Do not ride in heavy rain. Helmet mandatory. Late return: ₹150/hour. Damage liability on renter.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  423, 22, NOW() - INTERVAL '12 days'
) RETURNING id INTO lid5;

-- ── 6. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_cameras,
  'Canon EOS R6 Mark II with RF 24-105mm f/4 L IS USM Lens Kit',
  'Renting out my personal Canon EOS R6 Mark II that I purchased 6 months ago from Flipkart. Comes with the original RF 24-105mm f/4 L IS USM kit lens, 2 extra batteries (LP-E6NH), a 128GB SanDisk Extreme Pro SD card, and the original Canon camera bag. The camera has barely been used — shutter count is under 2000. 24.2 MP full-frame CMOS sensor, 40fps electronic shutter, 6K RAW video, animal eye AF, and IBIS. Perfect for wedding photography, YouTube content creation, or professional shoots. I will also include a quick 15-minute tutorial on how to use it if you are a beginner. Pick up from my place in Jubilee Hills or I can deliver within Hyderabad for ₹200 extra.',
  'excellent', 'Canon', 'EOS R6 Mark II',
  ARRAY[
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&h=600&fit=crop'
  ],
  800, 3500, 18000, 55000, 15000,
  'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'Valid government ID required (Aadhaar/PAN/Driving License). Security deposit of ₹15,000 payable in cash or UPI at pickup. Deposit fully refundable upon return in original condition. Late return charges: ₹500 per hour beyond agreed time. Renter is responsible for any damage during rental period. Do not expose to rain or sand without weather sealing cover.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  1534, 67, NOW() - INTERVAL '55 days'
) RETURNING id INTO lid6;

-- ── 7. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_cameras,
  'Sony A7 IV with 28-70mm f/3.5-5.6 + Sigma 35mm f/1.4 Art Bundle',
  'My Sony A7 IV setup with two lenses — the kit 28-70mm for general use and the Sigma 35mm f/1.4 Art for portraits and low light. Camera bought from Sony Center Indiranagar in March 2023. 33 MP full-frame, 4K 60fps video with 10-bit 4:2:2, real-time eye AF for humans animals and birds, and 5-axis IBIS. Shutter count approximately 5,000. The kit includes: camera body, both lenses, 2x Sony NP-FZ100 batteries, a Rode VideoMicro II shotgun mic, a 256GB Sony Tough SD card, and my Peak Design Everyday Sling. Perfect for cinematic wedding films, reels, or product photography. I use this for my freelance work but its available on days I dont have shoots. Pickup from Indiranagar 100 Feet Road.',
  'excellent', 'Sony', 'A7 IV + Sigma 35mm',
  ARRAY[
    'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1495707902641-75cac588d2e8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&h=600&fit=crop'
  ],
  1000, 4000, 22000, 65000, 20000,
  'Bangalore', 'Indiranagar', 'Karnataka', '560038',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'Government ID + security deposit ₹20,000 via UPI. Both lenses must be returned with caps on. No lens changes in dusty or windy environments. Late return ₹600/hour. Damage to sensor or lens — full replacement cost. Insurance recommended.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  1102, 48, NOW() - INTERVAL '38 days'
) RETURNING id INTO lid7;

-- ── 8. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_laptops,
  'Apple MacBook Pro 14" M3 Pro — 18GB/512GB, Space Black, AppleCare+',
  'Renting out my MacBook Pro 14-inch M3 Pro (November 2023 model) in Space Black. Specs: M3 Pro chip with 12-core CPU and 18-core GPU, 18GB unified memory, 512GB SSD. The display is a stunning Liquid Retina XDR with 3024x1964 resolution, ProMotion 120Hz, and 1600 nits peak HDR brightness. Battery health is at 97 percent with only 85 charge cycles. AppleCare+ valid until November 2025. Comes with the 70W USB-C charger, original box, and a Spigen hard shell case. Perfect for developers, video editors, music producers, or design professionals. I use it for my coding projects but its available most weekends. Pickup from Banjara Hills or can deliver within a 10km radius in Hyderabad.',
  'excellent', 'Apple', 'MacBook Pro 14 M3 Pro 2023',
  ARRAY[
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop'
  ],
  2000, 10000, 35000, 20000,
  'Hyderabad', 'Banjara Hills', 'Telangana', '500034',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'Aadhaar + PAN card mandatory. Security deposit ₹20,000 via UPI. Do not install pirated software. Return with at least 50 percent battery. No food or drinks near the laptop. Late return ₹400/hour. Any liquid damage — full replacement cost on renter.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  1678, 71, NOW() - INTERVAL '40 days'
) RETURNING id INTO lid8;

-- ── 9. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_laptops,
  'ASUS ROG Strix G16 — i9-13980HX, RTX 4070, 32GB, 1TB, 240Hz IPS',
  'My gaming beast — ASUS ROG Strix G16 with Intel Core i9-13980HX, NVIDIA RTX 4070 8GB, 32GB DDR5 RAM, and 1TB NVMe SSD. The 16-inch 240Hz IPS display with 100 percent DCI-P3 is buttery smooth for competitive gaming. Features include per-key RGB keyboard, Dolby Atmos speakers, and MUX switch for direct GPU rendering. Runs AAA games at Ultra settings easily — Cyberpunk 2077 at 80+ FPS, Forza Horizon 5 at 100+ FPS. Also has Thunderbolt 4 if you want to connect an external monitor. Thermal performance is excellent with liquid metal compound on the CPU. Great for LAN parties, game dev, or 3D rendering. Comes with the 280W charger and an ROG laptop sleeve. Pickup from HSR Layout.',
  'good', 'ASUS', 'ROG Strix G16 2023',
  ARRAY[
    'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop'
  ],
  1500, 8000, 28000, 15000,
  'Bangalore', 'HSR Layout', 'Karnataka', '560102',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'Government ID required. Deposit ₹15,000 UPI. Do not overclock beyond factory settings. Clean the vents if used on bed. Return with charger and sleeve. Late return ₹300/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  612, 29, NOW() - INTERVAL '18 days'
) RETURNING id INTO lid9;

-- ── 10. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_phones,
  'iPhone 15 Pro Max 256GB — Natural Titanium, 98% Battery, Full Kit',
  'Renting my iPhone 15 Pro Max 256GB in Natural Titanium. Battery health at 98 percent — purchased from Apple Store online in October 2023. Features include A17 Pro chip, 48MP main camera with 5x optical zoom, Action mode video, ProRes recording, and always-on display. The phone has been in a case since day one — zero scratches on the titanium frame or ceramic shield front. Comes with original box, USB-C cable, Apple clear case, and a Spigen tempered glass already applied. Find My iPhone will be disabled before handover. Perfect for professional mobile photography, filmmaking, or if you want to test before upgrading. Pickup from Kukatpally near KPHB metro station.',
  'excellent', 'Apple', 'iPhone 15 Pro Max',
  ARRAY[
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800&h=600&fit=crop'
  ],
  200, 1000, 5500, 18000, 10000,
  'Hyderabad', 'Kukatpally', 'Telangana', '500072',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'Aadhaar + selfie required. Deposit ₹10,000 UPI. Do not jailbreak or factory reset. Return with at least 20 percent battery. Any screen crack — full replacement cost. Late return ₹200/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  789, 35, NOW() - INTERVAL '25 days'
) RETURNING id INTO lid10;

-- ── 11. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_phones,
  'Samsung Galaxy S24 Ultra 512GB — Titanium Black, S Pen, Dual SIM',
  'Samsung Galaxy S24 Ultra 512GB in Titanium Black — the ultimate Android flagship. Features Snapdragon 8 Gen 3 for Galaxy, 200MP main camera with 100x Space Zoom, titanium frame, flat 6.8-inch Dynamic AMOLED 2X display with 2600 nits brightness, and built-in S Pen. 12GB RAM makes multitasking a breeze. Galaxy AI features include Circle to Search, Live Translate, and Photo Assist. Battery health excellent — purchased February 2024 from Samsung Experience Store Koramangala. Comes with original box, Samsung 45W charger, Spigen Tough Armor case, and Whitestone Dome glass protector installed. Perfect for content creators who need the best mobile camera or professionals who use S Pen for notes. Pickup from Whitefield near ITPL.',
  'excellent', 'Samsung', 'Galaxy S24 Ultra 512GB',
  ARRAY[
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop'
  ],
  150, 800, 4500, 15000, 8000,
  'Bangalore', 'Whitefield', 'Karnataka', '560066',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'Government ID required. Deposit ₹8,000 UPI. Do not root or flash custom ROM. S Pen must be returned. Screen damage — full repair cost. Late return ₹150/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  445, 19, NOW() - INTERVAL '8 days'
) RETURNING id INTO lid11;

-- ── 12. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_gaming,
  'PlayStation 5 Disc Edition + 2 DualSense Controllers + 8 Game Bundle',
  'My PlayStation 5 Disc Edition with 2 DualSense controllers (Midnight Black and Cosmic Red) and a bundle of 8 popular games: Spider-Man 2, God of War Ragnarok, Horizon Forbidden West, The Last of Us Part I, Gran Turismo 7, FC 24, Hogwarts Legacy, and Elden Ring. The console was purchased from ShopatSC in June 2023 and is in immaculate condition. Also includes an Arctis 7P wireless headset for immersive gaming. The console is set up with a 2TB Seagate expansion SSD so you have plenty of storage. Perfect for a weekend gaming marathon or a house party with friends. Comes with all original cables and a controller charging dock. Pickup from Gachibowli near DLF Cyber City.',
  'excellent', 'Sony', 'PlayStation 5 Disc Edition',
  ARRAY[
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&h=600&fit=crop'
  ],
  1500, 8000, 25000, 10000,
  'Hyderabad', 'Gachibowli', 'Telangana', '500032',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'Aadhaar mandatory. Deposit ₹10,000 UPI/cash. Do not open the console or attempt repairs. Return all controllers, games, and accessories. Any disc scratches — replacement cost deducted. Late return ₹300/hour.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  1876, 78, NOW() - INTERVAL '50 days'
) RETURNING id INTO lid12;

-- ── 13. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_gaming,
  'Meta Quest 3 128GB VR Headset — With Elite Strap & 5 Games',
  'Renting my Meta Quest 3 128GB standalone VR headset. This is the latest mixed reality headset with full-color passthrough, Snapdragon XR2 Gen 2 processor, and pancake lenses with 2064x2208 per eye resolution. Comes with the Elite Strap with Battery for extended 3-hour sessions, silicone face cover for hygiene, lens protector, and 5 pre-installed games: Beat Saber, Superhot VR, Resident Evil 4 VR, Asgards Wrath 2, and Job Simulator. Perfect for experiencing VR gaming, virtual tours, or fitness workouts like Supernatural. I sanitize the headset thoroughly between each rental. The face cover is washable. Hand tracking works amazingly well — no controllers needed for many apps. Pickup from Electronic City Phase 1 near Infosys campus.',
  'good', 'Meta', 'Quest 3 128GB',
  ARRAY[
    'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&h=600&fit=crop'
  ],
  300, 1200, 6500, 8000,
  'Bangalore', 'Electronic City', 'Karnataka', '560100',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'ID required. Deposit ₹8,000 UPI. Please use the provided face cover. Do not drop or throw the headset. Controllers must be returned. Late return ₹250/hour. Hygiene surcharge ₹500 if face cover is not returned clean.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  534, 24, NOW() - INTERVAL '5 days'
) RETURNING id INTO lid13;

-- ── 14. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_tools,
  'Bosch GSB 500 RE Impact Drill Kit — 100pc Accessory Set, Carry Case',
  'Bosch GSB 500 RE Professional impact drill with the complete 100-piece accessory set including drill bits for wood, metal, and masonry, screwdriver bits, hole saws, and a spirit level. 500W motor with variable speed (0-2800 RPM) and forward/reverse. The drill is in perfect working condition — I bought it for my home renovation last year and now it sits idle. Comes in the original Bosch carry case with all accessories organized. Perfect for DIY home projects — hanging shelves, drilling into concrete walls, assembling IKEA furniture, or any weekend warrior project. I can also include my Bosch laser level for ₹100 extra per day. Pickup from Ameerpet near Metro station. I will demonstrate how to use it and change bits at pickup.',
  'good', 'Bosch', 'GSB 500 RE',
  ARRAY[
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop'
  ],
  300, 1500, 2000,
  'Hyderabad', 'Ameerpet', 'Telangana', '500016',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'Aadhaar required. Deposit ₹2,000 cash/UPI. Return clean and in carry case. Broken drill bits — ₹50 per bit. Motor damage — repair cost on renter. Late return ₹100/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  234, 15, NOW() - INTERVAL '35 days'
) RETURNING id INTO lid14;

-- ── 15. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_music,
  'Yamaha PSR-E473 61-Key Keyboard — With Stand, Sustain Pedal & Bag',
  'Yamaha PSR-E473 portable keyboard with 61 touch-sensitive keys, 820 instrument voices, 290 auto-accompaniment styles, and built-in effects including DSP, reverb, and chorus. Features Quick Sampling, Groove Creator, and USB Audio Interface for direct recording to your laptop. The keyboard is in excellent condition — purchased from Furtados Music, Banjara Hills, for learning during lockdown. Comes with an adjustable X-stand, Yamaha FC5 sustain pedal, padded gig bag, and music rest. Also including my Hal Leonard beginner piano book if you are just starting out. Perfect for practice sessions, small gigs, music production, or teaching. Runs on 6xAA batteries or the included PA-150 power adapter. Pickup from Jubilee Hills.',
  'excellent', 'Yamaha', 'PSR-E473',
  ARRAY[
    'https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800&h=600&fit=crop'
  ],
  500, 2500, 8000, 3000,
  'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'ID required. Deposit ₹3,000 UPI. Do not spill liquids on keys. Return with all accessories including sustain pedal, stand, adapter, and bag. Key damage — full replacement cost. Late return ₹100/hour.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  312, 17, NOW() - INTERVAL '42 days'
) RETURNING id INTO lid15;

-- ── 16. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_music,
  'Fender Player Stratocaster MN — 3-Color Sunburst + Marshall MG15FX Amp',
  'My Fender Player Stratocaster in classic 3-Color Sunburst with maple neck — Made in Mexico. Alder body, 3 Player Series Alnico 5 Strat single-coil pickups, modern C-neck profile, 22 medium jumbo frets, and a 2-point tremolo bridge. The guitar is strung with Ernie Ball Regular Slinky 10-46 and the action is set up perfectly — no fret buzz whatsoever. Comes bundled with my Marshall MG15FX practice amp which has 4 channels and digital effects including reverb, delay, chorus, and flanger. Also includes a 3m Fender instrument cable, guitar strap, picks, and a soft gig bag. Perfect for jam sessions, gigs, recording, or if you want to try a Strat before buying. Pickup from Jayanagar 4th Block.',
  'good', 'Fender', 'Player Stratocaster MN',
  ARRAY[
    'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&h=600&fit=crop'
  ],
  800, 4500, 14000, 5000,
  'Bangalore', 'Jayanagar', 'Karnataka', '560011',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'ID required. Deposit ₹5,000 UPI. Do not modify strings, pickups, or electronics. Return in gig bag with amp, cable, and strap. Scratches to finish — cosmetic damage fee ₹1,000. Pickup or electronic damage — repair cost. Late return ₹200/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  287, 12, NOW() - INTERVAL '15 days'
) RETURNING id INTO lid16;

-- ── 17. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_sports,
  'Decathlon Riverside 500 Mountain Bike — 27.5", 21-Speed, Disc Brakes',
  'Decathlon Riverside 500 hybrid mountain bike with 27.5-inch wheels, Shimano 21-speed drivetrain (3x7), mechanical disc brakes front and rear, and SR Suntour suspension fork with 63mm travel. Frame size is Medium (suitable for riders 5 feet 4 inches to 5 feet 10 inches). The bike is in great condition — purchased from Decathlon Madhapur in December 2022 and serviced every 6 months. Recently got new brake pads and chain. Comes with a bottle cage, bike lock (combination), front and rear lights, and a basic toolkit for on-trail adjustments. Perfect for weekend morning rides on the Outer Ring Road cycling track, MTB trails in Shamirpet, or even daily university commute. Pickup from near ISB Gachibowli.',
  'good', 'Decathlon', 'Riverside 500 MTB',
  ARRAY[
    'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop'
  ],
  400, 2000, 6000, 2000,
  'Hyderabad', 'Gachibowli', 'Telangana', '500032',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'ID required. Deposit ₹2,000 UPI/cash. Helmet strongly recommended (not provided). Return bike clean. Puncture repair on renter. Bent rims or broken spokes — repair cost deducted. Late return ₹100/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  189, 11, NOW() - INTERVAL '28 days'
) RETURNING id INTO lid17;

-- ── 18. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_sports,
  'Complete Camping Kit — Quechua 4-Person Tent, Sleeping Bags, Stove & More',
  'Full camping setup for 4 people, perfect for a weekend at Ananthagiri Hills, Srisailam, or Horsley Hills. Kit includes: Quechua MH100 4-person tent (waterproof, sets up in 5 minutes with instant pop-up design), 4 Forclaz Trek 500 sleeping bags rated to 10 degrees Celsius, 4 inflatable sleeping mats, a Quechua MH500 camping stove with 2 gas canisters, LED camping lantern (rechargeable), a 20-liter insulated cooler bag, 4 sets of steel camping cutlery, and a first-aid kit. Everything fits in 2 large duffel bags for easy transport. I have been camping for 3 years and all gear is well maintained. I can also share my favorite camping spots near Hyderabad and tips for beginners. Pickup from my place in Jubilee Hills.',
  'good', 'Quechua', 'MH100 Camping Kit',
  ARRAY[
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800&h=600&fit=crop'
  ],
  800, 4000, 5000,
  'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'ID required. Deposit ₹5,000 UPI. Return tent dry and clean — if wet, dry before packing. Missing items charged at replacement cost. Gas canisters non-refundable. Late return ₹200/hour.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  567, 31, NOW() - INTERVAL '14 days'
) RETURNING id INTO lid18;

-- ── 19. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_events,
  'Complete DJ Setup — Pioneer DDJ-400, JBL PartyBox 310 & LED Lights',
  'Full DJ and party setup for house parties, college fests, or small events up to 100 people. Kit includes: Pioneer DDJ-400 DJ controller (works with Rekordbox DJ software, free license included), JBL PartyBox 310 Bluetooth speaker with 240W output and built-in light show, a second JBL Flip 6 for dual-speaker mode in smaller rooms, 2 RGB LED par lights with DMX control and stand, a disco ball, 2 mic stands, and a Shure SV200 dynamic mic for karaoke or announcements. The DDJ-400 connects to any laptop via USB. I can pre-load trending Bollywood, EDM, and Tollywood playlists on a USB drive for ₹200 extra. Perfect for birthday parties, New Year bashes, or Freshers events. Pickup from Koramangala.',
  'good', 'Pioneer', 'DDJ-400 DJ Setup',
  ARRAY[
    'https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
  ],
  500, 3000, 15000, 10000,
  'Bangalore', 'Koramangala', 'Karnataka', '560034',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'ID + deposit ₹10,000 UPI. Do not use near water or rain. Volume limit after 10PM as per Bangalore noise regulations. Return all components in carry cases. Blown speaker — full replacement cost. Late return ₹500/hour.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  923, 44, NOW() - INTERVAL '10 days'
) RETURNING id INTO lid19;

-- ── 20. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_travel,
  'Samsonite Octolite 55cm + 75cm Spinner Luggage Set — Matte Black',
  'Samsonite Octolite spinner luggage set — cabin size (55cm, 33L) and check-in size (75cm, 97L) in Matte Black. Both bags have 4 double spinner wheels, TSA combination locks, expandable design with extra 15 percent packing space, and Samsonite proprietary Polypropylene shells that are ultra lightweight yet incredibly strong. The cabin bag is approved for IndiGo, Air India, and Vistara carry-on limits. The check-in bag weighs only 3.8kg empty despite the large capacity. Both bags have been used only twice — once for a Goa trip and once for a work trip to Delhi. Interiors have mesh dividers and cross-straps for organized packing. Perfect for a vacation, honeymoon trip, or work travel. Pickup from Banjara Hills.',
  'excellent', 'Samsonite', 'Octolite 55+75cm Set',
  ARRAY[
    'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  ],
  400, 2000, 6000, 3000,
  'Hyderabad', 'Banjara Hills', 'Telangana', '500034',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'ID required. Deposit ₹3,000 UPI. Return clean — no food stains inside. TSA lock code will be shared at pickup. Broken wheels or zippers — repair cost. Late return ₹100/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  145, 8, NOW() - INTERVAL '20 days'
) RETURNING id INTO lid20;

-- ── 21. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_furniture,
  'Ergonomic Office Setup — Herman Miller Aeron + Standing Desk, 6-Month Old',
  'My work-from-home setup that I am renting out since I have moved to office full-time. Includes a genuine Herman Miller Aeron chair (Size B, Graphite, fully loaded with PostureFit SL, adjustable arms, tilt limiter, and forward tilt) and a Flexispot E7 standing desk (140x70cm walnut desktop, dual motor, memory presets for 3 heights, anti-collision system). The Aeron alone retails for over 1.2 lakh and this one is less than 6 months old with the full 12-year warranty intact. Perfect for IT professionals, freelancers, or anyone who wants a premium ergonomic setup without the huge investment. The desk comes disassembled in 2 parts for transport. I can help with assembly at your place within Hyderabad for ₹500. Pickup from Madhapur IT corridor area.',
  'excellent', 'Herman Miller', 'Aeron + Flexispot E7',
  ARRAY[
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop'
  ],
  500, 3000, 8000, 15000,
  'Hyderabad', 'Madhapur', 'Telangana', '500081',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'ID required. Deposit ₹15,000 UPI. The chair has a weight limit of 136 kg. Do not sit on the mesh with sharp objects. Return in original condition. Desk motor damage — repair cost approximately ₹8,000. Late return ₹200/hour.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  456, 23, NOW() - INTERVAL '33 days'
) RETURNING id INTO lid21;

-- ── 22. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_furniture,
  'IKEA KALLAX 4x4 Shelf Unit + MALM 6-Drawer Dresser — White, Like New',
  'Renting my IKEA furniture set — KALLAX 4x4 shelf unit (147x147cm, white) and MALM 6-drawer dresser (160x78cm, white) as a bundle. I bought these from IKEA Nagasandra in June 2023 for my rented apartment but I am moving to a furnished place now. Both pieces are in like-new condition with zero scratches or stains. The KALLAX is perfect as a room divider, bookshelf, or storage unit — each cube fits standard storage boxes. The MALM dresser has smooth-running drawers with pull-out stops and is great for clothes or accessories. I will provide the wall anchoring hardware for the MALM for safety. Delivery available within Bangalore for ₹500. Disassembly and reassembly included in the delivery charge.',
  'excellent', 'IKEA', 'KALLAX + MALM Bundle',
  ARRAY[
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
  ],
  300, 1500, 4000, 5000,
  'Bangalore', 'Electronic City', 'Karnataka', '560100',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'ID required. Deposit ₹5,000 UPI. Do not overload shelves — weight limits in IKEA manual. Return in original condition. Scratches or water damage — repair or replacement cost. Late return — daily rate applies.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  167, 9, NOW() - INTERVAL '48 days'
) RETURNING id INTO lid22;

-- ── 23. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_appli,
  'Dyson V15 Detect Absolute Cordless Vacuum — All Attachments, Like New',
  'Dyson V15 Detect Absolute cordless vacuum cleaner — the flagship model with laser dust detection, piezo sensor that counts and sizes dust particles, and LCD screen showing real-time suction power and maintenance alerts. 60 minutes of fade-free suction on Eco mode. Comes with all original attachments: Laser Slim Fluffy cleaner head for hard floors, Digital Motorbar cleaner head for carpets, hair screw tool, crevice tool, combination tool, stubborn dirt brush, and the wall-mounted docking station. Battery holds excellent charge — only used for 3 months before we got our robot vacuum. Perfect for a deep clean before a house party, post-renovation cleanup, or just to try before you buy the 60K price tag. Pickup from Jubilee Hills.',
  'excellent', 'Dyson', 'V15 Detect Absolute',
  ARRAY[
    'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop'
  ],
  500, 2500, 5000,
  'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'ID required. Deposit ₹5,000 UPI. Empty the dustbin after each use. Clean the filter before return. Do not vacuum liquids. Missing attachments charged at replacement cost. Late return ₹100/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  334, 18, NOW() - INTERVAL '22 days'
) RETURNING id INTO lid23;

-- ── 24. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_appli,
  'LG PuriCare AeroFurniture Air Purifier + Table — Cream White, HEPA',
  'LG PuriCare AeroFurniture in Cream White — it is both a side table and a HEPA air purifier in one elegant design. 360-degree True HEPA filter with activated carbon removes 99.97 percent of particles as small as 0.3 microns, plus PM1.0, allergens, pet dander, and odors. Covers rooms up to 310 sq ft. The built-in wireless charging pad on top lets you charge your phone. Features 3 fan speeds, Sleep mode, mood lighting with 8 colors, and an air quality indicator LED. Energy consumption is only 11W on low — barely adds to your electricity bill. Bought from LG online store in September 2023 for my bedroom. Perfect for allergy sufferers, new parents, or anyone living near a construction site. Filter is at 70 percent life. Pickup from Ameerpet.',
  'good', 'LG', 'PuriCare AeroFurniture',
  ARRAY[
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop'
  ],
  300, 1500, 4500, 3000,
  'Hyderabad', 'Ameerpet', 'Telangana', '500016',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'ID required. Deposit ₹3,000 UPI. Do not wash the HEPA filter with water. Do not block air intake. Return clean. Filter replacement cost ₹2,500 if damaged. Late return ₹100/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  98, 5, NOW() - INTERVAL '55 days'
) RETURNING id INTO lid24;

-- ── 25. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_clothing,
  'Men''s Sherwani Set — Royal Blue, Size 40, Raymond Fabric, Wedding Ready',
  'Premium Raymond fabric Royal Blue sherwani set in Size 40 (fits chest 40 inches, height 5 feet 8 to 5 feet 11). Includes the sherwani, matching churidar pants, and a contrasting gold dupatta or stole. The sherwani has intricate golden zardozi embroidery on the collar, sleeves, and front panel. Side pockets with button closure. Machine stitched with detailed handwork on embroidery. I wore this only once for my cousins wedding in December 2023 and it has been professionally dry cleaned. Perfect for weddings, engagement ceremonies, or Sangeet night. I can also recommend a matching jutti and safa shop in Chickpet, Bangalore. No alterations please — try before renting. Pickup from Koramangala.',
  'excellent', 'Raymond', 'Royal Blue Sherwani Set',
  ARRAY[
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop'
  ],
  1500, 5000,
  'Bangalore', 'Koramangala', 'Karnataka', '560034',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'Deposit ₹5,000 UPI. Must be dry cleaned before return — receipt required. No alterations allowed. Stains or tears — full replacement cost. Return within agreed time. Late return ₹300/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  78, 4, NOW() - INTERVAL '60 days'
) RETURNING id INTO lid25;

-- ── 26. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_books,
  'Complete GATE 2025 CSE Study Kit — Made Easy + Previous Year Papers',
  'Complete GATE Computer Science Engineering preparation kit with Made Easy classroom notes (handwritten, photocopied with permission), 10 textbooks covering all subjects: Data Structures, Algorithms, OS, DBMS, Computer Networks, TOC, Compiler Design, Digital Logic, Discrete Mathematics, and Engineering Mathematics. Also includes Made Easy Previous Year Solved Papers book (2005-2024) and my personal short notes with mnemonics and important formulas that helped me score AIR 234. All books are highlighted and annotated but in good condition. Perfect for GATE 2025 or 2026 aspirants who want a complete ready-to-study package. Will share my Unacademy notes folder link as bonus. Pickup from Ameerpet coaching hub area.',
  'fair', 'Made Easy', 'GATE CSE 2025 Kit',
  ARRAY[
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'
  ],
  200, 1000, 3000, 2000,
  'Hyderabad', 'Ameerpet', 'Telangana', '500016',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'Student ID or Aadhaar. Deposit ₹2,000. Do not tear or damage pages. Return all books and notes. Missing book — replacement cost. Late return ₹50/day.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  432, 26, NOW() - INTERVAL '16 days'
) RETURNING id INTO lid26;

-- ── 27. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_cameras,
  'DJI Mini 3 Pro Fly More Combo — 4K/60fps Drone, 3 Batteries, ND Filters',
  'DJI Mini 3 Pro with the Fly More Combo — includes the drone, DJI RC controller (with built-in screen, no phone needed), 3 Intelligent Flight Batteries giving you over 100 minutes total flight time, a 3-battery charging hub, propeller guards, and a Freewell ND filter set (ND4, ND8, ND16, ND32). The drone weighs under 249g so no DGCA registration required in India for recreational use. Features include 4K/60fps video, 48MP photos, ActiveTrack 5.0 subject tracking, vertical shooting for Instagram Reels, tri-directional obstacle sensing, and 12km HD video transmission. I use it for my freelance aerial videography but its available when I dont have bookings. Perfect for travel vlogs, real estate shoots, wedding ceremonies, or just epic drone footage of Hyderabad skyline. Pickup from Madhapur.',
  'excellent', 'DJI', 'Mini 3 Pro Fly More',
  ARRAY[
    'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=600&fit=crop'
  ],
  500, 2500, 12000, 15000,
  'Hyderabad', 'Madhapur', 'Telangana', '500081',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'ID required. Deposit ₹15,000 UPI. Do not fly in restricted zones (airport, cantonment). Follow DGCA guidelines. Crash damage — full repair cost. Lost drone — replacement cost from deposit. Return all 3 batteries and accessories. Late return ₹400/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  1345, 58, NOW() - INTERVAL '9 days'
) RETURNING id INTO lid27;

-- ── 28. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_hour, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_c, cat_laptops,
  'iPad Pro 12.9" M2 256GB WiFi — Space Gray + Magic Keyboard + Apple Pencil 2',
  'Apple iPad Pro 12.9-inch M2 chip (2022) in Space Gray, 256GB WiFi model. Bundled with the Magic Keyboard (full-size backlit keys, trackpad, USB-C pass-through charging) and Apple Pencil 2nd generation. The iPad has a Liquid Retina XDR display with ProMotion 120Hz, 12MP wide and 10MP ultra-wide cameras, LiDAR scanner, Face ID, and Thunderbolt USB-C. Battery health is excellent at 94 percent. This is the ultimate creative and productivity tool — I use it for Procreate illustrations, video editing in LumaFusion, and note-taking in GoodNotes. All apps will be signed out before handover. Screen has a matte paperlike screen protector applied. Perfect for digital artists, students, or professionals. Pickup from Indiranagar.',
  'excellent', 'Apple', 'iPad Pro 12.9 M2',
  ARRAY[
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=600&fit=crop'
  ],
  200, 1500, 8000, 25000, 15000,
  'Bangalore', 'Indiranagar', 'Karnataka', '560038',
  '+91 9988776655', '+91 9988776655', 'whatsapp',
  'ID required. Deposit ₹15,000 UPI. Do not remove screen protector. Return with Magic Keyboard, Pencil, and charger. Screen crack — full replacement. Lost Apple Pencil — ₹10,000 charge. Late return ₹300/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  876, 39, NOW() - INTERVAL '7 days'
) RETURNING id INTO lid28;

-- ── 29. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_a, cat_events,
  'Wedding Decoration Kit — 200pc Balloon Arch, Fairy Lights, Photo Booth Props',
  'Complete wedding and party decoration kit suitable for events up to 200 guests. Includes: 200-piece balloon arch kit (gold, white, rose gold chrome balloons with arch strip and glue dots), 6 strings of warm white fairy lights (30 feet each, battery operated), a Mr and Mrs neon sign (USB powered, warm white), 30 tissue paper pom poms in assorted sizes, a photo booth props set with 40 pieces (glasses, mustaches, lips, wedding signs), 2 gold sequin table runners, 10 mason jars with LED candles, and a floral backdrop stand 8x8 feet (pipe and drape frame, fabric not included). All items packed in 3 labeled boxes for easy setup. I do event styling as a side gig and this is my personal kit. Setup guide video link provided. Pickup from Banjara Hills.',
  'good', 'Custom', 'Wedding Decor Kit',
  ARRAY[
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop'
  ],
  2000, 5000,
  'Hyderabad', 'Banjara Hills', 'Telangana', '500034',
  '+91 9876543210', '+91 9876543210', 'whatsapp',
  'ID required. Deposit ₹5,000 UPI. Return all items in labeled boxes. Popped balloons — ₹5 each. Broken neon sign — ₹3,000. Missing props — replacement cost. Surface must be clean and dry before return. Late return ₹300/hour.',
  TRUE, TRUE, '1 day', 'active', TRUE,
  723, 34, NOW() - INTERVAL '3 days'
) RETURNING id INTO lid29;

-- ── 30. ─────────────────────────────────────────────────────
INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
VALUES (
  owner_b, cat_bikes,
  '2022 KTM Duke 200 — Orange & Black, 15000km, ABS, Recently Serviced',
  'KTM Duke 200 BS6 in the iconic Orange and Black color scheme. 15,000 km on the odometer, purchased from KTM Showroom Kukatpally in May 2022. The bike runs on the 199.5cc single-cylinder engine producing 25 HP and 19.3 Nm of torque — very peppy in city traffic. Features include single-channel ABS, full digital instrument cluster, LED headlamp, underbelly exhaust, and a slipper clutch. Last serviced at 14,500 km — engine oil, air filter, and chain set replaced. The bike has Michelin Pilot Street tyres with good tread. I have added a phone mount, short clutch lever, and bar-end mirrors. Perfect for city commuting or a short weekend ride. Pickup from Kukatpally KPHB Colony.',
  'good', 'KTM', 'Duke 200 2022',
  ARRAY[
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop'
  ],
  900, 5000, 16000, 5000,
  'Hyderabad', 'Kukatpally', 'Telangana', '500072',
  '+91 9123456789', '+91 9123456789', 'whatsapp',
  'Two-wheeler DL mandatory. Aadhaar required. Deposit ₹5,000 cash/UPI. Fuel on renter. No stunts or wheelies. Helmet mandatory (bring your own). Scratches — paint job cost. Engine damage — full repair cost. Late return ₹200/hour.',
  TRUE, FALSE, '1 day', 'active', TRUE,
  567, 27, NOW() - INTERVAL '19 days'
) RETURNING id INTO lid30;

-- ================================================================
-- REVIEWS (40 realistic reviews)
-- ================================================================

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid1, owner_b, owner_a, 5, 'Perfect car, amazing owner', 'Rented the Creta for a weekend trip to Araku Valley with family. Suchandra was super helpful — he had the car cleaned and fueled up before handover. The panoramic sunroof was a hit with the kids. Zero issues during the 600km drive. Returned the deposit within 2 hours of return. Would definitely rent again for our next road trip. The ADAS features made highway driving so relaxing.', TRUE, NOW() - INTERVAL '45 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid1, owner_c, owner_a, 4, 'Great car, minor delay at pickup', 'The Creta is genuinely in showroom condition as described. All features work perfectly. Only reason for 4 stars is that the pickup was delayed by about 40 minutes. But Suchandra was apologetic and gave me an extra hour free. The Bose sound system is incredible for long drives. Would recommend to anyone looking for a comfortable SUV rental in Hyderabad.', TRUE, NOW() - INTERVAL '30 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid3, owner_a, owner_c, 5, 'Mind-blowing EV experience', 'First time driving an EV and wow — the instant torque is addictive. Sandip gave me a proper 30-minute demo on regenerative braking, charging stations, and the ZConnect app. The 320km real-world range was more than enough for my Bangalore to Mysore and back trip. Charged once at a Tata Power station on the highway — super easy. The sunroof and JBL speakers made the drive magical. Highly recommend this for anyone curious about EVs.', TRUE, NOW() - INTERVAL '15 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid3, owner_b, owner_c, 5, 'Saved so much on fuel!', 'Used the Nexon EV for a full week of commuting in Bangalore — Whitefield to Koramangala daily. Spent maybe ₹300 on charging vs what would have been ₹2000+ on petrol. The car drives beautifully and the 360-degree camera is a blessing for Bangalore parking. Sandip was prompt with responses and flexible with pickup timing. The home charger he provides works great — just plug in overnight.', TRUE, NOW() - INTERVAL '8 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid4, owner_a, owner_b, 5, 'Beast of a bike', 'Took the Himalayan for a 3-day ride to Lambasingi. The bike handled the ghats like a dream. Saddle bags were super convenient for luggage. Prudvi had the bike serviced right before my rental — chain tension was perfect, tyres at correct pressure. The touring kit he provides (engine guard, tank pad) gives extra confidence on rough roads. Started first kick every single time even in the cold morning at Lambasingi. Absolute legend of a bike.', TRUE, NOW() - INTERVAL '20 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid4, owner_c, owner_b, 4, 'Good ride, heavy for city use', 'Rented for a weekend to test before buying. The Himalayan is perfect for highways but a bit heavy at 199kg for Hyderabad city traffic. Prudvi was honest about this upfront which I appreciated. The windshield helps a lot on the highway. Fuel efficiency was around 30kmpl mixed riding. The bike is very well maintained — zero oil leaks, smooth gearbox. Returned without issues and got my deposit back same day.', TRUE, NOW() - INTERVAL '12 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid6, owner_b, owner_a, 5, 'Perfect for my sister''s wedding', 'Rented the Canon R6 Mark II for my sister''s wedding. Suchandra was super helpful — he even showed me how to switch between photo and video modes. Camera was in perfect condition, came with extra batteries which was a lifesaver during the 6-hour ceremony. The eye AF is scary good — every portrait came out tack sharp. Only issue was the lens cap was a bit loose, but it did not affect anything. Would definitely rent again! Quick pickup from his apartment in Jubilee Hills.', TRUE, NOW() - INTERVAL '40 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid6, owner_c, owner_a, 5, 'Professional-grade results', 'Used this for a YouTube video shoot and the 4K 60fps footage blew my mind. The IBIS combines with lens IS to give gimbal-like handheld footage. Suchandra gave me a quick tutorial on the camera settings which saved me hours of Googling. The 128GB SD card he includes is the fast UHS-II type so no buffer issues. Returned the camera a day early and he processed my deposit refund within an hour. Top-notch rental experience.', TRUE, NOW() - INTERVAL '25 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid7, owner_a, owner_c, 4, 'Sony colors are stunning', 'The A7 IV produces incredible colors straight out of camera. The Sigma 35mm f/1.4 is a portrait beast — creamy bokeh and tack sharp at the focus point. Sandip packed everything carefully in a padded bag. Two things to note: the camera menu system is complex if you are coming from Canon, and the original strap is uncomfortable for all-day shooting. But the results speak for themselves. Great rental for the price.', TRUE, NOW() - INTERVAL '18 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid7, owner_b, owner_c, 5, 'Best rental experience ever', 'Rented this for a product photography project for my friend''s clothing brand. The combination of the zoom lens for flat lays and the 35mm for lifestyle shots was perfect. Sandip shared his Lightroom presets which saved me hours in post. The Rode mic was a bonus — I recorded behind-the-scenes content simultaneously. Everything was in mint condition and the checkout process was smooth. Will come back for my next project.', TRUE, NOW() - INTERVAL '10 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid8, owner_b, owner_a, 5, 'Incredible machine for coding', 'Rented the MacBook Pro for a hackathon weekend. The M3 Pro chip handles Docker containers, VS Code with 20+ extensions, and Chrome with 50 tabs without breaking a sweat. The battery lasted almost 14 hours of coding on day one. The display is gorgeous for design work too. Suchandra had it fully wiped and set up with a fresh macOS install. The Spigen case gave me peace of mind. Returned Sunday night and deposit was back by Monday morning.', TRUE, NOW() - INTERVAL '30 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid8, owner_c, owner_a, 4, 'Great for video editing', 'Used this for a week to edit wedding videos in DaVinci Resolve. Timeline scrubbing on 4K footage was butter smooth. The 18GB RAM is enough for most editing workflows but I did hit some limits with complex Fusion compositions. Screen is absolutely stunning — colors are accurate out of the box. Only giving 4 stars because the 512GB storage fills up fast with video projects — had to use an external drive. But that is not really a fault of the rental.', TRUE, NOW() - INTERVAL '15 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid9, owner_a, owner_c, 5, 'Gaming heaven', 'Rented this for a LAN party with friends and it was the star of the show. Cyberpunk 2077 on Ultra at 80+ FPS is not something you forget easily. The 240Hz display makes competitive games like Valorant feel incredibly smooth. Sandip had Steam pre-installed so setup was quick. The per-key RGB keyboard is a nice touch for the gaming ambiance. The 280W charger is massive but necessary. Excellent condition, no dead pixels, no cosmetic damage.', TRUE, NOW() - INTERVAL '10 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid10, owner_a, owner_b, 4, 'Great phone, slightly warm', 'Used the iPhone 15 Pro Max for a week to test before deciding between this and the Samsung. The camera system is incredible — 5x zoom photos are sharp enough for printing. Action mode video stabilization is like having a gimbal. The titanium finish feels premium. Only minor issue — the phone gets noticeably warm during extended 4K ProRes recording. But for regular use, it is the best phone you can rent. Prudvi was professional and punctual with handover.', TRUE, NOW() - INTERVAL '18 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid10, owner_c, owner_b, 5, 'Best mobile camera period', 'Rented this specifically for a 3-day Goa trip to shoot travel content. The 48MP main camera in good light is DSLR-quality. The 5x periscope zoom let me capture distant fort details that looked incredible in my Instagram posts. Night mode with the Ultra Wide lens is stunning too. Battery easily lasted a full day of heavy shooting. Prudvi even included a clear case which saved the phone from a sand incident. Would rent again for any travel photography needs.', TRUE, NOW() - INTERVAL '5 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid11, owner_a, owner_c, 5, 'S Pen changes everything', 'Rented the S24 Ultra for a conference to take handwritten notes with S Pen. The translation feature saved me during a session with Korean speakers. Camera zoom at 100x is gimmicky but the 10x and 30x zoom shots are genuinely usable. Battery lasted a full 12-hour conference day with 30 percent remaining. Sandip was flexible with pickup timing which I really appreciated. The titanium build feels incredibly solid.', TRUE, NOW() - INTERVAL '3 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid12, owner_b, owner_a, 5, 'Best gaming weekend ever', 'Rented the PS5 for a long weekend when friends were visiting from Chennai. Spider-Man 2 with the DualSense haptic feedback is a next-level experience. The Arctis 7P headset Suchandra includes is really good quality — spatial audio in God of War was immersive. Having 8 games to choose from meant everyone found something they liked. The 2TB storage meant we did not have to delete anything. FC 24 multiplayer sessions went late into the night. 10/10 would rent again.', TRUE, NOW() - INTERVAL '35 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid12, owner_c, owner_a, 4, 'Excellent console with minor issue', 'The PS5 and the game collection is incredible value. God of War Ragnarok alone is worth the rental. Only giving 4 stars because the Midnight Black DualSense controller had a slightly sticky R2 trigger. I mentioned it to Suchandra and he immediately offered a ₹200 discount for the inconvenience and said he would fix it. The Cosmic Red controller was perfect. Setup was easy — just connect to WiFi and sign into a temp PSN account he provides.', TRUE, NOW() - INTERVAL '20 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid13, owner_a, owner_c, 5, 'VR blew my mind', 'First time using VR and the Quest 3 exceeded all expectations. Beat Saber is probably the most fun I have had in gaming — ever. The mixed reality passthrough is impressive, it lets you see your real room while virtual objects appear in it. Sandip sanitized the headset thoroughly and the silicone face cover was comfortable. The Elite Strap with Battery is essential — gives you a good 3 hours of play. Resident Evil 4 in VR is terrifyingly good. Only complaint is I wished I rented it for longer.', TRUE, NOW() - INTERVAL '2 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid15, owner_a, owner_a, 4, 'Solid drill for home projects', 'Rented the Bosch drill to install 8 shelves and a TV mount in my new apartment. The impact mode punched through concrete walls easily. The 100-piece accessory set has literally everything you need — HSS bits for metal, masonry bits for concrete, and wood bits for furniture. Prudvi even demonstrated the forward/reverse switch and showed how to change bits. The carry case keeps everything organized. Only took off one star because the chuck was slightly stiff when changing bits, but a drop of oil fixed it.', TRUE, NOW() - INTERVAL '25 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid16, owner_b, owner_c, 5, 'Perfect for Sangeet practice', 'Rented the Yamaha keyboard for 2 weeks to practice for a Sangeet performance. The touch-sensitive keys feel great and the 820 voices include some excellent Indian instrument sounds. The quick sampling feature let me sample a dhol beat and layer it under the keyboard melody. Suchandra included the sustain pedal which made a huge difference for ballads. The X-stand is sturdy and adjustable. The PA-150 adapter is important — batteries drain fast on high volume. Overall excellent rental, would recommend for any music learner.', TRUE, NOW() - INTERVAL '32 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid17, owner_a, owner_b, 5, 'Strat tone is unbeatable', 'The Fender Strat neck pickup clean tone is absolute bliss — glassy, chimey, everything you want from a single coil. The Marshall MG15FX has surprisingly good overdrive on channel 3. Sandip had the guitar set up perfectly — low action, no buzz, intonation spot on. The gig bag and cable are genuine branded accessories which is a nice touch. Played it non-stop for a week, gigged with friends at a cafe in JP Nagar. Pure joy. Will rent the Tele next time if Sandip gets one.', TRUE, NOW() - INTERVAL '8 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid18, owner_a, owner_a, 4, 'Great MTB for beginners', 'Took the Riverside 500 on the Shamirpet trail near Hyderabad. For a budget-friendly MTB, it handles surprisingly well on mild off-road terrain. The disc brakes are confident on steep descents and the Shimano shifting is crisp. The Medium frame fits my 5 foot 7 height perfectly. The front suspension helps with bumps but don''t expect it to handle serious rock gardens. Prudvi included lights and a lock which was thoughtful. Minor issue — the rear derailleur needed a slight adjustment which I did with the included toolkit.', TRUE, NOW() - INTERVAL '22 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid19, owner_b, owner_c, 5, 'Made our Ananthagiri trip epic', 'Rented the complete camping kit for a 2-night trip to Ananthagiri Hills with 3 friends. The Quechua tent sets up in literally 5 minutes — we were shocked. The sleeping bags were warm enough for the 12-degree night temperature. The camping stove cooked our Maggi and chai perfectly. The LED lantern was bright enough to play cards at night. Suchandra even shared his favorite camping spot coordinates via Google Maps. Everything was clean, organized in labeled bags, and easy to carry. This kit is worth every rupee.', TRUE, NOW() - INTERVAL '7 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid19, owner_c, owner_c, 4, 'Great kit, sleeping mats need upgrade', 'Used this for a camping trip to Coorg with family. The tent is spacious for 4 adults and waterproof — it rained on the second night and not a single drop inside. The stove is efficient with gas. Only complaint is the inflatable sleeping mats are a bit thin — could feel the ground through them. But the sleeping bags compensated with good warmth. The first-aid kit was a nice safety touch. Suchandra provided a detailed packing list and setup video which was super helpful for first-time campers.', TRUE, NOW() - INTERVAL '3 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid20, owner_a, owner_a, 5, 'Best house party setup', 'Rented the DJ setup for my birthday party — 60 people in our apartment terrace. The JBL PartyBox 310 is LOUD — filled the entire terrace with clear, bass-heavy sound. The Pioneer DDJ-400 is intuitive even for a beginner DJ like me. Sandip pre-loaded a USB with Bollywood and EDM playlists which was clutch. The LED par lights with the disco ball created an amazing party ambiance. Even at 2 AM (with volume lowered after 10 PM), the party vibe was incredible. Friends are still talking about it. Worth every penny.', TRUE, NOW() - INTERVAL '5 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid20, owner_b, owner_a, 4, 'Great for college event', 'Used this for our college Freshers party. The setup is professional-grade for the price. The DDJ-400 connects easily via USB and the Rekordbox software is free. The JBL speaker handles up to 100 people indoors easily. The karaoke mic was a surprise hit — everyone wanted to sing. Only issue was one of the RGB LED lights had a flickering red LED on certain modes, but the other light was fine. Sandip was responsive on WhatsApp when I asked about the Rekordbox shortcuts. Good rental overall.', TRUE, NOW() - INTERVAL '2 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid21, owner_c, owner_b, 5, 'Saved me from buying luggage', 'Rented the Samsonite set for a 10-day Europe trip. Both bags are incredibly lightweight — the cabin bag was exactly within IndiGo limits. The spinner wheels glide smoothly on airport floors. TSA locks worked perfectly at every security check. The expandable feature on the check-in bag was a lifesaver for souvenirs on the return journey. Suchandra shared the TSA lock code at pickup. Both bags came clean and looked brand new. Perfect rental for occasional travelers who dont want to invest in premium luggage.', TRUE, NOW() - INTERVAL '14 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid22, owner_a, owner_c, 5, 'WFH game changer', 'Rented the Herman Miller Aeron and standing desk for a month while my regular chair was being repaired. The Aeron is everything the hype says — my back pain reduced noticeably within 3 days. The PostureFit SL support is incredible. The Flexispot standing desk with memory presets let me switch between sitting and standing throughout the day. Prudvi helped with desk assembly at my place which was very kind. After using this setup, I am seriously considering buying my own Aeron. Worth every rupee of the rental.', TRUE, NOW() - INTERVAL '28 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid22, owner_c, owner_c, 4, 'Premium setup, delivery was slow', 'The Aeron chair is genuinely life-changing for anyone who works 10+ hours at a desk. The mesh seat breathes well in Hyderabad heat. The standing desk motor is quiet and the anti-collision feature gives peace of mind. Only reason for 4 stars is that the delivery took 2 days instead of the committed next-day. But Prudvi gave a 10 percent discount for the delay. The chair alone is worth the entire rental cost. If you work from home, rent this immediately.', TRUE, NOW() - INTERVAL '16 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid24, owner_b, owner_b, 5, 'Deep cleaned my entire flat', 'Rented the Dyson V15 when shifting into a new apartment. The laser dust detection on the floor head is not a gimmick — it literally shows you dust you cannot see with your eyes. The suction power on Boost mode is insane — pulled out dust from sofa cushions that my regular vacuum missed for years. The LCD screen showing particle count was oddly satisfying. 60-minute battery on Eco mode was enough for my 2BHK. Suchandra had all attachments organized in a box. The vacuum was spotlessly clean despite being used before. Top quality rental.', TRUE, NOW() - INTERVAL '19 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid27, owner_c, owner_b, 4, 'Perfect budget study material', 'As a GATE CSE aspirant, this kit saved me from spending ₹15,000+ on books. The Made Easy notes are comprehensive and well-organized. Suchandra''s personal notes with mnemonics for OS scheduling algorithms and CN protocols were gold. Previous year papers book is essential for practice. Some pages have heavy highlighting but it actually helped me focus on important topics. The Unacademy notes folder he shared as bonus was unexpected and valuable. Would have given 5 stars if the Discrete Math book had less wear on the binding.', TRUE, NOW() - INTERVAL '10 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid27, owner_b, owner_b, 5, 'AIR 234 notes are priceless', 'The value of getting actual topper notes cannot be overstated. Suchandra scored AIR 234 and his annotations on important derivations, frequently asked topics, and shortcut formulas are incredibly helpful. The Made Easy Previous Year Papers book with solutions is well-organized year-wise. I rented for a month during my final revision phase and it made a huge difference in my preparation. The delivery was prompt and Suchandra even answered a few doubts I had over WhatsApp. Exceptional rental experience.', TRUE, NOW() - INTERVAL '4 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid28, owner_a, owner_c, 5, 'Cinematic aerial footage', 'Used the DJI Mini 3 Pro for a real estate property shoot. The 4K footage quality is stunning — clients were blown away by the aerial perspectives. The 3-battery combo gives over 100 minutes which was plenty for a full property shoot including interiors with the vertical mode. ActiveTrack worked perfectly for tracking a person walking through the property. Prudvi was helpful with explaining the DGCA regulations and no-fly zones near the airport. The ND filter set is essential for cinematic 180-degree shutter rule. Highly recommend this drone rental.', TRUE, NOW() - INTERVAL '6 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid28, owner_c, owner_c, 4, 'Great drone, windy day issues', 'Rented the Mini 3 Pro for my Goa travel vlog. The footage quality at 4K60 is incredible for such a small drone. Obstacle avoidance saved me from a palm tree collision which was reassuring. The DJI RC with built-in screen means I did not need to drain my phone battery. Under 249g means no registration hassle. Only issue — on a windy afternoon at the beach, the drone struggled to maintain position and I had to bring it back early. Not really a fault of the rental but worth knowing. Prudvi was great with communication and flexible with return timing.', TRUE, NOW() - INTERVAL '1 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid29, owner_a, owner_a, 5, 'Digital art on another level', 'Rented the iPad Pro + Apple Pencil combo for a 2-week illustration project. Procreate on this display is an absolute dream — the 120Hz ProMotion makes the Pencil feel like actual pen on paper. The Magic Keyboard turned it into a proper laptop for emails and document editing. The matte screen protector Sandip applied adds a paper-like texture that improves the drawing experience significantly. LiDAR scanner was fun to experiment with for AR apps. The 12.9-inch screen is massive and perfect for detailed artwork. Best creative tool rental ever.', TRUE, NOW() - INTERVAL '3 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid30, owner_c, owner_b, 5, 'Perfect party decorations', 'Rented the wedding decoration kit for my best friend''s engagement party at home. The balloon arch kit was surprisingly easy to set up — the included glue dots and arch strip make it straightforward. The Mr and Mrs neon sign was the highlight and everyone wanted photos with it. Fairy lights created a magical ambiance in the evening. Photo booth props were a huge hit — guests loved the silly glasses and mustaches. The mason jars with LED candles looked like something from Pinterest. Suchandra sent a setup guide video which was very helpful. Everything was clean and well-organized in labeled boxes.', TRUE, NOW() - INTERVAL '1 days');

INSERT INTO reviews (listing_id, reviewer_id, owner_id, rating, title, comment, is_verified_rental, created_at)
VALUES (lid30, owner_a, owner_b, 4, 'Fun city bike', 'Rented the Duke 200 for a day to ride around Hyderabad. The bike is punchy in city traffic — the power delivery is smooth and the slipper clutch helps in stop-and-go. The LED headlamp is bright enough for night riding. ABS gives confidence. Prudvi had added a phone mount which was convenient for navigation. Minor issues — the seat gets uncomfortable after about an hour of continuous riding and the rear view bar-end mirrors take getting used to. But for short city blasts, this is a fun machine. Quick handover process at his Kukatpally place.', TRUE, NOW() - INTERVAL '12 days');

END;
$$;
