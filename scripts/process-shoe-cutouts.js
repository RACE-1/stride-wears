const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\96cf0893-1aaf-43c9-abc0-fcec3bfcaac5';

const filesToProcess = [
  {
    src: path.join(ARTIFACT_DIR, 'stride_volt_shoe_1793145936880.jpg'),
    dest: [
      path.join(__dirname, '../public/images/shoe-lime.png'),
      path.join(__dirname, '../public/images/products/shoe-1.png'),
      path.join(__dirname, '../public/images/products/shoe-1-lime.png'),
      path.join(__dirname, '../public/images/products/shoe-2-lime.png'),
      path.join(__dirname, '../public/images/products/shoe-3-lime.png'),
    ]
  },
  {
    src: path.join(ARTIFACT_DIR, 'stride_blue_shoe_1793145967294.jpg'),
    dest: [
      path.join(__dirname, '../public/images/shoe-blue.png'),
      path.join(__dirname, '../public/images/products/shoe-1-alt1.png'),
      path.join(__dirname, '../public/images/products/shoe-1-blue.png'),
      path.join(__dirname, '../public/images/products/shoe-2-blue.png'),
      path.join(__dirname, '../public/images/products/shoe-2.png'),
    ]
  },
  {
    src: path.join(ARTIFACT_DIR, 'stride_orange_shoe_1793145999524.jpg'),
    dest: [
      path.join(__dirname, '../public/images/shoe-orange.png'),
      path.join(__dirname, '../public/images/products/shoe-1-alt2.png'),
      path.join(__dirname, '../public/images/products/shoe-1-orange.png'),
      path.join(__dirname, '../public/images/products/shoe-3.png'),
    ]
  },
  {
    src: path.join(ARTIFACT_DIR, 'stride_volt_pair_1793146021286.jpg'),
    dest: [
      path.join(__dirname, '../public/images/shoe-pair.png'),
      path.join(__dirname, '../public/images/products/shoe-pair.png'),
      path.join(__dirname, '../public/images/products/shoe-4.png'),
    ]
  }
];

async function removeBackground(srcPath, destPaths) {
  console.log(`Processing: ${srcPath}`);
  const image = sharp(srcPath);
  const { width, height } = await image.metadata();

  // Get raw RGBA buffer
  const raw = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const data = raw.data; // Uint8Array [r, g, b, a, r, g, b, a...]

  // Visited array for BFS
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function isBackground(r, g, b, y) {
    // If very close to pure white, it's background
    if (r >= 238 && g >= 238 && b >= 238) return true;
    
    // Bottom shadow threshold: if y is in lower 25% of image and it's grey/neutral shadow
    if (y > height * 0.78) {
      const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      if (diff < 15 && r > 180 && g > 180 && b > 180) {
        return true; // remove soft cast shadow on floor
      }
    }
    return false;
  }

  // Seed BFS with border pixels
  for (let x = 0; x < width; x++) {
    // Top border
    let idx0 = x;
    let p0 = idx0 * 4;
    if (isBackground(data[p0], data[p0 + 1], data[p0 + 2], 0)) {
      visited[idx0] = 1;
      queue[tail++] = idx0;
    }

    // Bottom border
    let idxB = (height - 1) * width + x;
    let pB = idxB * 4;
    if (isBackground(data[pB], data[pB + 1], data[pB + 2], height - 1)) {
      visited[idxB] = 1;
      queue[tail++] = idxB;
    }
  }

  for (let y = 0; y < height; y++) {
    // Left border
    let idxL = y * width;
    let pL = idxL * 4;
    if (!visited[idxL] && isBackground(data[pL], data[pL + 1], data[pL + 2], y)) {
      visited[idxL] = 1;
      queue[tail++] = idxL;
    }

    // Right border
    let idxR = y * width + (width - 1);
    let pR = idxR * 4;
    if (!visited[idxR] && isBackground(data[pR], data[pR + 1], data[pR + 2], y)) {
      visited[idxR] = 1;
      queue[tail++] = idxR;
    }
  }

  // BFS expansion
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1,
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1
    ];

    for (let i = 0; i < 4; i++) {
      const n = neighbors[i];
      if (n !== -1 && !visited[n]) {
        const ny = Math.floor(n / width);
        const np = n * 4;
        if (isBackground(data[np], data[np + 1], data[np + 2], ny)) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
    }
  }

  // Set alpha = 0 for all visited background pixels
  for (let i = 0; i < width * height; i++) {
    if (visited[i]) {
      data[i * 4 + 3] = 0; // Transparent
    } else {
      // Check if neighboring any background pixel for subtle anti-aliasing feather
      const x = i % width;
      const y = Math.floor(i / width);
      let bgNeighbors = 0;
      if (x > 0 && visited[i - 1]) bgNeighbors++;
      if (x < width - 1 && visited[i + 1]) bgNeighbors++;
      if (y > 0 && visited[i - width]) bgNeighbors++;
      if (y < height - 1 && visited[i + width]) bgNeighbors++;

      if (bgNeighbors > 0) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        const brightness = (r + g + b) / 3;
        if (brightness > 220) {
          data[i * 4 + 3] = Math.round(255 * (1 - (brightness - 220) / 35));
        }
      }
    }
  }

  // Save as high-quality transparent PNG
  const processedBuffer = await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png({ compressionLevel: 8 })
  .toBuffer();

  for (const dest of destPaths) {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dest, processedBuffer);
    console.log(`Saved -> ${dest}`);
  }
}

async function run() {
  for (const item of filesToProcess) {
    if (fs.existsSync(item.src)) {
      await removeBackground(item.src, item.dest);
    } else {
      console.warn(`File not found: ${item.src}`);
    }
  }
  console.log('All shoe cutouts processed successfully!');
}

run().catch(console.error);
