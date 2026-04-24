-- ================================================================
-- ORMA - Seed Data Generated with 10 items per category
-- Run in Supabase SQL Editor AFTER schema.sql
-- ================================================================

DO $$
DECLARE
  owner_a UUID := '7382e1c1-72d7-4269-a48c-14a4c456d2ed';
  owner_b UUID := '9b922684-338b-4518-9f54-99783be25459';
  owner_c UUID := '0cad79f7-e7fa-4737-93fe-990676bee0c7';

  cat_ids INT[];
BEGIN

  -- ── CLEANUP ──────────────────────────────────────────────────────
  DELETE FROM reviews;
  DELETE FROM wishlists;
  DELETE FROM inquiries;
  DELETE FROM listings;

  -- ── UPDATE PROFILES ──────────────────────────────────────────────
  UPDATE profiles SET
    full_name = 'Suchandra Etti', city = 'Hyderabad', state = 'Telangana',
    bio = 'Tech enthusiast and photography lover. I rent out my gadgets when I''m not using them.',
    phone = '+91 9876543210', is_verified = TRUE, is_owner = TRUE,
    avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  WHERE id = owner_a;

  UPDATE profiles SET
    full_name = 'Prudvi Satya Teja', city = 'Hyderabad', state = 'Telangana',
    bio = 'Mechanical engineering student with a passion for bikes and cars.',
    phone = '+91 9123456789', is_verified = TRUE, is_owner = TRUE,
    avatar_url = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
  WHERE id = owner_b;

  UPDATE profiles SET
    full_name = 'Sandip Pal', city = 'Bangalore', state = 'Karnataka',
    bio = 'Freelance videographer and content creator.',
    phone = '+91 9988776655', is_verified = TRUE, is_owner = TRUE,
    avatar_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  WHERE id = owner_c;


  -- CARS ────────────────────────────────────────────────
  DECLARE cat_id_cars INT;
  BEGIN
    SELECT id INTO cat_id_cars FROM categories WHERE slug = 'cars';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cars,
      'Hyundai Item 1 for Rent',
      'Excellent condition Hyundai item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Hyundai', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      324, 27, NOW() - INTERVAL '49 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_cars,
      'Maruti Suzuki Item 2 for Rent',
      'Excellent condition Maruti Suzuki item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Maruti Suzuki', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      554, 31, NOW() - INTERVAL '20 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_cars,
      'Tata Item 3 for Rent',
      'Excellent condition Tata item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Tata', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      230, 48, NOW() - INTERVAL '19 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cars,
      'Honda Item 4 for Rent',
      'Excellent condition Honda item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Honda', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      30, 0, NOW() - INTERVAL '11 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_cars,
      'Toyota Item 5 for Rent',
      'Excellent condition Toyota item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Toyota', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      608, 42, NOW() - INTERVAL '26 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_cars,
      'Mahindra Item 6 for Rent',
      'Excellent condition Mahindra item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Mahindra', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      648, 15, NOW() - INTERVAL '2 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cars,
      'Kia Item 7 for Rent',
      'Excellent condition Kia item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Kia', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      566, 45, NOW() - INTERVAL '4 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_cars,
      'Ford Item 8 for Rent',
      'Excellent condition Ford item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Ford', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      129, 35, NOW() - INTERVAL '19 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_cars,
      'Renault Item 9 for Rent',
      'Excellent condition Renault item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Renault', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      704, 33, NOW() - INTERVAL '44 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cars,
      'Volkswagen Item 10 for Rent',
      'Excellent condition Volkswagen item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Volkswagen', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      433, 6, NOW() - INTERVAL '50 days'
    );
  END;

  -- BIKES ────────────────────────────────────────────────
  DECLARE cat_id_bikes INT;
  BEGIN
    SELECT id INTO cat_id_bikes FROM categories WHERE slug = 'bikes';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_bikes,
      'Royal Enfield Item 1 for Rent',
      'Excellent condition Royal Enfield item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Royal Enfield', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', 'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      52, 26, NOW() - INTERVAL '7 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_bikes,
      'KTM Item 2 for Rent',
      'Excellent condition KTM item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'KTM', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      895, 19, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_bikes,
      'Honda Item 3 for Rent',
      'Excellent condition Honda item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Honda', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      975, 36, NOW() - INTERVAL '22 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_bikes,
      'Yamaha Item 4 for Rent',
      'Excellent condition Yamaha item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Yamaha', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', 'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      985, 35, NOW() - INTERVAL '7 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_bikes,
      'TVS Item 5 for Rent',
      'Excellent condition TVS item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'TVS', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', 'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      657, 48, NOW() - INTERVAL '14 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_bikes,
      'Bajaj Item 6 for Rent',
      'Excellent condition Bajaj item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Bajaj', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      918, 19, NOW() - INTERVAL '35 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_bikes,
      'Hero Item 7 for Rent',
      'Excellent condition Hero item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Hero', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      828, 0, NOW() - INTERVAL '9 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_bikes,
      'Suzuki Item 8 for Rent',
      'Excellent condition Suzuki item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Suzuki', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', 'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      176, 29, NOW() - INTERVAL '23 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_bikes,
      'Ather Item 9 for Rent',
      'Excellent condition Ather item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Ather', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', 'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      351, 45, NOW() - INTERVAL '6 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_bikes,
      'Ola Electric Item 10 for Rent',
      'Excellent condition Ola Electric item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Ola Electric', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      756, 38, NOW() - INTERVAL '28 days'
    );
  END;

  -- CAMERAS ────────────────────────────────────────────────
  DECLARE cat_id_cameras INT;
  BEGIN
    SELECT id INTO cat_id_cameras FROM categories WHERE slug = 'cameras';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cameras,
      'Canon Item 1 for Rent',
      'Excellent condition Canon item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Canon', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800', 'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      572, 36, NOW() - INTERVAL '36 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_cameras,
      'Sony Item 2 for Rent',
      'Excellent condition Sony item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Sony', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800', 'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800', 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      691, 18, NOW() - INTERVAL '29 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_cameras,
      'Nikon Item 3 for Rent',
      'Excellent condition Nikon item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Nikon', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800', 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      388, 1, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cameras,
      'Fujifilm Item 4 for Rent',
      'Excellent condition Fujifilm item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Fujifilm', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      412, 3, NOW() - INTERVAL '17 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_cameras,
      'Panasonic Item 5 for Rent',
      'Excellent condition Panasonic item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Panasonic', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800', 'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      926, 8, NOW() - INTERVAL '16 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_cameras,
      'Olympus Item 6 for Rent',
      'Excellent condition Olympus item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Olympus', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800', 'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800', 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      94, 45, NOW() - INTERVAL '2 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cameras,
      'Leica Item 7 for Rent',
      'Excellent condition Leica item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Leica', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800', 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      340, 47, NOW() - INTERVAL '5 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_cameras,
      'GoPro Item 8 for Rent',
      'Excellent condition GoPro item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'GoPro', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      298, 4, NOW() - INTERVAL '11 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_cameras,
      'DJI Item 9 for Rent',
      'Excellent condition DJI item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'DJI', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800', 'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      838, 29, NOW() - INTERVAL '15 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_cameras,
      'Pentax Item 10 for Rent',
      'Excellent condition Pentax item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Pentax', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800', 'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800', 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      550, 18, NOW() - INTERVAL '20 days'
    );
  END;

  -- LAPTOPS ────────────────────────────────────────────────
  DECLARE cat_id_laptops INT;
  BEGIN
    SELECT id INTO cat_id_laptops FROM categories WHERE slug = 'laptops';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_laptops,
      'Apple Item 1 for Rent',
      'Excellent condition Apple item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Apple', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      155, 31, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_laptops,
      'ASUS Item 2 for Rent',
      'Excellent condition ASUS item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'ASUS', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      697, 38, NOW() - INTERVAL '55 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_laptops,
      'Dell Item 3 for Rent',
      'Excellent condition Dell item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Dell', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      285, 0, NOW() - INTERVAL '11 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_laptops,
      'HP Item 4 for Rent',
      'Excellent condition HP item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'HP', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      419, 29, NOW() - INTERVAL '1 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_laptops,
      'Lenovo Item 5 for Rent',
      'Excellent condition Lenovo item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Lenovo', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      739, 40, NOW() - INTERVAL '24 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_laptops,
      'Acer Item 6 for Rent',
      'Excellent condition Acer item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Acer', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      936, 36, NOW() - INTERVAL '30 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_laptops,
      'MSI Item 7 for Rent',
      'Excellent condition MSI item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'MSI', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      344, 8, NOW() - INTERVAL '40 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_laptops,
      'Microsoft Item 8 for Rent',
      'Excellent condition Microsoft item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Microsoft', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      106, 10, NOW() - INTERVAL '59 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_laptops,
      'Razer Item 9 for Rent',
      'Excellent condition Razer item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Razer', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      226, 24, NOW() - INTERVAL '53 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_laptops,
      'Samsung Item 10 for Rent',
      'Excellent condition Samsung item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Samsung', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      786, 35, NOW() - INTERVAL '28 days'
    );
  END;

  -- SMARTPHONES ────────────────────────────────────────────────
  DECLARE cat_id_smartphones INT;
  BEGIN
    SELECT id INTO cat_id_smartphones FROM categories WHERE slug = 'smartphones';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_smartphones,
      'Apple Item 1 for Rent',
      'Excellent condition Apple item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Apple', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      662, 49, NOW() - INTERVAL '54 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_smartphones,
      'Samsung Item 2 for Rent',
      'Excellent condition Samsung item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Samsung', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      80, 42, NOW() - INTERVAL '4 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_smartphones,
      'Google Item 3 for Rent',
      'Excellent condition Google item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Google', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      349, 35, NOW() - INTERVAL '45 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_smartphones,
      'OnePlus Item 4 for Rent',
      'Excellent condition OnePlus item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'OnePlus', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      226, 49, NOW() - INTERVAL '3 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_smartphones,
      'Xiaomi Item 5 for Rent',
      'Excellent condition Xiaomi item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Xiaomi', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      84, 11, NOW() - INTERVAL '20 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_smartphones,
      'Vivo Item 6 for Rent',
      'Excellent condition Vivo item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Vivo', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      683, 26, NOW() - INTERVAL '22 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_smartphones,
      'Oppo Item 7 for Rent',
      'Excellent condition Oppo item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Oppo', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      997, 30, NOW() - INTERVAL '57 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_smartphones,
      'Realme Item 8 for Rent',
      'Excellent condition Realme item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Realme', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      46, 0, NOW() - INTERVAL '44 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_smartphones,
      'Nothing Item 9 for Rent',
      'Excellent condition Nothing item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Nothing', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      703, 35, NOW() - INTERVAL '22 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_smartphones,
      'Motorola Item 10 for Rent',
      'Excellent condition Motorola item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Motorola', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      467, 27, NOW() - INTERVAL '43 days'
    );
  END;

  -- GAMING ────────────────────────────────────────────────
  DECLARE cat_id_gaming INT;
  BEGIN
    SELECT id INTO cat_id_gaming FROM categories WHERE slug = 'gaming';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_gaming,
      'Sony Item 1 for Rent',
      'Excellent condition Sony item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Sony', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      214, 49, NOW() - INTERVAL '10 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_gaming,
      'Microsoft Item 2 for Rent',
      'Excellent condition Microsoft item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Microsoft', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      945, 45, NOW() - INTERVAL '57 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_gaming,
      'Nintendo Item 3 for Rent',
      'Excellent condition Nintendo item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Nintendo', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      575, 15, NOW() - INTERVAL '3 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_gaming,
      'Meta Item 4 for Rent',
      'Excellent condition Meta item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Meta', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      247, 10, NOW() - INTERVAL '7 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_gaming,
      'Razer Item 5 for Rent',
      'Excellent condition Razer item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Razer', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      326, 12, NOW() - INTERVAL '54 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_gaming,
      'Logitech Item 6 for Rent',
      'Excellent condition Logitech item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Logitech', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      731, 29, NOW() - INTERVAL '26 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_gaming,
      'Corsair Item 7 for Rent',
      'Excellent condition Corsair item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Corsair', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      84, 28, NOW() - INTERVAL '40 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_gaming,
      'HyperX Item 8 for Rent',
      'Excellent condition HyperX item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'HyperX', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      235, 13, NOW() - INTERVAL '57 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_gaming,
      'SteelSeries Item 9 for Rent',
      'Excellent condition SteelSeries item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'SteelSeries', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      105, 41, NOW() - INTERVAL '15 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_gaming,
      'ASUS Item 10 for Rent',
      'Excellent condition ASUS item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'ASUS', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      673, 1, NOW() - INTERVAL '32 days'
    );
  END;

  -- TOOLS ────────────────────────────────────────────────
  DECLARE cat_id_tools INT;
  BEGIN
    SELECT id INTO cat_id_tools FROM categories WHERE slug = 'tools';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_tools,
      'Bosch Item 1 for Rent',
      'Excellent condition Bosch item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Bosch', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800', 'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      917, 5, NOW() - INTERVAL '42 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_tools,
      'DeWalt Item 2 for Rent',
      'Excellent condition DeWalt item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'DeWalt', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800', 'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800', 'https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      33, 10, NOW() - INTERVAL '26 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_tools,
      'Makita Item 3 for Rent',
      'Excellent condition Makita item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Makita', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800', 'https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      252, 12, NOW() - INTERVAL '38 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_tools,
      'Black+Decker Item 4 for Rent',
      'Excellent condition Black+Decker item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Black+Decker', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      752, 46, NOW() - INTERVAL '20 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_tools,
      'Milwaukee Item 5 for Rent',
      'Excellent condition Milwaukee item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Milwaukee', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800', 'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      225, 38, NOW() - INTERVAL '56 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_tools,
      'Stanley Item 6 for Rent',
      'Excellent condition Stanley item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Stanley', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800', 'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800', 'https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      927, 9, NOW() - INTERVAL '35 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_tools,
      'Hitachi Item 7 for Rent',
      'Excellent condition Hitachi item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Hitachi', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800', 'https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      899, 19, NOW() - INTERVAL '31 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_tools,
      'Ryobi Item 8 for Rent',
      'Excellent condition Ryobi item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Ryobi', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      310, 35, NOW() - INTERVAL '5 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_tools,
      'Craftsman Item 9 for Rent',
      'Excellent condition Craftsman item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Craftsman', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800', 'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      55, 13, NOW() - INTERVAL '0 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_tools,
      'Hilti Item 10 for Rent',
      'Excellent condition Hilti item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Hilti', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800', 'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800', 'https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      296, 22, NOW() - INTERVAL '14 days'
    );
  END;

  -- SPORTS ────────────────────────────────────────────────
  DECLARE cat_id_sports INT;
  BEGIN
    SELECT id INTO cat_id_sports FROM categories WHERE slug = 'sports';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_sports,
      'Decathlon Item 1 for Rent',
      'Excellent condition Decathlon item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Decathlon', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      188, 6, NOW() - INTERVAL '29 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_sports,
      'Yonex Item 2 for Rent',
      'Excellent condition Yonex item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Yonex', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      858, 41, NOW() - INTERVAL '22 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_sports,
      'Wilson Item 3 for Rent',
      'Excellent condition Wilson item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Wilson', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      852, 10, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_sports,
      'Spalding Item 4 for Rent',
      'Excellent condition Spalding item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Spalding', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      665, 25, NOW() - INTERVAL '2 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_sports,
      'Nike Item 5 for Rent',
      'Excellent condition Nike item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Nike', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      670, 42, NOW() - INTERVAL '2 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_sports,
      'Adidas Item 6 for Rent',
      'Excellent condition Adidas item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Adidas', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      94, 49, NOW() - INTERVAL '58 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_sports,
      'Puma Item 7 for Rent',
      'Excellent condition Puma item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Puma', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      876, 16, NOW() - INTERVAL '5 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_sports,
      'Under Armour Item 8 for Rent',
      'Excellent condition Under Armour item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Under Armour', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      727, 22, NOW() - INTERVAL '55 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_sports,
      'Babolat Item 9 for Rent',
      'Excellent condition Babolat item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Babolat', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      481, 45, NOW() - INTERVAL '50 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_sports,
      'Head Item 10 for Rent',
      'Excellent condition Head item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Head', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      444, 19, NOW() - INTERVAL '35 days'
    );
  END;

  -- MUSICAL-INSTRUMENTS ────────────────────────────────────────────────
  DECLARE cat_id_musical_instruments INT;
  BEGIN
    SELECT id INTO cat_id_musical_instruments FROM categories WHERE slug = 'musical-instruments';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_musical_instruments,
      'Yamaha Item 1 for Rent',
      'Excellent condition Yamaha item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Yamaha', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800', 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      799, 6, NOW() - INTERVAL '37 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_musical_instruments,
      'Fender Item 2 for Rent',
      'Excellent condition Fender item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Fender', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800', 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      299, 9, NOW() - INTERVAL '36 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_musical_instruments,
      'Roland Item 3 for Rent',
      'Excellent condition Roland item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Roland', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800', 'https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      497, 2, NOW() - INTERVAL '23 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_musical_instruments,
      'Korg Item 4 for Rent',
      'Excellent condition Korg item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Korg', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800', 'https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      696, 44, NOW() - INTERVAL '59 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_musical_instruments,
      'Casio Item 5 for Rent',
      'Excellent condition Casio item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Casio', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800', 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      845, 17, NOW() - INTERVAL '39 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_musical_instruments,
      'Gibson Item 6 for Rent',
      'Excellent condition Gibson item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Gibson', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800', 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      375, 42, NOW() - INTERVAL '13 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_musical_instruments,
      'Ibanez Item 7 for Rent',
      'Excellent condition Ibanez item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Ibanez', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800', 'https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      317, 43, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_musical_instruments,
      'Epiphone Item 8 for Rent',
      'Excellent condition Epiphone item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Epiphone', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800', 'https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      136, 48, NOW() - INTERVAL '47 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_musical_instruments,
      'PRS Item 9 for Rent',
      'Excellent condition PRS item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'PRS', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800', 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      973, 34, NOW() - INTERVAL '58 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_musical_instruments,
      'Taylor Item 10 for Rent',
      'Excellent condition Taylor item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Taylor', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800', 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      365, 43, NOW() - INTERVAL '4 days'
    );
  END;

  -- EVENTS ────────────────────────────────────────────────
  DECLARE cat_id_events INT;
  BEGIN
    SELECT id INTO cat_id_events FROM categories WHERE slug = 'events';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_events,
      'Pioneer Item 1 for Rent',
      'Excellent condition Pioneer item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Pioneer', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      991, 8, NOW() - INTERVAL '3 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_events,
      'JBL Item 2 for Rent',
      'Excellent condition JBL item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'JBL', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      671, 40, NOW() - INTERVAL '14 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_events,
      'Bose Item 3 for Rent',
      'Excellent condition Bose item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Bose', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', 'https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      501, 25, NOW() - INTERVAL '34 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_events,
      'Shure Item 4 for Rent',
      'Excellent condition Shure item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Shure', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', 'https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      305, 9, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_events,
      'Sennheiser Item 5 for Rent',
      'Excellent condition Sennheiser item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Sennheiser', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      354, 17, NOW() - INTERVAL '50 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_events,
      'Sony Item 6 for Rent',
      'Excellent condition Sony item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Sony', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      113, 12, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_events,
      'Custom Item 7 for Rent',
      'Excellent condition Custom item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Custom', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', 'https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      474, 17, NOW() - INTERVAL '31 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_events,
      'Generic Item 8 for Rent',
      'Excellent condition Generic item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Generic', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', 'https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      636, 14, NOW() - INTERVAL '40 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_events,
      'Eventizer Item 9 for Rent',
      'Excellent condition Eventizer item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Eventizer', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      677, 25, NOW() - INTERVAL '31 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_events,
      'PartyProps Item 10 for Rent',
      'Excellent condition PartyProps item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'PartyProps', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      162, 44, NOW() - INTERVAL '50 days'
    );
  END;

  -- TRAVEL ────────────────────────────────────────────────
  DECLARE cat_id_travel INT;
  BEGIN
    SELECT id INTO cat_id_travel FROM categories WHERE slug = 'travel';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_travel,
      'Samsonite Item 1 for Rent',
      'Excellent condition Samsonite item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Samsonite', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      198, 12, NOW() - INTERVAL '2 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_travel,
      'American Tourister Item 2 for Rent',
      'Excellent condition American Tourister item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'American Tourister', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      638, 49, NOW() - INTERVAL '4 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_travel,
      'Quechua Item 3 for Rent',
      'Excellent condition Quechua item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Quechua', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      430, 17, NOW() - INTERVAL '24 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_travel,
      'Safari Item 4 for Rent',
      'Excellent condition Safari item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Safari', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      273, 17, NOW() - INTERVAL '48 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_travel,
      'VIP Item 5 for Rent',
      'Excellent condition VIP item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'VIP', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      152, 23, NOW() - INTERVAL '20 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_travel,
      'Skybags Item 6 for Rent',
      'Excellent condition Skybags item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Skybags', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      118, 17, NOW() - INTERVAL '50 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_travel,
      'Delsey Item 7 for Rent',
      'Excellent condition Delsey item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Delsey', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      959, 29, NOW() - INTERVAL '33 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_travel,
      'Wildcraft Item 8 for Rent',
      'Excellent condition Wildcraft item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Wildcraft', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      851, 7, NOW() - INTERVAL '25 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_travel,
      'Victorinox Item 9 for Rent',
      'Excellent condition Victorinox item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Victorinox', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      391, 17, NOW() - INTERVAL '21 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_travel,
      'Aristocrat Item 10 for Rent',
      'Excellent condition Aristocrat item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Aristocrat', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      259, 21, NOW() - INTERVAL '15 days'
    );
  END;

  -- FURNITURE ────────────────────────────────────────────────
  DECLARE cat_id_furniture INT;
  BEGIN
    SELECT id INTO cat_id_furniture FROM categories WHERE slug = 'furniture';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_furniture,
      'Herman Miller Item 1 for Rent',
      'Excellent condition Herman Miller item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Herman Miller', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      233, 37, NOW() - INTERVAL '20 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_furniture,
      'IKEA Item 2 for Rent',
      'Excellent condition IKEA item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'IKEA', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      434, 2, NOW() - INTERVAL '45 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_furniture,
      'Godrej Item 3 for Rent',
      'Excellent condition Godrej item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Godrej', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      174, 44, NOW() - INTERVAL '17 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_furniture,
      'Urban Ladder Item 4 for Rent',
      'Excellent condition Urban Ladder item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Urban Ladder', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      336, 6, NOW() - INTERVAL '10 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_furniture,
      'Pepperfry Item 5 for Rent',
      'Excellent condition Pepperfry item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Pepperfry', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      699, 19, NOW() - INTERVAL '21 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_furniture,
      'Home Centre Item 6 for Rent',
      'Excellent condition Home Centre item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Home Centre', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      693, 21, NOW() - INTERVAL '18 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_furniture,
      'Steelcase Item 7 for Rent',
      'Excellent condition Steelcase item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Steelcase', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      231, 11, NOW() - INTERVAL '8 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_furniture,
      'Wakefit Item 8 for Rent',
      'Excellent condition Wakefit item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Wakefit', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      360, 9, NOW() - INTERVAL '49 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_furniture,
      'Durian Item 9 for Rent',
      'Excellent condition Durian item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Durian', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      652, 4, NOW() - INTERVAL '51 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_furniture,
      'Nilkamal Item 10 for Rent',
      'Excellent condition Nilkamal item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Nilkamal', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      208, 35, NOW() - INTERVAL '45 days'
    );
  END;

  -- APPLIANCES ────────────────────────────────────────────────
  DECLARE cat_id_appliances INT;
  BEGIN
    SELECT id INTO cat_id_appliances FROM categories WHERE slug = 'appliances';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_appliances,
      'Dyson Item 1 for Rent',
      'Excellent condition Dyson item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Dyson', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800', 'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      779, 2, NOW() - INTERVAL '1 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_appliances,
      'LG Item 2 for Rent',
      'Excellent condition LG item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'LG', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      500, 43, NOW() - INTERVAL '12 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_appliances,
      'Samsung Item 3 for Rent',
      'Excellent condition Samsung item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Samsung', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      732, 49, NOW() - INTERVAL '31 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_appliances,
      'Whirlpool Item 4 for Rent',
      'Excellent condition Whirlpool item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Whirlpool', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800', 'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      828, 26, NOW() - INTERVAL '35 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_appliances,
      'Bosch Item 5 for Rent',
      'Excellent condition Bosch item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Bosch', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800', 'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      899, 14, NOW() - INTERVAL '18 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_appliances,
      'IFB Item 6 for Rent',
      'Excellent condition IFB item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'IFB', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      415, 48, NOW() - INTERVAL '42 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_appliances,
      'Panasonic Item 7 for Rent',
      'Excellent condition Panasonic item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Panasonic', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      652, 22, NOW() - INTERVAL '23 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_appliances,
      'Voltas Item 8 for Rent',
      'Excellent condition Voltas item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Voltas', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800', 'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      23, 7, NOW() - INTERVAL '17 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_appliances,
      'Blue Star Item 9 for Rent',
      'Excellent condition Blue Star item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Blue Star', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800', 'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      523, 40, NOW() - INTERVAL '58 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_appliances,
      'Daikin Item 10 for Rent',
      'Excellent condition Daikin item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Daikin', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      458, 5, NOW() - INTERVAL '49 days'
    );
  END;

  -- CLOTHING ────────────────────────────────────────────────
  DECLARE cat_id_clothing INT;
  BEGIN
    SELECT id INTO cat_id_clothing FROM categories WHERE slug = 'clothing';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_clothing,
      'Manyavar Item 1 for Rent',
      'Excellent condition Manyavar item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Manyavar', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      79, 18, NOW() - INTERVAL '55 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_clothing,
      'Raymond Item 2 for Rent',
      'Excellent condition Raymond item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Raymond', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      356, 46, NOW() - INTERVAL '20 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_clothing,
      'FabIndia Item 3 for Rent',
      'Excellent condition FabIndia item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'FabIndia', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      37, 41, NOW() - INTERVAL '39 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_clothing,
      'Biba Item 4 for Rent',
      'Excellent condition Biba item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Biba', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      123, 34, NOW() - INTERVAL '9 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_clothing,
      'W Item 5 for Rent',
      'Excellent condition W item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'W', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      736, 16, NOW() - INTERVAL '55 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_clothing,
      'Aurelia Item 6 for Rent',
      'Excellent condition Aurelia item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Aurelia', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      148, 48, NOW() - INTERVAL '50 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_clothing,
      'Soch Item 7 for Rent',
      'Excellent condition Soch item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Soch', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      507, 27, NOW() - INTERVAL '44 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_clothing,
      'Mohey Item 8 for Rent',
      'Excellent condition Mohey item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Mohey', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      988, 40, NOW() - INTERVAL '49 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_clothing,
      'Meena Bazaar Item 9 for Rent',
      'Excellent condition Meena Bazaar item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Meena Bazaar', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      314, 18, NOW() - INTERVAL '29 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_clothing,
      'Ritu Kumar Item 10 for Rent',
      'Excellent condition Ritu Kumar item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Ritu Kumar', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      668, 15, NOW() - INTERVAL '57 days'
    );
  END;

  -- BOOKS ────────────────────────────────────────────────
  DECLARE cat_id_books INT;
  BEGIN
    SELECT id INTO cat_id_books FROM categories WHERE slug = 'books';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_books,
      'Made Easy Item 1 for Rent',
      'Excellent condition Made Easy item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Made Easy', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      862, 11, NOW() - INTERVAL '9 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_books,
      'Pearson Item 2 for Rent',
      'Excellent condition Pearson item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Pearson', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      51, 5, NOW() - INTERVAL '17 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_books,
      'McGraw Hill Item 3 for Rent',
      'Excellent condition McGraw Hill item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'McGraw Hill', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      914, 37, NOW() - INTERVAL '47 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_books,
      'Arihant Item 4 for Rent',
      'Excellent condition Arihant item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Arihant', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      491, 43, NOW() - INTERVAL '33 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_books,
      'Oswaal Item 5 for Rent',
      'Excellent condition Oswaal item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Oswaal', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      676, 48, NOW() - INTERVAL '12 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_books,
      'S. Chand Item 6 for Rent',
      'Excellent condition S. Chand item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'S. Chand', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      82, 47, NOW() - INTERVAL '52 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_books,
      'Oxford Item 7 for Rent',
      'Excellent condition Oxford item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Oxford', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      957, 27, NOW() - INTERVAL '1 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_books,
      'Cambridge Item 8 for Rent',
      'Excellent condition Cambridge item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Cambridge', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      217, 1, NOW() - INTERVAL '57 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_books,
      'Penguin Item 9 for Rent',
      'Excellent condition Penguin item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Penguin', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      748, 27, NOW() - INTERVAL '2 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_books,
      'HarperCollins Item 10 for Rent',
      'Excellent condition HarperCollins item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'HarperCollins', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      200, 39, NOW() - INTERVAL '52 days'
    );
  END;

  -- OTHERS ────────────────────────────────────────────────
  DECLARE cat_id_others INT;
  BEGIN
    SELECT id INTO cat_id_others FROM categories WHERE slug = 'others';

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_others,
      'DJI Item 1 for Rent',
      'Excellent condition DJI item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'DJI', 'Model 1',
      ARRAY['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800', 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800'],
      500, 2500, 7500, 1500,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      645, 30, NOW() - INTERVAL '18 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_others,
      'Epson Item 2 for Rent',
      'Excellent condition Epson item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Epson', 'Model 2',
      ARRAY['https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800'],
      600, 3000, 9000, 1800,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      161, 39, NOW() - INTERVAL '14 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_others,
      'Sony Item 3 for Rent',
      'Excellent condition Sony item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Sony', 'Model 3',
      ARRAY['https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
      700, 3500, 10500, 2100,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      797, 14, NOW() - INTERVAL '44 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_others,
      'Apple Item 4 for Rent',
      'Excellent condition Apple item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Apple', 'Model 4',
      ARRAY['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800', 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800'],
      800, 4000, 12000, 2400,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      89, 39, NOW() - INTERVAL '31 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_others,
      'Generic Item 5 for Rent',
      'Excellent condition Generic item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Generic', 'Model 5',
      ARRAY['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800', 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800'],
      900, 4500, 13500, 2700,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      966, 11, NOW() - INTERVAL '59 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_others,
      'Custom Item 6 for Rent',
      'Excellent condition Custom item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Custom', 'Model 6',
      ARRAY['https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800'],
      1000, 5000, 15000, 3000,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      640, 24, NOW() - INTERVAL '59 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_others,
      'Unknown Item 7 for Rent',
      'Excellent condition Unknown item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Unknown', 'Model 7',
      ARRAY['https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
      1100, 5500, 16500, 3300,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      781, 8, NOW() - INTERVAL '10 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_b, cat_id_others,
      'Various Item 8 for Rent',
      'Excellent condition Various item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Various', 'Model 8',
      ARRAY['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800', 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800'],
      1200, 6000, 18000, 3600,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      152, 48, NOW() - INTERVAL '12 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_c, cat_id_others,
      'Mixed Item 9 for Rent',
      'Excellent condition Mixed item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Mixed', 'Model 9',
      ARRAY['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800', 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800'],
      1300, 6500, 19500, 3900,
      'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      683, 37, NOW() - INTERVAL '25 days'
    );

    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      owner_a, cat_id_others,
      'Bundle Item 10 for Rent',
      'Excellent condition Bundle item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', 'Bundle', 'Model 10',
      ARRAY['https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800'],
      1400, 7000, 21000, 4200,
      'Bangalore', 'Koramangala', 'Karnataka', '560034',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      126, 46, NOW() - INTERVAL '48 days'
    );
  END;

END;
$$;
