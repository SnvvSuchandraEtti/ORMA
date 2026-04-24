import fs from 'fs';

const categories = [
  'cars', 'bikes', 'cameras', 'laptops', 'smartphones', 'gaming', 'tools', 'sports', 
  'musical-instruments', 'events', 'travel', 'furniture', 'appliances', 'clothing', 'books', 'others'
];

const brands = {
  cars: ['Hyundai', 'Maruti Suzuki', 'Tata', 'Honda', 'Toyota', 'Mahindra', 'Kia', 'Ford', 'Renault', 'Volkswagen'],
  bikes: ['Royal Enfield', 'KTM', 'Honda', 'Yamaha', 'TVS', 'Bajaj', 'Hero', 'Suzuki', 'Ather', 'Ola Electric'],
  cameras: ['Canon', 'Sony', 'Nikon', 'Fujifilm', 'Panasonic', 'Olympus', 'Leica', 'GoPro', 'DJI', 'Pentax'],
  laptops: ['Apple', 'ASUS', 'Dell', 'HP', 'Lenovo', 'Acer', 'MSI', 'Microsoft', 'Razer', 'Samsung'],
  smartphones: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo', 'Realme', 'Nothing', 'Motorola'],
  gaming: ['Sony', 'Microsoft', 'Nintendo', 'Meta', 'Razer', 'Logitech', 'Corsair', 'HyperX', 'SteelSeries', 'ASUS'],
  tools: ['Bosch', 'DeWalt', 'Makita', 'Black+Decker', 'Milwaukee', 'Stanley', 'Hitachi', 'Ryobi', 'Craftsman', 'Hilti'],
  sports: ['Decathlon', 'Yonex', 'Wilson', 'Spalding', 'Nike', 'Adidas', 'Puma', 'Under Armour', 'Babolat', 'Head'],
  'musical-instruments': ['Yamaha', 'Fender', 'Roland', 'Korg', 'Casio', 'Gibson', 'Ibanez', 'Epiphone', 'PRS', 'Taylor'],
  events: ['Pioneer', 'JBL', 'Bose', 'Shure', 'Sennheiser', 'Sony', 'Custom', 'Generic', 'Eventizer', 'PartyProps'],
  travel: ['Samsonite', 'American Tourister', 'Quechua', 'Safari', 'VIP', 'Skybags', 'Delsey', 'Wildcraft', 'Victorinox', 'Aristocrat'],
  furniture: ['Herman Miller', 'IKEA', 'Godrej', 'Urban Ladder', 'Pepperfry', 'Home Centre', 'Steelcase', 'Wakefit', 'Durian', 'Nilkamal'],
  appliances: ['Dyson', 'LG', 'Samsung', 'Whirlpool', 'Bosch', 'IFB', 'Panasonic', 'Voltas', 'Blue Star', 'Daikin'],
  clothing: ['Manyavar', 'Raymond', 'FabIndia', 'Biba', 'W', 'Aurelia', 'Soch', 'Mohey', 'Meena Bazaar', 'Ritu Kumar'],
  books: ['Made Easy', 'Pearson', 'McGraw Hill', 'Arihant', 'Oswaal', 'S. Chand', 'Oxford', 'Cambridge', 'Penguin', 'HarperCollins'],
  others: ['DJI', 'Epson', 'Sony', 'Apple', 'Generic', 'Custom', 'Unknown', 'Various', 'Mixed', 'Bundle']
};

const imagePools = {
  cars: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'],
  bikes: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', 'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800'],
  cameras: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800', 'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800', 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800'],
  laptops: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800'],
  smartphones: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', 'https://images.unsplash.com/photo-1580910051074-3eb694886f50?w=800', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'],
  gaming: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800', 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800'],
  tools: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800', 'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800', 'https://images.unsplash.com/photo-1581147036324-c1074bf005d5?w=800'],
  sports: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800'],
  'musical-instruments': ['https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800', 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800', 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800'],
  events: ['https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'],
  travel: ['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'],
  furniture: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
  appliances: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800', 'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
  clothing: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'],
  books: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800'],
  others: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800', 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=800', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800']
};

let sql = `-- ================================================================
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

`;

let lidCounter = 1;

for (const cat of categories) {
  sql += `\n  -- ${cat.toUpperCase()} ────────────────────────────────────────────────\n`;
  sql += `  DECLARE cat_id_${cat.replace('-', '_')} INT;\n`;
  sql += `  BEGIN\n`;
  sql += `    SELECT id INTO cat_id_${cat.replace('-', '_')} FROM categories WHERE slug = '${cat}';\n`;
  
  for (let i = 0; i < 10; i++) {
    const owner = i % 3 === 0 ? 'owner_a' : (i % 3 === 1 ? 'owner_b' : 'owner_c');
    const brand = brands[cat][i % brands[cat].length];
    const city = i % 2 === 0 ? 'Hyderabad' : 'Bangalore';
    const area = i % 2 === 0 ? 'Jubilee Hills' : 'Koramangala';
    const state = i % 2 === 0 ? 'Telangana' : 'Karnataka';
    const pincode = i % 2 === 0 ? '500033' : '560034';
    
    // Pick 3 random images for this category
    const pool = imagePools[cat];
    const images = [];
    for(let j=0; j<3; j++) {
      images.push(`'${pool[(i + j) % pool.length]}'`);
    }

    const price_day = 500 + (i * 100);
    const price_week = price_day * 5;
    const price_month = price_day * 15;
    const deposit = price_day * 3;

    sql += `
    INSERT INTO listings (owner_id, category_id, title, description, condition, brand, model, images, price_per_day, price_per_week, price_per_month, security_deposit, city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, status, is_available, views_count, inquiries_count, created_at)
    VALUES (
      ${owner}, cat_id_${cat.replace('-', '_')},
      '${brand} Item ${i+1} for Rent',
      'Excellent condition ${brand} item available for rent. High quality and well maintained. Perfect for your needs.',
      'excellent', '${brand}', 'Model ${i+1}',
      ARRAY[${images.join(', ')}],
      ${price_day}, ${price_week}, ${price_month}, ${deposit},
      '${city}', '${area}', '${state}', '${pincode}',
      '+91 9876543210', '+91 9876543210', 'whatsapp',
      'Valid ID required. Security deposit to be paid upfront. Handle with care.',
      TRUE, FALSE, '1 day', 'active', TRUE,
      ${Math.floor(Math.random() * 1000)}, ${Math.floor(Math.random() * 50)}, NOW() - INTERVAL '${Math.floor(Math.random() * 60)} days'
    );
`;
  }
  sql += `  END;\n`;
}

sql += `
END;
$$;
`;

fs.writeFileSync('e:/ORMA/seed-data-v3.sql', sql);
console.log('Successfully generated seed-data-v3.sql with 10 items per category!');
