const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function generateShoeSVG(accentColor, secondaryColor, label, watermark) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none" width="600" height="420">
  <defs>
    <radialGradient id="glow-${label}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="foam-${label}" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="${accentColor}" />
    </linearGradient>
    <linearGradient id="plate-${label}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="upper-${label}" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="60%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <filter id="shadow-${label}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.65" />
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="${accentColor}" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Ambient Underglow -->
  <ellipse cx="300" cy="330" rx="220" ry="40" fill="url(#glow-${label})" />
  <!-- Dark Ground Contact Shadow -->
  <ellipse cx="300" cy="335" rx="190" ry="22" fill="#000000" opacity="0.75" filter="blur(10px)" />

  <!-- Ghost Watermark in Background -->
  <text x="300" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="78" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" letter-spacing="8" text-anchor="middle" text-transform="uppercase">${watermark}</text>

  <!-- Shoe Silhouette Group with dynamic rotation -->
  <g transform="translate(40, 20) rotate(-4 260 200)" filter="url(#shadow-${label})">
    <!-- Midsole Base -->
    <path d="M 80 280 C 130 295, 220 305, 300 290 C 370 275, 430 250, 470 230 C 475 235, 480 245, 470 260 C 420 295, 330 320, 240 315 C 160 310, 95 295, 80 280 Z" fill="url(#foam-${label})" />
    
    <!-- Outsole Rubber Tread -->
    <path d="M 85 285 C 135 300, 225 310, 305 295 C 375 280, 435 255, 468 238 L 472 250 C 425 288, 335 315, 245 312 C 165 308, 100 292, 85 285 Z" fill="#0F172A" />
    <!-- Lug Grips -->
    <line x1="140" y1="298" x2="160" y2="304" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
    <line x1="180" y1="305" x2="200" y2="308" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
    <line x1="220" y1="309" x2="240" y2="310" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
    <line x1="260" y1="308" x2="280" y2="306" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
    <line x1="320" y1="298" x2="340" y2="292" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
    <line x1="360" y1="288" x2="380" y2="280" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />

    <!-- Carbon Fiber Propulsion Plate Core -->
    <path d="M 120 285 C 180 292, 280 288, 360 265 C 400 252, 440 238, 460 230" stroke="url(#plate-${label})" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.9" />

    <!-- Upper Body Mesh -->
    <path d="M 90 275 C 95 220, 130 180, 180 160 C 220 145, 260 140, 290 170 C 330 195, 380 215, 430 220 C 460 222, 475 228, 470 232 C 430 250, 370 275, 300 290 C 220 305, 130 295, 90 275 Z" fill="url(#upper-${label})" />

    <!-- Aeroweave Mesh Overlay Texture -->
    <path d="M 140 240 Q 200 220 260 230 T 360 220" stroke="rgba(255,255,255,0.12)" stroke-width="2" fill="none" />
    <path d="M 150 220 Q 210 200 270 210 T 370 200" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" fill="none" />
    <path d="M 160 200 Q 220 180 280 190 T 380 180" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" fill="none" />

    <!-- Ankle Collar & Tongue -->
    <path d="M 175 162 C 165 140, 180 120, 205 125 C 220 128, 230 140, 240 155 C 248 165, 255 170, 265 172" fill="#0B131E" stroke="${secondaryColor}" stroke-width="2" />
    <path d="M 205 125 C 225 105, 245 110, 255 135 L 260 155" fill="${accentColor}" opacity="0.85" />

    <!-- Lacing System -->
    <path d="M 230 150 L 255 180" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
    <path d="M 250 160 L 275 190" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
    <path d="M 270 170 L 295 200" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />
    <path d="M 290 180 L 315 210" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
    <path d="M 310 190 L 335 220" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" />

    <!-- STRIDE Signature Kinetic Chevron Logo on Lateral Quarter -->
    <g transform="translate(230, 200) rotate(-14) scale(0.9)">
      <path d="M 10 32 L 28 6 H 38 L 20 32 H 10 Z" fill="${accentColor}" opacity="0.95" />
      <path d="M 29 32 L 47 6 H 57 L 39 32 H 29 Z" fill="#FFFFFF" opacity="0.9" />
    </g>

    <!-- Heel Stabilizer Clip -->
    <path d="M 85 270 C 80 230, 100 200, 130 195 C 135 215, 120 250, 115 270 Z" fill="${accentColor}" opacity="0.8" />
  </g>

  <!-- Spec Tag Badge in Corner -->
  <g transform="translate(480, 50)">
    <rect width="80" height="24" rx="12" fill="#0F172A" stroke="rgba(255,255,255,0.15)" />
    <circle cx="14" cy="12" r="4" fill="${accentColor}" />
    <text x="24" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="10" fill="#FFFFFF" letter-spacing="1">STRIDE</text>
  </g>
</svg>`;
}

function generateApparelSVG(color, accent, type, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none" width="600" height="420">
  <defs>
    <radialGradient id="appGlow-${title}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="bodyGrad-${title}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="${color}" />
    </linearGradient>
  </defs>

  <ellipse cx="300" cy="360" rx="200" ry="35" fill="url(#appGlow-${title})" />
  <ellipse cx="300" cy="365" rx="160" ry="18" fill="#000000" opacity="0.7" filter="blur(8px)" />

  <text x="300" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="70" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" letter-spacing="6" text-anchor="middle" text-transform="uppercase">${title}</text>

  <!-- Apparel Silhouette: Hoodie or Tee or Shorts -->
  <g transform="translate(140, 50)">
    ${type === 'hoodie' ? `
      <!-- Hoodie Body -->
      <path d="M 80 80 L 120 40 C 140 30, 180 30, 200 40 L 240 80 L 290 120 L 260 160 L 230 140 L 230 290 C 230 300, 90 300, 90 290 L 90 140 L 60 160 L 30 120 Z" fill="url(#bodyGrad-${title})" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
      <!-- Scuba Hood -->
      <path d="M 120 40 C 120 0, 200 0, 200 40 C 180 60, 140 60, 120 40 Z" fill="#0F172A" stroke="${accent}" stroke-width="1.5" />
      <!-- Zipper -->
      <line x1="160" y1="55" x2="160" y2="180" stroke="${accent}" stroke-width="3" stroke-linecap="round" />
      <!-- Kangaroo Pocket -->
      <path d="M 120 220 L 200 220 L 210 270 L 110 270 Z" fill="#0B131E" stroke="rgba(255,255,255,0.08)" />
      <!-- STRIDE Logo on Chest -->
      <path d="M 185 100 L 195 85 H 202 L 192 100 Z" fill="${accent}" />
      <path d="M 197 100 L 207 85 H 214 L 204 100 Z" fill="#FFFFFF" />
    ` : type === 'tee' ? `
      <!-- Athletic Tee Body -->
      <path d="M 90 70 L 130 45 C 145 55, 175 55, 190 45 L 230 70 L 280 110 L 250 145 L 220 125 L 220 290 C 220 295, 100 295, 100 290 L 100 125 L 70 145 L 40 110 Z" fill="url(#bodyGrad-${title})" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
      <!-- Crew Neck Trim -->
      <path d="M 130 45 C 145 60, 175 60, 190 45" stroke="${accent}" stroke-width="3" fill="none" />
      <!-- Breathable Ventilation Mesh Lines -->
      <line x1="110" y1="140" x2="110" y2="270" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4" opacity="0.6" />
      <line x1="210" y1="140" x2="210" y2="270" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4" opacity="0.6" />
      <!-- STRIDE Logo Center Chest -->
      <path d="M 150 100 L 160 85 H 167 L 157 100 Z" fill="${accent}" />
      <path d="M 162 100 L 172 85 H 179 L 169 100 Z" fill="#FFFFFF" />
    ` : `
      <!-- Split Shorts -->
      <path d="M 80 80 H 240 L 255 240 C 220 250, 180 230, 160 170 C 140 230, 100 250, 65 240 Z" fill="url(#bodyGrad-${title})" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
      <!-- Waistband -->
      <rect x="75" y="70" width="170" height="24" rx="6" fill="#0F172A" stroke="${accent}" stroke-width="1.5" />
      <!-- Drawstrings -->
      <line x1="155" y1="94" x2="150" y2="130" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
      <line x1="165" y1="94" x2="170" y2="130" stroke="${accent}" stroke-width="2" stroke-linecap="round" />
      <!-- Split Leg Accent -->
      <path d="M 70 200 L 65 240" stroke="${accent}" stroke-width="3" />
      <path d="M 250 200 L 255 240" stroke="${accent}" stroke-width="3" />
      <!-- STRIDE Chevron on Hem -->
      <path d="M 90 220 L 98 206 H 104 L 96 220 Z" fill="${accent}" />
      <path d="M 100 220 L 108 206 H 114 L 106 220 Z" fill="#FFFFFF" />
    `}
  </g>

  <!-- Spec Tag -->
  <g transform="translate(480, 50)">
    <rect width="80" height="24" rx="12" fill="#0F172A" stroke="rgba(255,255,255,0.15)" />
    <circle cx="14" cy="12" r="4" fill="${accent}" />
    <text x="24" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="10" fill="#FFFFFF" letter-spacing="1">STRIDE</text>
  </g>
</svg>`;
}

function generateGearSVG(type, accent, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" fill="none" width="600" height="420">
  <defs>
    <radialGradient id="gearGlow-${title}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="gearGrad-${title}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="50%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
  </defs>

  <ellipse cx="300" cy="355" rx="190" ry="32" fill="url(#gearGlow-${title})" />
  <ellipse cx="300" cy="360" rx="150" ry="16" fill="#000000" opacity="0.75" filter="blur(8px)" />

  <text x="300" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="64" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" letter-spacing="6" text-anchor="middle" text-transform="uppercase">${title}</text>

  <g transform="translate(180, 60)">
    ${type === 'bag' ? `
      <!-- Duffel Bag Body -->
      <rect x="0" y="80" width="240" height="150" rx="40" fill="url(#gearGrad-${title})" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
      <!-- Top Handle Straps -->
      <path d="M 50 80 C 50 10, 190 10, 190 80" stroke="${accent}" stroke-width="7" stroke-linecap="round" fill="none" />
      <line x1="50" y1="80" x2="50" y2="230" stroke="#0B131E" stroke-width="12" />
      <line x1="190" y1="80" x2="190" y2="230" stroke="#0B131E" stroke-width="12" />
      <!-- Water Resistant Zip -->
      <line x1="40" y1="120" x2="200" y2="120" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 4" />
      <!-- STRIDE Branding -->
      <path d="M 105 160 L 115 145 H 122 L 112 160 Z" fill="${accent}" />
      <path d="M 117 160 L 127 145 H 134 L 124 160 Z" fill="#FFFFFF" />
      <text x="140" y="157" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="12" fill="#FFFFFF" letter-spacing="2">STRIDE 35L</text>
    ` : type === 'sling' ? `
      <!-- CrossBody Sling Bag -->
      <rect x="30" y="90" width="180" height="130" rx="30" fill="url(#gearGrad-${title})" stroke="${accent}" stroke-width="2" />
      <!-- Tactical Crossbody Strap -->
      <path d="M 0 50 L 50 90 L 190 220 L 240 260" stroke="#0B131E" stroke-width="16" stroke-linecap="round" fill="none" />
      <path d="M 0 50 L 50 90 L 190 220 L 240 260" stroke="${accent}" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6" />
      <!-- Quick Release Buckle -->
      <rect x="90" y="130" width="60" height="30" rx="8" fill="#020617" stroke="#FFFFFF" stroke-width="2" />
      <!-- STRIDE Logo -->
      <path d="M 105 115 L 113 105 H 119 L 111 115 Z" fill="${accent}" />
      <path d="M 115 115 L 123 105 H 129 L 121 115 Z" fill="#FFFFFF" />
    ` : type === 'socks' ? `
      <!-- High Performance Crew Socks Pair -->
      <path d="M 60 40 L 95 40 L 95 190 C 95 210, 140 230, 160 215 C 175 205, 170 180, 135 170 L 95 160 L 60 160 Z" fill="url(#gearGrad-${title})" stroke="${accent}" stroke-width="2" />
      <!-- Ribbed Compression Cuff -->
      <rect x="60" y="40" width="35" height="30" fill="#0F172A" />
      <line x1="60" y1="48" x2="95" y2="48" stroke="${accent}" stroke-width="2" />
      <line x1="60" y1="58" x2="95" y2="58" stroke="#FFFFFF" stroke-width="2" />
      <!-- Pair 2 Shadowed Behind -->
      <path d="M 130 50 L 165 50 L 165 200 C 165 220, 210 240, 230 225 C 245 215, 240 190, 205 180 L 165 170 L 130 170 Z" fill="url(#gearGrad-${title})" stroke="rgba(255,255,255,0.2)" stroke-width="2" opacity="0.85" />
      <rect x="130" y="50" width="35" height="30" fill="#0F172A" />
      <!-- STRIDE Emblem -->
      <path d="M 70 100 L 78 88 H 84 L 76 100 Z" fill="${accent}" />
      <path d="M 80 100 L 88 88 H 94 L 86 100 Z" fill="#FFFFFF" />
    ` : type === 'cap' ? `
      <!-- AeroVent Running Visor Cap -->
      <path d="M 30 180 C 40 100, 180 90, 210 180 Z" fill="url(#gearGrad-${title})" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
      <!-- Aerodynamic Brim -->
      <path d="M 30 180 C 60 170, 150 170, 210 180 C 235 185, 270 200, 260 210 C 210 225, 90 220, 30 180 Z" fill="#0F172A" stroke="${accent}" stroke-width="2" />
      <!-- Laser Perforated Breathability -->
      <circle cx="100" cy="140" r="3" fill="${accent}" />
      <circle cx="115" cy="140" r="3" fill="${accent}" />
      <circle cx="130" cy="140" r="3" fill="${accent}" />
      <circle cx="107" cy="155" r="3" fill="${accent}" />
      <circle cx="122" cy="155" r="3" fill="${accent}" />
      <!-- Front STRIDE Chevron -->
      <path d="M 115 130 L 125 115 H 132 L 122 130 Z" fill="${accent}" />
      <path d="M 127 130 L 137 115 H 144 L 134 130 Z" fill="#FFFFFF" />
    ` : `
      <!-- HydroLock Insulated Bottle -->
      <rect x="80" y="60" width="80" height="230" rx="20" fill="url(#gearGrad-${title})" stroke="${accent}" stroke-width="2" />
      <!-- Chug Sports Lid -->
      <rect x="95" y="30" width="50" height="30" rx="8" fill="#0F172A" stroke="#FFFFFF" stroke-width="1.5" />
      <path d="M 135 40 C 160 30, 165 60, 140 60" stroke="${accent}" stroke-width="5" fill="none" stroke-linecap="round" />
      <!-- Rubber Grip Ring -->
      <rect x="80" y="110" width="80" height="40" fill="#0B131E" stroke="${accent}" stroke-width="1.5" />
      <!-- Measure Scale Markings -->
      <line x1="85" y1="180" x2="105" y2="180" stroke="${accent}" stroke-width="2" />
      <line x1="85" y1="200" x2="115" y2="200" stroke="${accent}" stroke-width="2" />
      <line x1="85" y1="220" x2="105" y2="220" stroke="${accent}" stroke-width="2" />
      <!-- STRIDE Typography Vertical -->
      <text x="135" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="16" fill="#FFFFFF" letter-spacing="4" transform="rotate(-90 135 210)">STRIDE</text>
    `}
  </g>

  <g transform="translate(480, 50)">
    <rect width="80" height="24" rx="12" fill="#0F172A" stroke="rgba(255,255,255,0.15)" />
    <circle cx="14" cy="12" r="4" fill="${accent}" />
    <text x="24" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="10" fill="#FFFFFF" letter-spacing="1">STRIDE</text>
  </g>
</svg>`;
}

const shoeList = [
  { file: 'shoe-1.svg', accent: '#8EF03A', sec: '#00E5FF', label: 's1', wm: 'ZOOM X' },
  { file: 'shoe-1-alt1.svg', accent: '#00E5FF', sec: '#8EF03A', label: 's1a1', wm: 'KINETIC' },
  { file: 'shoe-1-alt2.svg', accent: '#FF7A1A', sec: '#FFFFFF', label: 's1a2', wm: 'SOLAR' },

  { file: 'shoe-2.svg', accent: '#00E5FF', sec: '#FFFFFF', label: 's2', wm: 'AERO ELITE' },
  { file: 'shoe-2-alt1.svg', accent: '#8EF03A', sec: '#00E5FF', label: 's2a1', wm: 'CARBON' },
  { file: 'shoe-2-alt2.svg', accent: '#FFFFFF', sec: '#00E5FF', label: 's2a2', wm: 'STEALTH' },

  { file: 'shoe-3.svg', accent: '#FF7A1A', sec: '#00E5FF', label: 's3', wm: 'VAPOR' },
  { file: 'shoe-3-alt1.svg', accent: '#00E5FF', sec: '#FF7A1A', label: 's3a1', wm: 'DASH 3' },

  { file: 'shoe-4.svg', accent: '#00E5FF', sec: '#FFFFFF', label: 's4', wm: 'PHANTOM' },
  { file: 'shoe-4-alt1.svg', accent: '#8EF03A', sec: '#00E5FF', label: 's4a1', wm: 'GLIDE' },

  { file: 'shoe-5.svg', accent: '#00E5FF', sec: '#8EF03A', label: 's5', wm: 'TURBO' },
  { file: 'shoe-5-alt1.svg', accent: '#8EF03A', sec: '#FF7A1A', label: 's5a1', wm: 'PULSE' },

  { file: 'shoe-6.svg', accent: '#00E5FF', sec: '#FFFFFF', label: 's6', wm: 'CLOUD' },
  { file: 'shoe-6-alt1.svg', accent: '#FF7A1A', sec: '#00E5FF', label: 's6a1', wm: 'STRIDER' },

  { file: 'shoe-7.svg', accent: '#8EF03A', sec: '#00E5FF', label: 's7', wm: 'TRACK' },
  { file: 'shoe-7-alt1.svg', accent: '#00E5FF', sec: '#8EF03A', label: 's7a1', wm: 'SPIKES' },

  { file: 'shoe-8.svg', accent: '#00E5FF', sec: '#FF7A1A', label: 's8', wm: 'ZERO' },
  { file: 'shoe-8-alt1.svg', accent: '#FF7A1A', sec: '#8EF03A', label: 's8a1', wm: 'JUNIOR' },
];

shoeList.forEach(s => {
  fs.writeFileSync(path.join(targetDir, s.file), generateShoeSVG(s.accent, s.sec, s.label, s.wm), 'utf8');
});

const gearList = [
  { file: 'apparel-1.svg', color: '#11191C', accent: '#00E5FF', type: 'hoodie', title: 'TECH FLEECE' },
  { file: 'apparel-1-alt1.svg', color: '#1E293B', accent: '#8EF03A', type: 'hoodie', title: 'AEROFLOW' },
  { file: 'apparel-2.svg', color: '#0F172A', accent: '#00E5FF', type: 'tee', title: 'KINETIC TEE' },
  { file: 'bag-1.svg', type: 'bag', accent: '#00E5FF', title: '35L DUFFEL' },
  { file: 'sock-1.svg', type: 'socks', accent: '#00E5FF', title: 'CREW SOCKS' },
  { file: 'cap-1.svg', type: 'cap', accent: '#00E5FF', title: 'RUNNING CAP' },
  { file: 'bottle-1.svg', type: 'bottle', accent: '#00E5FF', title: 'HYDROLOCK' },
  { file: 'apparel-3.svg', color: '#0F172A', accent: '#00E5FF', type: 'shorts', title: 'SPLIT SHORTS' },
  { file: 'bag-2.svg', type: 'sling', accent: '#8EF03A', title: 'UTILITY PACK' },
];

gearList.forEach(g => {
  if (g.type === 'hoodie' || g.type === 'tee' || g.type === 'shorts') {
    fs.writeFileSync(path.join(targetDir, g.file), generateApparelSVG(g.color, g.accent, g.type, g.title), 'utf8');
  } else {
    fs.writeFileSync(path.join(targetDir, g.file), generateGearSVG(g.type, g.accent, g.title), 'utf8');
  }
});

console.log('Successfully generated all product SVG visual assets in public/images/products!');
