-- Auto-generated seed data for missing items
DO $$
DECLARE
  owner_a UUID := '7382e1c1-72d7-4269-a48c-14a4c456d2ed';
  owner_b UUID := '9b922684-338b-4518-9f54-99783be25459';
  owner_c UUID := '0cad79f7-e7fa-4737-93fe-990676bee0c7';
  cat_id INT;
BEGIN

  SELECT id INTO cat_id FROM categories WHERE slug = 'cars';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Mahindra Swift - Perfect for rent in Bangalore', 'Excellent Mahindra Swift available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Mahindra', 'Swift', ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop'],
    3200, 16000, 48000, 32000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    35, 14, NOW() - INTERVAL '42 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Maruti Suzuki Swift - Perfect for rent in Hyderabad', 'Excellent Maruti Suzuki Swift available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Maruti Suzuki', 'Swift', ARRAY['https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'],
    3200, 16000, 48000, 32000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    122, 19, NOW() - INTERVAL '16 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Mahindra City - Perfect for rent in Bangalore', 'Excellent Mahindra City available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Mahindra', 'City', ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop'],
    3600, 18000, 54000, 36000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    352, 15, NOW() - INTERVAL '1 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Maruti Suzuki Nexon - Perfect for rent in Hyderabad', 'Excellent Maruti Suzuki Nexon available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Maruti Suzuki', 'Nexon', ARRAY['https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    114, 1, NOW() - INTERVAL '53 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Maruti Suzuki Creta - Perfect for rent in Hyderabad', 'Excellent Maruti Suzuki Creta available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Maruti Suzuki', 'Creta', ARRAY['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    160, 7, NOW() - INTERVAL '32 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Mahindra Swift - Perfect for rent in Hyderabad', 'Excellent Mahindra Swift available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Mahindra', 'Swift', ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'],
    2400, 12000, 36000, 24000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    401, 4, NOW() - INTERVAL '31 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Hyundai Swift - Perfect for rent in Bangalore', 'Excellent Hyundai Swift available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Hyundai', 'Swift', ARRAY['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'],
    3600, 18000, 54000, 36000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    490, 12, NOW() - INTERVAL '12 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Honda Creta - Perfect for rent in Bangalore', 'Excellent Honda Creta available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Honda', 'Creta', ARRAY['https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'],
    4000, 20000, 60000, 40000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    131, 7, NOW() - INTERVAL '16 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Hyundai Creta - Perfect for rent in Hyderabad', 'Excellent Hyundai Creta available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Hyundai', 'Creta', ARRAY['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop'],
    4000, 20000, 60000, 40000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    214, 9, NOW() - INTERVAL '5 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Tata XUV700 - Perfect for rent in Bangalore', 'Excellent Tata XUV700 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Tata', 'XUV700', ARRAY['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'],
    4000, 20000, 60000, 40000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    158, 5, NOW() - INTERVAL '2 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'bikes';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Honda Pulsar NS200 - Perfect for rent in Hyderabad', 'Excellent Honda Pulsar NS200 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Honda', 'Pulsar NS200', ARRAY['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop'],
    1600, 8000, 24000, 16000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    440, 7, NOW() - INTERVAL '58 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Bajaj CB350 - Perfect for rent in Bangalore', 'Excellent Bajaj CB350 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Bajaj', 'CB350', ARRAY['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop'],
    960, 4800, 14400, 9600,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    352, 20, NOW() - INTERVAL '21 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'KTM Duke 200 - Perfect for rent in Bangalore', 'Excellent KTM Duke 200 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'KTM', 'Duke 200', ARRAY['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop'],
    1120, 5600, 16800, 11200,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    326, 17, NOW() - INTERVAL '29 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Yamaha R15 V4 - Perfect for rent in Bangalore', 'Excellent Yamaha R15 V4 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Yamaha', 'R15 V4', ARRAY['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop'],
    960, 4800, 14400, 9600,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    205, 8, NOW() - INTERVAL '46 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'KTM Pulsar NS200 - Perfect for rent in Hyderabad', 'Excellent KTM Pulsar NS200 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'KTM', 'Pulsar NS200', ARRAY['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop'],
    1280, 6400, 19200, 12800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    473, 9, NOW() - INTERVAL '6 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Yamaha Himalayan - Perfect for rent in Hyderabad', 'Excellent Yamaha Himalayan available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Yamaha', 'Himalayan', ARRAY['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop'],
    1280, 6400, 19200, 12800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    453, 7, NOW() - INTERVAL '26 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Honda R15 V4 - Perfect for rent in Hyderabad', 'Excellent Honda R15 V4 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'Honda', 'R15 V4', ARRAY['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop'],
    1440, 7200, 21600, 14400,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    277, 5, NOW() - INTERVAL '14 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'KTM Pulsar NS200 - Perfect for rent in Hyderabad', 'Excellent KTM Pulsar NS200 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'KTM', 'Pulsar NS200', ARRAY['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop'],
    800, 4000, 12000, 8000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    250, 6, NOW() - INTERVAL '46 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Bajaj Pulsar NS200 - Perfect for rent in Hyderabad', 'Excellent Bajaj Pulsar NS200 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Bajaj', 'Pulsar NS200', ARRAY['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop'],
    1280, 6400, 19200, 12800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    315, 12, NOW() - INTERVAL '4 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'KTM Himalayan - Perfect for rent in Bangalore', 'Excellent KTM Himalayan available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'KTM', 'Himalayan', ARRAY['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop'],
    1120, 5600, 16800, 11200,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    273, 5, NOW() - INTERVAL '44 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'cameras';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Fujifilm Lumix GH6 - Perfect for rent in Bangalore', 'Excellent Fujifilm Lumix GH6 available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'Fujifilm', 'Lumix GH6', ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop'],
    1500, 7500, 22500, 15000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    13, 2, NOW() - INTERVAL '16 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Sony Lumix GH6 - Perfect for rent in Bangalore', 'Excellent Sony Lumix GH6 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Sony', 'Lumix GH6', ARRAY['https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop'],
    2700, 13500, 40500, 27000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    224, 19, NOW() - INTERVAL '4 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Nikon Lumix GH6 - Perfect for rent in Hyderabad', 'Excellent Nikon Lumix GH6 available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Nikon', 'Lumix GH6', ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop'],
    3000, 15000, 45000, 30000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    138, 8, NOW() - INTERVAL '49 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Sony Z6 II - Perfect for rent in Hyderabad', 'Excellent Sony Z6 II available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Sony', 'Z6 II', ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop'],
    1800, 9000, 27000, 18000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    356, 20, NOW() - INTERVAL '46 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Nikon X-T4 - Perfect for rent in Bangalore', 'Excellent Nikon X-T4 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Nikon', 'X-T4', ARRAY['https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop'],
    3000, 15000, 45000, 30000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    285, 14, NOW() - INTERVAL '33 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Fujifilm EOS R6 - Perfect for rent in Hyderabad', 'Excellent Fujifilm EOS R6 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Fujifilm', 'EOS R6', ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop'],
    3000, 15000, 45000, 30000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    216, 3, NOW() - INTERVAL '54 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Fujifilm Lumix GH6 - Perfect for rent in Bangalore', 'Excellent Fujifilm Lumix GH6 available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Fujifilm', 'Lumix GH6', ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop'],
    3000, 15000, 45000, 30000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    176, 2, NOW() - INTERVAL '7 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Sony EOS R6 - Perfect for rent in Bangalore', 'Excellent Sony EOS R6 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Sony', 'EOS R6', ARRAY['https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop'],
    1500, 7500, 22500, 15000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    107, 2, NOW() - INTERVAL '19 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Fujifilm Z6 II - Perfect for rent in Bangalore', 'Excellent Fujifilm Z6 II available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Fujifilm', 'Z6 II', ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop'],
    1500, 7500, 22500, 15000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    290, 13, NOW() - INTERVAL '43 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Nikon X-T4 - Perfect for rent in Bangalore', 'Excellent Nikon X-T4 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Nikon', 'X-T4', ARRAY['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop'],
    3000, 15000, 45000, 30000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    184, 14, NOW() - INTERVAL '4 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'laptops';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'HP MacBook Pro 14 - Perfect for rent in Hyderabad', 'Excellent HP MacBook Pro 14 available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'HP', 'MacBook Pro 14', ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    142, 16, NOW() - INTERVAL '3 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Lenovo Spectre x360 - Perfect for rent in Hyderabad', 'Excellent Lenovo Spectre x360 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Lenovo', 'Spectre x360', ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'],
    1400, 7000, 21000, 14000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    238, 17, NOW() - INTERVAL '22 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'HP ThinkPad X1 - Perfect for rent in Hyderabad', 'Excellent HP ThinkPad X1 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'HP', 'ThinkPad X1', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop'],
    1400, 7000, 21000, 14000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    462, 3, NOW() - INTERVAL '49 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Lenovo ThinkPad X1 - Perfect for rent in Hyderabad', 'Excellent Lenovo ThinkPad X1 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'Lenovo', 'ThinkPad X1', ARRAY['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    323, 11, NOW() - INTERVAL '59 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Lenovo ThinkPad X1 - Perfect for rent in Bangalore', 'Excellent Lenovo ThinkPad X1 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Lenovo', 'ThinkPad X1', ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop'],
    1600, 8000, 24000, 16000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    10, 12, NOW() - INTERVAL '14 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Apple ROG Zephyrus - Perfect for rent in Hyderabad', 'Excellent Apple ROG Zephyrus available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'Apple', 'ROG Zephyrus', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    437, 10, NOW() - INTERVAL '46 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Lenovo XPS 15 - Perfect for rent in Bangalore', 'Excellent Lenovo XPS 15 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Lenovo', 'XPS 15', ARRAY['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop'],
    1000, 5000, 15000, 10000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    343, 7, NOW() - INTERVAL '51 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Apple Spectre x360 - Perfect for rent in Bangalore', 'Excellent Apple Spectre x360 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Apple', 'Spectre x360', ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    96, 4, NOW() - INTERVAL '36 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'HP XPS 15 - Perfect for rent in Bangalore', 'Excellent HP XPS 15 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'HP', 'XPS 15', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop'],
    1200, 6000, 18000, 12000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    286, 11, NOW() - INTERVAL '20 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Apple MacBook Pro 14 - Perfect for rent in Bangalore', 'Excellent Apple MacBook Pro 14 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Apple', 'MacBook Pro 14', ARRAY['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop'],
    1200, 6000, 18000, 12000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    302, 3, NOW() - INTERVAL '25 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'smartphones';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Samsung Galaxy S24 Ultra - Perfect for rent in Hyderabad', 'Excellent Samsung Galaxy S24 Ultra available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Samsung', 'Galaxy S24 Ultra', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop'],
    1000, 5000, 15000, 10000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    492, 12, NOW() - INTERVAL '45 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Google Galaxy S24 Ultra - Perfect for rent in Bangalore', 'Excellent Google Galaxy S24 Ultra available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Google', 'Galaxy S24 Ultra', ARRAY['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop'],
    700, 3500, 10500, 7000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    381, 6, NOW() - INTERVAL '56 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Xiaomi iPhone 15 Pro - Perfect for rent in Bangalore', 'Excellent Xiaomi iPhone 15 Pro available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Xiaomi', 'iPhone 15 Pro', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop'],
    900, 4500, 13500, 9000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    419, 4, NOW() - INTERVAL '31 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Apple Galaxy S24 Ultra - Perfect for rent in Bangalore', 'Excellent Apple Galaxy S24 Ultra available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Apple', 'Galaxy S24 Ultra', ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop'],
    500, 2500, 7500, 5000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    396, 16, NOW() - INTERVAL '39 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Google Pixel 8 Pro - Perfect for rent in Bangalore', 'Excellent Google Pixel 8 Pro available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Google', 'Pixel 8 Pro', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    126, 11, NOW() - INTERVAL '42 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Samsung Galaxy S24 Ultra - Perfect for rent in Hyderabad', 'Excellent Samsung Galaxy S24 Ultra available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'Samsung', 'Galaxy S24 Ultra', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop'],
    800, 4000, 12000, 8000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    53, 1, NOW() - INTERVAL '7 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Google iPhone 15 Pro - Perfect for rent in Bangalore', 'Excellent Google iPhone 15 Pro available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Google', 'iPhone 15 Pro', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop'],
    700, 3500, 10500, 7000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    301, 12, NOW() - INTERVAL '56 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Apple Pixel 8 Pro - Perfect for rent in Bangalore', 'Excellent Apple Pixel 8 Pro available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Apple', 'Pixel 8 Pro', ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop'],
    900, 4500, 13500, 9000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    255, 19, NOW() - INTERVAL '26 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Google Galaxy S24 Ultra - Perfect for rent in Hyderabad', 'Excellent Google Galaxy S24 Ultra available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Google', 'Galaxy S24 Ultra', ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop'],
    1000, 5000, 15000, 10000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    234, 7, NOW() - INTERVAL '38 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Xiaomi OnePlus 12 - Perfect for rent in Hyderabad', 'Excellent Xiaomi OnePlus 12 available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Xiaomi', 'OnePlus 12', ARRAY['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop'],
    500, 2500, 7500, 5000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    290, 8, NOW() - INTERVAL '26 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'gaming';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Microsoft Xbox Series X - Perfect for rent in Bangalore', 'Excellent Microsoft Xbox Series X available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Microsoft', 'Xbox Series X', ARRAY['https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop'],
    960, 4800, 14400, 9600,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    178, 10, NOW() - INTERVAL '45 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Sony Switch OLED - Perfect for rent in Hyderabad', 'Excellent Sony Switch OLED available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Sony', 'Switch OLED', ARRAY['https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop'],
    840, 4200, 12600, 8400,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    101, 2, NOW() - INTERVAL '36 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Sony Steam Deck - Perfect for rent in Bangalore', 'Excellent Sony Steam Deck available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Sony', 'Steam Deck', ARRAY['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop'],
    720, 3600, 10800, 7200,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    230, 12, NOW() - INTERVAL '58 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Meta Xbox Series X - Perfect for rent in Hyderabad', 'Excellent Meta Xbox Series X available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Meta', 'Xbox Series X', ARRAY['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop'],
    960, 4800, 14400, 9600,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    335, 10, NOW() - INTERVAL '53 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Valve Quest 3 - Perfect for rent in Hyderabad', 'Excellent Valve Quest 3 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Valve', 'Quest 3', ARRAY['https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    157, 11, NOW() - INTERVAL '14 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Nintendo PlayStation 5 - Perfect for rent in Hyderabad', 'Excellent Nintendo PlayStation 5 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Nintendo', 'PlayStation 5', ARRAY['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop'],
    840, 4200, 12600, 8400,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    139, 9, NOW() - INTERVAL '35 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Sony Xbox Series X - Perfect for rent in Hyderabad', 'Excellent Sony Xbox Series X available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Sony', 'Xbox Series X', ARRAY['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop'],
    720, 3600, 10800, 7200,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    173, 6, NOW() - INTERVAL '36 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Nintendo PlayStation 5 - Perfect for rent in Bangalore', 'Excellent Nintendo PlayStation 5 available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Nintendo', 'PlayStation 5', ARRAY['https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    360, 19, NOW() - INTERVAL '13 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Microsoft Xbox Series X - Perfect for rent in Bangalore', 'Excellent Microsoft Xbox Series X available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Microsoft', 'Xbox Series X', ARRAY['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop'],
    960, 4800, 14400, 9600,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    236, 14, NOW() - INTERVAL '24 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Valve PlayStation 5 - Perfect for rent in Bangalore', 'Excellent Valve PlayStation 5 available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Valve', 'PlayStation 5', ARRAY['https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop'],
    1080, 5400, 16200, 10800,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    211, 19, NOW() - INTERVAL '31 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'tools';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Makita Circular Saw - Perfect for rent in Bangalore', 'Excellent Makita Circular Saw available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Makita', 'Circular Saw', ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop'],
    360, 1800, 5400, 3600,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    81, 4, NOW() - INTERVAL '46 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'DeWalt Angle Grinder - Perfect for rent in Hyderabad', 'Excellent DeWalt Angle Grinder available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'DeWalt', 'Angle Grinder', ARRAY['https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    246, 17, NOW() - INTERVAL '53 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Bosch Impact Drill - Perfect for rent in Bangalore', 'Excellent Bosch Impact Drill available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Bosch', 'Impact Drill', ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    49, 17, NOW() - INTERVAL '47 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Bosch Angle Grinder - Perfect for rent in Hyderabad', 'Excellent Bosch Angle Grinder available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Bosch', 'Angle Grinder', ARRAY['https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop'],
    360, 1800, 5400, 3600,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    16, 11, NOW() - INTERVAL '30 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Bosch Rotary Hammer - Perfect for rent in Bangalore', 'Excellent Bosch Rotary Hammer available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Bosch', 'Rotary Hammer', ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    379, 17, NOW() - INTERVAL '35 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Milwaukee Angle Grinder - Perfect for rent in Bangalore', 'Excellent Milwaukee Angle Grinder available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'Milwaukee', 'Angle Grinder', ARRAY['https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    315, 19, NOW() - INTERVAL '43 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Bosch Rotary Hammer - Perfect for rent in Hyderabad', 'Excellent Bosch Rotary Hammer available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Bosch', 'Rotary Hammer', ARRAY['https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop'],
    280, 1400, 4200, 2800,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    220, 9, NOW() - INTERVAL '15 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Milwaukee Rotary Hammer - Perfect for rent in Bangalore', 'Excellent Milwaukee Rotary Hammer available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Milwaukee', 'Rotary Hammer', ARRAY['https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop'],
    280, 1400, 4200, 2800,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    222, 19, NOW() - INTERVAL '6 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Milwaukee Angle Grinder - Perfect for rent in Bangalore', 'Excellent Milwaukee Angle Grinder available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Milwaukee', 'Angle Grinder', ARRAY['https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop'],
    280, 1400, 4200, 2800,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    493, 11, NOW() - INTERVAL '34 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Milwaukee Angle Grinder - Perfect for rent in Bangalore', 'Excellent Milwaukee Angle Grinder available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Milwaukee', 'Angle Grinder', ARRAY['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    367, 4, NOW() - INTERVAL '31 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'sports';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Yonex Cricket Kit - Perfect for rent in Hyderabad', 'Excellent Yonex Cricket Kit available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Yonex', 'Cricket Kit', ARRAY['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    224, 13, NOW() - INTERVAL '40 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Cosco Tennis Racquet - Perfect for rent in Bangalore', 'Excellent Cosco Tennis Racquet available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Cosco', 'Tennis Racquet', ARRAY['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop'],
    420, 2100, 6300, 4200,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    108, 18, NOW() - INTERVAL '29 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Quechua Camping Tent - Perfect for rent in Hyderabad', 'Excellent Quechua Camping Tent available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Quechua', 'Camping Tent', ARRAY['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop'],
    360, 1800, 5400, 3600,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    251, 5, NOW() - INTERVAL '5 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Cosco Tennis Racquet - Perfect for rent in Hyderabad', 'Excellent Cosco Tennis Racquet available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Cosco', 'Tennis Racquet', ARRAY['https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop'],
    540, 2700, 8100, 5400,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    406, 9, NOW() - INTERVAL '15 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Quechua Cricket Kit - Perfect for rent in Hyderabad', 'Excellent Quechua Cricket Kit available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'Quechua', 'Cricket Kit', ARRAY['https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop'],
    540, 2700, 8100, 5400,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    25, 9, NOW() - INTERVAL '51 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Decathlon Camping Tent - Perfect for rent in Bangalore', 'Excellent Decathlon Camping Tent available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Decathlon', 'Camping Tent', ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop'],
    420, 2100, 6300, 4200,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    351, 5, NOW() - INTERVAL '58 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Cosco Mountain Bike - Perfect for rent in Hyderabad', 'Excellent Cosco Mountain Bike available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Cosco', 'Mountain Bike', ARRAY['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    231, 5, NOW() - INTERVAL '1 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Quechua Cricket Kit - Perfect for rent in Hyderabad', 'Excellent Quechua Cricket Kit available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Quechua', 'Cricket Kit', ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop'],
    360, 1800, 5400, 3600,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    327, 2, NOW() - INTERVAL '56 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Cosco Badminton Set - Perfect for rent in Bangalore', 'Excellent Cosco Badminton Set available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Cosco', 'Badminton Set', ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    113, 13, NOW() - INTERVAL '53 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Decathlon Tennis Racquet - Perfect for rent in Hyderabad', 'Excellent Decathlon Tennis Racquet available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Decathlon', 'Tennis Racquet', ARRAY['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop'],
    540, 2700, 8100, 5400,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    305, 17, NOW() - INTERVAL '17 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'musical-instruments';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Casio Electric Guitar - Perfect for rent in Hyderabad', 'Excellent Casio Electric Guitar available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Casio', 'Electric Guitar', ARRAY['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop'],
    720, 3600, 10800, 7200,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    259, 16, NOW() - INTERVAL '16 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Yamaha Electric Guitar - Perfect for rent in Hyderabad', 'Excellent Yamaha Electric Guitar available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'Yamaha', 'Electric Guitar', ARRAY['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    28, 3, NOW() - INTERVAL '7 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Roland Synthesizer - Perfect for rent in Hyderabad', 'Excellent Roland Synthesizer available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Roland', 'Synthesizer', ARRAY['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    380, 4, NOW() - INTERVAL '28 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Fender Electric Guitar - Perfect for rent in Bangalore', 'Excellent Fender Electric Guitar available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'Fender', 'Electric Guitar', ARRAY['https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop'],
    560, 2800, 8400, 5600,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    251, 19, NOW() - INTERVAL '41 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Yamaha Keyboard - Perfect for rent in Hyderabad', 'Excellent Yamaha Keyboard available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Yamaha', 'Keyboard', ARRAY['https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    314, 13, NOW() - INTERVAL '49 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Yamaha Keyboard - Perfect for rent in Hyderabad', 'Excellent Yamaha Keyboard available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Yamaha', 'Keyboard', ARRAY['https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    17, 8, NOW() - INTERVAL '14 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Korg Drum Kit - Perfect for rent in Hyderabad', 'Excellent Korg Drum Kit available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Korg', 'Drum Kit', ARRAY['https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    315, 16, NOW() - INTERVAL '42 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Fender Drum Kit - Perfect for rent in Bangalore', 'Excellent Fender Drum Kit available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Fender', 'Drum Kit', ARRAY['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop'],
    800, 4000, 12000, 8000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    36, 11, NOW() - INTERVAL '29 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Korg Keyboard - Perfect for rent in Bangalore', 'Excellent Korg Keyboard available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Korg', 'Keyboard', ARRAY['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop'],
    560, 2800, 8400, 5600,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    387, 5, NOW() - INTERVAL '18 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Casio Acoustic Guitar - Perfect for rent in Bangalore', 'Excellent Casio Acoustic Guitar available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Casio', 'Acoustic Guitar', ARRAY['https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    261, 1, NOW() - INTERVAL '35 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'events';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Custom Projector - Perfect for rent in Hyderabad', 'Excellent Custom Projector available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Custom', 'Projector', ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop'],
    1800, 9000, 27000, 18000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    343, 1, NOW() - INTERVAL '34 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Custom Party Speaker - Perfect for rent in Hyderabad', 'Excellent Custom Party Speaker available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Custom', 'Party Speaker', ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'],
    1000, 5000, 15000, 10000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    282, 13, NOW() - INTERVAL '37 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Custom PA System - Perfect for rent in Bangalore', 'Excellent Custom PA System available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Custom', 'PA System', ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'],
    1400, 7000, 21000, 14000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    120, 10, NOW() - INTERVAL '32 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Custom Party Speaker - Perfect for rent in Bangalore', 'Excellent Custom Party Speaker available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Custom', 'Party Speaker', ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'],
    1000, 5000, 15000, 10000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    151, 4, NOW() - INTERVAL '54 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Epson PA System - Perfect for rent in Hyderabad', 'Excellent Epson PA System available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Epson', 'PA System', ARRAY['https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    218, 12, NOW() - INTERVAL '44 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Custom DJ Controller - Perfect for rent in Bangalore', 'Excellent Custom DJ Controller available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Custom', 'DJ Controller', ARRAY['https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop'],
    2000, 10000, 30000, 20000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    195, 3, NOW() - INTERVAL '47 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Epson DJ Controller - Perfect for rent in Hyderabad', 'Excellent Epson DJ Controller available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Epson', 'DJ Controller', ARRAY['https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop'],
    1400, 7000, 21000, 14000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    403, 1, NOW() - INTERVAL '8 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Sony Projector - Perfect for rent in Bangalore', 'Excellent Sony Projector available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Sony', 'Projector', ARRAY['https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop'],
    1800, 9000, 27000, 18000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    118, 8, NOW() - INTERVAL '46 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'JBL PA System - Perfect for rent in Hyderabad', 'Excellent JBL PA System available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'JBL', 'PA System', ARRAY['https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop'],
    1200, 6000, 18000, 12000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    384, 17, NOW() - INTERVAL '16 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Custom DJ Controller - Perfect for rent in Hyderabad', 'Excellent Custom DJ Controller available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Custom', 'DJ Controller', ARRAY['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop'],
    1200, 6000, 18000, 12000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    94, 4, NOW() - INTERVAL '42 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'travel';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'American Tourister Cabin Luggage - Perfect for rent in Hyderabad', 'Excellent American Tourister Cabin Luggage available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'American Tourister', 'Cabin Luggage', ARRAY['https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop'],
    240, 1200, 3600, 2400,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    425, 1, NOW() - INTERVAL '7 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'VIP Roof Box - Perfect for rent in Hyderabad', 'Excellent VIP Roof Box available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'VIP', 'Roof Box', ARRAY['https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    324, 7, NOW() - INTERVAL '17 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Safari Roof Box - Perfect for rent in Hyderabad', 'Excellent Safari Roof Box available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Safari', 'Roof Box', ARRAY['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop'],
    240, 1200, 3600, 2400,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    266, 4, NOW() - INTERVAL '52 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'American Tourister Roof Box - Perfect for rent in Hyderabad', 'Excellent American Tourister Roof Box available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'American Tourister', 'Roof Box', ARRAY['https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    270, 10, NOW() - INTERVAL '23 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Wildcraft Trolley Bag Set - Perfect for rent in Hyderabad', 'Excellent Wildcraft Trolley Bag Set available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Wildcraft', 'Trolley Bag Set', ARRAY['https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'],
    360, 1800, 5400, 3600,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    360, 2, NOW() - INTERVAL '54 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Safari Duffel Bag - Perfect for rent in Bangalore', 'Excellent Safari Duffel Bag available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Safari', 'Duffel Bag', ARRAY['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop'],
    240, 1200, 3600, 2400,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    437, 11, NOW() - INTERVAL '51 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Safari Trekking Backpack - Perfect for rent in Bangalore', 'Excellent Safari Trekking Backpack available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'Safari', 'Trekking Backpack', ARRAY['https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop'],
    200, 1000, 3000, 2000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    418, 4, NOW() - INTERVAL '24 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Wildcraft Trolley Bag Set - Perfect for rent in Hyderabad', 'Excellent Wildcraft Trolley Bag Set available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Wildcraft', 'Trolley Bag Set', ARRAY['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    91, 12, NOW() - INTERVAL '26 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'American Tourister Roof Box - Perfect for rent in Hyderabad', 'Excellent American Tourister Roof Box available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'American Tourister', 'Roof Box', ARRAY['https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'],
    200, 1000, 3000, 2000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    335, 12, NOW() - INTERVAL '59 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Wildcraft Roof Box - Perfect for rent in Bangalore', 'Excellent Wildcraft Roof Box available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Wildcraft', 'Roof Box', ARRAY['https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop'],
    240, 1200, 3600, 2400,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    178, 1, NOW() - INTERVAL '22 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'furniture';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'IKEA Bean Bag - Perfect for rent in Bangalore', 'Excellent IKEA Bean Bag available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'IKEA', 'Bean Bag', ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'],
    300, 1500, 4500, 3000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    68, 18, NOW() - INTERVAL '1 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'IKEA Standing Desk - Perfect for rent in Hyderabad', 'Excellent IKEA Standing Desk available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'IKEA', 'Standing Desk', ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    12, 7, NOW() - INTERVAL '2 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Pepperfry Standing Desk - Perfect for rent in Hyderabad', 'Excellent Pepperfry Standing Desk available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Pepperfry', 'Standing Desk', ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    325, 16, NOW() - INTERVAL '56 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Pepperfry Sofa Set - Perfect for rent in Bangalore', 'Excellent Pepperfry Sofa Set available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Pepperfry', 'Sofa Set', ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'],
    420, 2100, 6300, 4200,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    221, 2, NOW() - INTERVAL '19 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Urban Ladder Bookshelf - Perfect for rent in Bangalore', 'Excellent Urban Ladder Bookshelf available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'Urban Ladder', 'Bookshelf', ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    299, 6, NOW() - INTERVAL '20 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Herman Miller Sofa Set - Perfect for rent in Hyderabad', 'Excellent Herman Miller Sofa Set available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Herman Miller', 'Sofa Set', ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop'],
    300, 1500, 4500, 3000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    16, 8, NOW() - INTERVAL '10 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Pepperfry Standing Desk - Perfect for rent in Hyderabad', 'Excellent Pepperfry Standing Desk available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Pepperfry', 'Standing Desk', ARRAY['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop'],
    300, 1500, 4500, 3000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    289, 8, NOW() - INTERVAL '4 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'IKEA Sofa Set - Perfect for rent in Hyderabad', 'Excellent IKEA Sofa Set available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'IKEA', 'Sofa Set', ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    174, 14, NOW() - INTERVAL '28 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Godrej Bean Bag - Perfect for rent in Bangalore', 'Excellent Godrej Bean Bag available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Godrej', 'Bean Bag', ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    276, 11, NOW() - INTERVAL '51 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Urban Ladder Bookshelf - Perfect for rent in Hyderabad', 'Excellent Urban Ladder Bookshelf available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Urban Ladder', 'Bookshelf', ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    265, 17, NOW() - INTERVAL '60 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'appliances';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Bosch Vacuum Cleaner - Perfect for rent in Hyderabad', 'Excellent Bosch Vacuum Cleaner available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'Bosch', 'Vacuum Cleaner', ARRAY['https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop'],
    560, 2800, 8400, 5600,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    352, 9, NOW() - INTERVAL '37 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Philips Microwave - Perfect for rent in Bangalore', 'Excellent Philips Microwave available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Philips', 'Microwave', ARRAY['https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&h=600&fit=crop'],
    560, 2800, 8400, 5600,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    190, 5, NOW() - INTERVAL '48 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Samsung Air Purifier - Perfect for rent in Bangalore', 'Excellent Samsung Air Purifier available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Samsung', 'Air Purifier', ARRAY['https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    146, 3, NOW() - INTERVAL '50 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Dyson Microwave - Perfect for rent in Bangalore', 'Excellent Dyson Microwave available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Dyson', 'Microwave', ARRAY['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    89, 3, NOW() - INTERVAL '32 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Dyson Coffee Maker - Perfect for rent in Bangalore', 'Excellent Dyson Coffee Maker available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Dyson', 'Coffee Maker', ARRAY['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop'],
    640, 3200, 9600, 6400,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    482, 11, NOW() - INTERVAL '35 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Samsung Washing Machine - Perfect for rent in Bangalore', 'Excellent Samsung Washing Machine available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Samsung', 'Washing Machine', ARRAY['https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop'],
    480, 2400, 7200, 4800,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    439, 13, NOW() - INTERVAL '18 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Dyson Microwave - Perfect for rent in Hyderabad', 'Excellent Dyson Microwave available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Dyson', 'Microwave', ARRAY['https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop'],
    640, 3200, 9600, 6400,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    188, 3, NOW() - INTERVAL '11 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Bosch Air Purifier - Perfect for rent in Bangalore', 'Excellent Bosch Air Purifier available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Bosch', 'Air Purifier', ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    127, 19, NOW() - INTERVAL '37 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'LG Washing Machine - Perfect for rent in Bangalore', 'Excellent LG Washing Machine available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'LG', 'Washing Machine', ARRAY['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    241, 14, NOW() - INTERVAL '56 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Samsung Washing Machine - Perfect for rent in Hyderabad', 'Excellent Samsung Washing Machine available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Samsung', 'Washing Machine', ARRAY['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop'],
    400, 2000, 6000, 4000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    10, 6, NOW() - INTERVAL '54 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'clothing';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'ZARA Designer Suit - Perfect for rent in Hyderabad', 'Excellent ZARA Designer Suit available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'ZARA', 'Designer Suit', ARRAY['https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop'],
    900, 4500, 13500, 9000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    419, 4, NOW() - INTERVAL '54 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Manyavar Designer Suit - Perfect for rent in Hyderabad', 'Excellent Manyavar Designer Suit available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Manyavar', 'Designer Suit', ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    468, 20, NOW() - INTERVAL '14 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Manyavar Designer Suit - Perfect for rent in Bangalore', 'Excellent Manyavar Designer Suit available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Manyavar', 'Designer Suit', ARRAY['https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop'],
    600, 3000, 9000, 6000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    16, 6, NOW() - INTERVAL '5 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'FabIndia Winter Jacket - Perfect for rent in Hyderabad', 'Excellent FabIndia Winter Jacket available for rent. Condition is good. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'good', 'FabIndia', 'Winter Jacket', ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop'],
    1000, 5000, 15000, 10000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    366, 20, NOW() - INTERVAL '10 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Manyavar Lehenga - Perfect for rent in Hyderabad', 'Excellent Manyavar Lehenga available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Manyavar', 'Lehenga', ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop'],
    800, 4000, 12000, 8000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    112, 4, NOW() - INTERVAL '37 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'FabIndia Tuxedo - Perfect for rent in Hyderabad', 'Excellent FabIndia Tuxedo available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'FabIndia', 'Tuxedo', ARRAY['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop'],
    900, 4500, 13500, 9000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    286, 10, NOW() - INTERVAL '43 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'ZARA Designer Suit - Perfect for rent in Bangalore', 'Excellent ZARA Designer Suit available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'ZARA', 'Designer Suit', ARRAY['https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop'],
    500, 2500, 7500, 5000,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    397, 14, NOW() - INTERVAL '8 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'ZARA Winter Jacket - Perfect for rent in Hyderabad', 'Excellent ZARA Winter Jacket available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'ZARA', 'Winter Jacket', ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop'],
    900, 4500, 13500, 9000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    195, 19, NOW() - INTERVAL '54 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Raymond Sherwani Set - Perfect for rent in Bangalore', 'Excellent Raymond Sherwani Set available for rent. Condition is fair. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'fair', 'Raymond', 'Sherwani Set', ARRAY['https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop'],
    900, 4500, 13500, 9000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    470, 4, NOW() - INTERVAL '58 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Raymond Designer Suit - Perfect for rent in Bangalore', 'Excellent Raymond Designer Suit available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Raymond', 'Designer Suit', ARRAY['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop'],
    1000, 5000, 15000, 10000,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    226, 20, NOW() - INTERVAL '37 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'books';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Pearson GATE Study Kit - Perfect for rent in Hyderabad', 'Excellent Pearson GATE Study Kit available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Pearson', 'GATE Study Kit', ARRAY['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop'],
    70, 350, 1050, 700,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    411, 8, NOW() - INTERVAL '57 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'McGraw Hill Fiction Bundle - Perfect for rent in Bangalore', 'Excellent McGraw Hill Fiction Bundle available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'McGraw Hill', 'Fiction Bundle', ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'],
    50, 250, 750, 500,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    483, 8, NOW() - INTERVAL '53 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Arihant UPSC Material - Perfect for rent in Bangalore', 'Excellent Arihant UPSC Material available for rent. Condition is fair. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'fair', 'Arihant', 'UPSC Material', ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop'],
    90, 450, 1350, 900,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    64, 4, NOW() - INTERVAL '52 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Pearson Fiction Bundle - Perfect for rent in Hyderabad', 'Excellent Pearson Fiction Bundle available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Pearson', 'Fiction Bundle', ARRAY['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop'],
    80, 400, 1200, 800,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    336, 7, NOW() - INTERVAL '1 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Pearson CAT Prep Books - Perfect for rent in Bangalore', 'Excellent Pearson CAT Prep Books available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'Pearson', 'CAT Prep Books', ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'],
    90, 450, 1350, 900,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    17, 3, NOW() - INTERVAL '48 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'OReilly CAT Prep Books - Perfect for rent in Bangalore', 'Excellent OReilly CAT Prep Books available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'OReilly', 'CAT Prep Books', ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop'],
    70, 350, 1050, 700,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    265, 9, NOW() - INTERVAL '20 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'McGraw Hill Programming Books - Perfect for rent in Hyderabad', 'Excellent McGraw Hill Programming Books available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'McGraw Hill', 'Programming Books', ARRAY['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop'],
    100, 500, 1500, 1000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    83, 16, NOW() - INTERVAL '11 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'McGraw Hill Fiction Bundle - Perfect for rent in Bangalore', 'Excellent McGraw Hill Fiction Bundle available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'McGraw Hill', 'Fiction Bundle', ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop'],
    90, 450, 1350, 900,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    437, 20, NOW() - INTERVAL '16 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'OReilly GATE Study Kit - Perfect for rent in Bangalore', 'Excellent OReilly GATE Study Kit available for rent. Condition is good. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'good', 'OReilly', 'GATE Study Kit', ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop'],
    50, 250, 750, 500,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    19, 2, NOW() - INTERVAL '49 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Arihant Programming Books - Perfect for rent in Bangalore', 'Excellent Arihant Programming Books available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Indiranagar, Bangalore.', 'excellent', 'Arihant', 'Programming Books', ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop'],
    90, 450, 1350, 900,
    'Bangalore', 'Indiranagar', 'Karnataka', '560038',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    215, 12, NOW() - INTERVAL '8 days'
  );
  SELECT id INTO cat_id FROM categories WHERE slug = 'others';

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Handmade Telescope - Perfect for rent in Hyderabad', 'Excellent Handmade Telescope available for rent. Condition is good. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'good', 'Handmade', 'Telescope', ARRAY['https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    393, 16, NOW() - INTERVAL '57 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Custom Metal Detector - Perfect for rent in Bangalore', 'Excellent Custom Metal Detector available for rent. Condition is good. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'good', 'Custom', 'Metal Detector', ARRAY['https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    420, 3, NOW() - INTERVAL '52 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Local Sewing Machine - Perfect for rent in Hyderabad', 'Excellent Local Sewing Machine available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'excellent', 'Local', 'Sewing Machine', ARRAY['https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&h=600&fit=crop'],
    280, 1400, 4200, 2800,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    389, 6, NOW() - INTERVAL '50 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Generic Telescope - Perfect for rent in Bangalore', 'Excellent Generic Telescope available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Generic', 'Telescope', ARRAY['https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    264, 7, NOW() - INTERVAL '7 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Custom Sewing Machine - Perfect for rent in Hyderabad', 'Excellent Custom Sewing Machine available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'excellent', 'Custom', 'Sewing Machine', ARRAY['https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    78, 4, NOW() - INTERVAL '11 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_b, cat_id, 'Handmade Typewriter - Perfect for rent in Bangalore', 'Excellent Handmade Typewriter available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Handmade', 'Typewriter', ARRAY['https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    445, 18, NOW() - INTERVAL '44 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_a, cat_id, 'Imported Hoverboard - Perfect for rent in Hyderabad', 'Excellent Imported Hoverboard available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Imported', 'Hoverboard', ARRAY['https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop'],
    200, 1000, 3000, 2000,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    366, 7, NOW() - INTERVAL '41 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Imported Hoverboard - Perfect for rent in Hyderabad', 'Excellent Imported Hoverboard available for rent. Condition is fair. Well maintained and ready to use. Pick up from Jubilee Hills, Hyderabad.', 'fair', 'Imported', 'Hoverboard', ARRAY['https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop'],
    200, 1000, 3000, 2000,
    'Hyderabad', 'Jubilee Hills', 'Telangana', '500033',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    323, 4, NOW() - INTERVAL '28 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Local Sewing Machine - Perfect for rent in Hyderabad', 'Excellent Local Sewing Machine available for rent. Condition is fair. Well maintained and ready to use. Pick up from Madhapur, Hyderabad.', 'fair', 'Local', 'Sewing Machine', ARRAY['https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop'],
    320, 1600, 4800, 3200,
    'Hyderabad', 'Madhapur', 'Telangana', '500081',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    180, 7, NOW() - INTERVAL '5 days'
  );

  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    owner_c, cat_id, 'Generic Metal Detector - Perfect for rent in Bangalore', 'Excellent Generic Metal Detector available for rent. Condition is excellent. Well maintained and ready to use. Pick up from Koramangala, Bangalore.', 'excellent', 'Generic', 'Metal Detector', ARRAY['https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop'],
    240, 1200, 3600, 2400,
    'Bangalore', 'Koramangala', 'Karnataka', '560034',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    287, 5, NOW() - INTERVAL '34 days'
  );

END;
$$;
