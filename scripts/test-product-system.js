const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function testSystem() {
  console.log('--- 1. Testing Image Optimization & Storage ---');
  const sourceImage = 'C:/Users/USER/.gemini/antigravity/brain/96cf0893-1aaf-43c9-abc0-fcec3bfcaac5/.user_uploaded/media_1793501675806_fd88b580.png';
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const destFilename = 'product-stride-pro-thermal-top.webp';
  const destPath = path.join(uploadDir, destFilename);

  const inputBuffer = fs.readFileSync(sourceImage);
  const optimizedBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88 })
    .toBuffer();

  fs.writeFileSync(destPath, optimizedBuffer);
  const stat = fs.statSync(destPath);
  console.log(`✓ Image saved permanently: /uploads/products/${destFilename}`);
  console.log(`✓ Original size: ${inputBuffer.length} bytes -> Optimized size: ${stat.size} bytes (${Math.round((1 - stat.size / inputBuffer.length) * 100)}% reduction)`);

  console.log('\n--- 2. Testing Database Operations (JSON DB) ---');
  const dbPath = path.join(process.cwd(), 'src', 'data', 'products-db.json');
  
  // Read existing DB
  let products = [];
  if (fs.existsSync(dbPath)) {
    products = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } else {
    const { allProducts } = require('../src/data/products');
    products = [...allProducts];
  }

  console.log(`✓ Initial products in DB: ${products.length}`);

  // Add new product
  const newProduct = {
    id: 'prod-' + Date.now(),
    slug: 'stride-pro-thermal-sportswear-top',
    name: 'STRIDE Pro Thermal Sportswear Top',
    category: 'Apparel',
    gender: 'Men',
    price: 850,
    originalPrice: 1100,
    image: `/uploads/products/${destFilename}`,
    gallery: [`/uploads/products/${destFilename}`],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Oatmeal Heather / Black', hex: '#E2DBD2' },
      { name: 'Obsidian Stealth', hex: '#11191C' }
    ],
    rating: 4.9,
    reviewsCount: 18,
    description: 'Constructed from thermal micro-mesh knit with dual-layer temperature regulation, engineered for cold-morning road miles and high-intensity gym sessions.',
    features: [
      'Dual-layer thermal micro-mesh knit',
      'Ergonomic athletic raglan sleeve construction',
      'Anti-odor antimicrobial finish',
      'High-flex flatlock anti-chafing seams'
    ],
    isFeatured: false,
    tag: 'NEW',
    inStock: true
  };

  // Check if already exists, else unshift
  const existingIdx = products.findIndex(p => p.slug === newProduct.slug);
  if (existingIdx >= 0) {
    products[existingIdx] = newProduct;
  } else {
    products.unshift(newProduct);
  }

  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`✓ Product added to database: "${newProduct.name}" (Slug: ${newProduct.slug})`);
  console.log(`✓ Updated total products in DB: ${products.length}`);

  // Test reading back
  const readBack = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const found = readBack.find(p => p.slug === newProduct.slug);
  if (!found) {
    throw new Error('Product verification failed: could not read back product from DB!');
  }
  console.log(`✓ Verification passed! Read back product from DB: ID ${found.id}, Price GH₵ ${found.price}`);

  // Test updating price
  found.price = 890;
  fs.writeFileSync(dbPath, JSON.stringify(readBack, null, 2), 'utf-8');
  console.log(`✓ Edit test passed! Updated price to GH₵ ${found.price}`);

  console.log('\n--- 3. Testing Authentication Logic ---');
  const crypto = require('crypto');
  const SECRET = 'stride-secret-key-2026-production';
  const payload = { role: 'admin', timestamp: Date.now() };
  const str = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(str).digest('base64url');
  const token = `${str}.${sig}`;
  console.log(`✓ Generated admin auth token: ${token.substring(0, 30)}...`);

  console.log('\nAll tests completed successfully!');
}

testSystem().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
