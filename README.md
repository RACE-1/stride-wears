# Nike Store E-Commerce Application

A modern, high-performance Nike Store e-commerce application built with the latest **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**.

---

## ⚡ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (Latest, App Router) with TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Headless CMS**: [Sanity.io](https://sanity.io/) (`next-sanity`, embedded Studio at `/studio`, GROQ querying)
- **Deployment Target**: [Vercel](https://vercel.com/)
- **Package Manager**: `npm`
- **Icons**: `lucide-react`

---

## 📂 Project Structure

```
├── sanity.config.ts            # Sanity Studio root configuration
├── vercel.json                 # Vercel deployment configuration
├── .env.example                # Environment variables reference
├── .env.local                  # Local development environment configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata & fonts
│   │   ├── page.tsx            # Main storefront home page (Server Component)
│   │   ├── globals.css         # Tailwind CSS entrypoint
│   │   └── studio/             # Embedded Sanity Studio route (/studio)
│   │       └── [[...tool]]/
│   │           └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx          # Top utility banner, brand logo, search & bag
│   │   ├── Hero.tsx            # Full-bleed campaign hero banner (LCP optimized)
│   │   ├── ProductSection.tsx  # Dynamic category pills filter & sort selector
│   │   ├── ProductCard.tsx     # Sneaker card with size selector & add-to-bag
│   │   ├── FeaturesBanner.tsx  # Delivery, returns & membership benefits
│   │   ├── Footer.tsx          # Nike guides, terms, and footer links
│   │   └── StoreFront.tsx      # Interactive client state wrapper
│   ├── data/
│   │   └── mockData.ts         # High-resolution fallback Nike footwear data
│   ├── sanity/
│   │   ├── env.ts              # Type-safe Sanity environment variables
│   │   ├── lib/
│   │   │   ├── client.ts       # Sanity client & connection detection
│   │   │   ├── image.ts        # Image builder helper
│   │   │   └── queries.ts      # GROQ queries for products, categories, banner
│   │   └── schemaTypes/        # CMS schemas for Sanity Studio
│   │       ├── product.ts      # Product document schema
│   │       ├── category.ts     # Category document schema
│   │       ├── banner.ts       # Hero banner document schema
│   │       └── index.ts        # Schema definitions index
│   └── services/
│       └── storeService.ts     # Unified data layer (Sanity with graceful fallback)
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the Nike Store.

---

## 🛠️ Sanity Headless CMS Setup

The project includes an embedded Sanity Studio at `/studio` so your client can manage products, categories, and banners directly from the browser.

### Using Without Sanity (Mock Mode)
The application works immediately out-of-the-box using the built-in catalog in `src/data/mockData.ts`. If no live Sanity project ID is provided, the store seamlessly falls back to mock data with zero errors.

### Connecting a Live Sanity Project
1. Create a project at [sanity.io/manage](https://sanity.io/manage).
2. Copy your **Project ID** and dataset name (`production`).
3. Set your environment variables in `.env.local` (or in Vercel project settings):
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_READ_TOKEN=your-token-if-needed
   ```
4. Access the embedded Sanity Studio at:
   ```
   http://localhost:3000/studio
   ```
   Here, the client can create and publish Nike sneakers, change prices, update sizes, and swap out the hero campaign banner.

---

## ☁️ Deployment to Vercel

This repository is pre-configured for zero-friction Vercel deployment:

### Option A: Using Vercel Git Integration
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Vercel will automatically detect Next.js and the `vercel.json` build settings.
4. Add your `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` environment variables in the Vercel project dashboard.
5. Click **Deploy**.

### Option B: Using Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🛡️ Production Verification

Run the production build locally to verify all types and static assets:
```bash
npm run build
npm run start
```
