const fs = require('fs');

const categories = [
  'cars', 'bikes', 'cameras', 'laptops', 'smartphones', 'gaming',
  'tools', 'sports', 'musical-instruments', 'events', 'travel',
  'furniture', 'appliances', 'clothing', 'books', 'others'
];

const owners = ['owner_a', 'owner_b', 'owner_c'];

const conditions = ['excellent', 'good', 'fair'];

const cities = [
  { city: 'Hyderabad', state: 'Telangana', pincode: '500033', area: 'Jubilee Hills' },
  { city: 'Hyderabad', state: 'Telangana', pincode: '500081', area: 'Madhapur' },
  { city: 'Bangalore', state: 'Karnataka', pincode: '560034', area: 'Koramangala' },
  { city: 'Bangalore', state: 'Karnataka', pincode: '560038', area: 'Indiranagar' }
];

const categoryData = {
  'cars': {
    brands: ['Hyundai', 'Maruti Suzuki', 'Tata', 'Honda', 'Mahindra'],
    models: ['Creta', 'Swift', 'Nexon', 'City', 'XUV700'],
    basePrice: 2000,
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'
    ]
  },
  'bikes': {
    brands: ['Royal Enfield', 'KTM', 'Bajaj', 'Yamaha', 'Honda'],
    models: ['Himalayan', 'Duke 200', 'Pulsar NS200', 'R15 V4', 'CB350'],
    basePrice: 800,
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609630875171-04b08864779f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop'
    ]
  },
  'cameras': {
    brands: ['Sony', 'Canon', 'Nikon', 'Fujifilm', 'Panasonic'],
    models: ['A7 IV', 'EOS R6', 'Z6 II', 'X-T4', 'Lumix GH6'],
    basePrice: 1500,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581591524425-c7e0978571d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop'
    ]
  },
  'laptops': {
    brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS'],
    models: ['MacBook Pro 14', 'XPS 15', 'Spectre x360', 'ThinkPad X1', 'ROG Zephyrus'],
    basePrice: 1000,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop'
    ]
  },
  'smartphones': {
    brands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'],
    models: ['iPhone 15 Pro', 'Galaxy S24 Ultra', 'Pixel 8 Pro', 'OnePlus 12', 'Xiaomi 14'],
    basePrice: 500,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop'
    ]
  },
  'gaming': {
    brands: ['Sony', 'Microsoft', 'Nintendo', 'Meta', 'Valve'],
    models: ['PlayStation 5', 'Xbox Series X', 'Switch OLED', 'Quest 3', 'Steam Deck'],
    basePrice: 600,
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=600&fit=crop'
    ]
  },
  'tools': {
    brands: ['Bosch', 'DeWalt', 'Makita', 'Black+Decker', 'Milwaukee'],
    models: ['Impact Drill', 'Circular Saw', 'Angle Grinder', 'Rotary Hammer', 'Toolkit Set'],
    basePrice: 200,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1530124566582-a45a7e3e29e6?w=800&h=600&fit=crop'
    ]
  },
  'sports': {
    brands: ['Decathlon', 'Yonex', 'Nivia', 'Cosco', 'Quechua'],
    models: ['Mountain Bike', 'Badminton Set', 'Cricket Kit', 'Tennis Racquet', 'Camping Tent'],
    basePrice: 300,
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=800&h=600&fit=crop'
    ]
  },
  'musical-instruments': {
    brands: ['Yamaha', 'Fender', 'Casio', 'Roland', 'Korg'],
    models: ['Keyboard', 'Acoustic Guitar', 'Electric Guitar', 'Drum Kit', 'Synthesizer'],
    basePrice: 400,
    images: [
      'https://images.unsplash.com/photo-1520523839897-bd043ef29c3a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop'
    ]
  },
  'events': {
    brands: ['JBL', 'Pioneer', 'Epson', 'Sony', 'Custom'],
    models: ['Party Speaker', 'DJ Controller', 'Projector', 'PA System', 'Decor Kit'],
    basePrice: 1000,
    images: [
      'https://images.unsplash.com/photo-1571854767600-45e0cf0b7662?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop'
    ]
  },
  'travel': {
    brands: ['Samsonite', 'American Tourister', 'VIP', 'Wildcraft', 'Safari'],
    models: ['Trolley Bag Set', 'Trekking Backpack', 'Cabin Luggage', 'Duffel Bag', 'Roof Box'],
    basePrice: 200,
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581553680321-4fffff48f413?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553835973-dec43bfddbeb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'
    ]
  },
  'furniture': {
    brands: ['IKEA', 'Herman Miller', 'Urban Ladder', 'Pepperfry', 'Godrej'],
    models: ['Office Chair', 'Standing Desk', 'Bookshelf', 'Bean Bag', 'Sofa Set'],
    basePrice: 300,
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ]
  },
  'appliances': {
    brands: ['Dyson', 'LG', 'Samsung', 'Philips', 'Bosch'],
    models: ['Vacuum Cleaner', 'Air Purifier', 'Microwave', 'Coffee Maker', 'Washing Machine'],
    basePrice: 400,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1527515637462-cee1395c44bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&h=600&fit=crop'
    ]
  },
  'clothing': {
    brands: ['Raymond', 'Manyavar', 'FabIndia', 'ZARA', 'H&M'],
    models: ['Sherwani Set', 'Lehenga', 'Designer Suit', 'Tuxedo', 'Winter Jacket'],
    basePrice: 500,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550614000-4b95d4ebfa49?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop'
    ]
  },
  'books': {
    brands: ['Made Easy', 'Pearson', 'McGraw Hill', 'Arihant', 'OReilly'],
    models: ['GATE Study Kit', 'CAT Prep Books', 'UPSC Material', 'Programming Books', 'Fiction Bundle'],
    basePrice: 50,
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop'
    ]
  },
  'others': {
    brands: ['Generic', 'Custom', 'Local', 'Handmade', 'Imported'],
    models: ['Metal Detector', 'Telescope', 'Sewing Machine', 'Typewriter', 'Hoverboard'],
    basePrice: 200,
    images: [
      'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558500201-98782f9c4f74?w=800&h=600&fit=crop'
    ]
  }
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let sql = `-- Auto-generated seed data for missing items
DO $$
DECLARE
  owner_a UUID := '7382e1c1-72d7-4269-a48c-14a4c456d2ed';
  owner_b UUID := '9b922684-338b-4518-9f54-99783be25459';
  owner_c UUID := '0cad79f7-e7fa-4737-93fe-990676bee0c7';
  cat_id INT;
BEGIN

`;

categories.forEach(cat => {
  sql += `  SELECT id INTO cat_id FROM categories WHERE slug = '${cat}';\n`;
  for (let i = 0; i < 10; i++) {
    const data = categoryData[cat];
    const owner = rand(owners);
    const brand = rand(data.brands);
    const model = rand(data.models);
    const condition = rand(conditions);
    const cityData = rand(cities);
    const pricePerDay = data.basePrice + randInt(0, 5) * (data.basePrice * 0.2);
    const pricePerWeek = pricePerDay * 5;
    const pricePerMonth = pricePerDay * 15;
    const deposit = pricePerDay * 10;
    
    // Select 3 random images
    const shuffledImages = [...data.images].sort(() => 0.5 - Math.random());
    const selectedImages = shuffledImages.slice(0, 3);
    const imageArrayStr = `ARRAY['${selectedImages.join("','")}']`;

    const title = `${brand} ${model} - Perfect for rent in ${cityData.city}`;
    const desc = `Excellent ${brand} ${model} available for rent. Condition is ${condition}. Well maintained and ready to use. Pick up from ${cityData.area}, ${cityData.city}.`;
    
    sql += `
  INSERT INTO listings (
    owner_id, category_id, title, description, condition, brand, model, images, 
    price_per_day, price_per_week, price_per_month, security_deposit, 
    city, area, state, pincode, contact_phone, contact_whatsapp, preferred_contact, 
    terms_and_conditions, id_proof_required, delivery_available, minimum_rental_period, 
    status, is_available, views_count, inquiries_count, created_at
  ) VALUES (
    ${owner}, cat_id, '${title}', '${desc}', '${condition}', '${brand}', '${model}', ${imageArrayStr},
    ${pricePerDay}, ${pricePerWeek}, ${pricePerMonth}, ${deposit},
    '${cityData.city}', '${cityData.area}', '${cityData.state}', '${cityData.pincode}',
    '+91 9876543210', '+91 9876543210', 'whatsapp',
    'Valid ID required. Security deposit to be paid upfront. Return in same condition.',
    TRUE, FALSE, '1 day', 'active', TRUE,
    ${randInt(10, 500)}, ${randInt(1, 20)}, NOW() - INTERVAL '${randInt(1, 60)} days'
  );
`;
  }
});

sql += `\nEND;\n$$;\n`;

fs.writeFileSync('e:/ORMA/more-seed-data.sql', sql);
console.log('SQL generated successfully!');
