# saasproducts Marketplace

**saasproducts** is a professional full-stack marketplace for SaaS templates, automation kits, AI prompt systems, and creator-ready digital products. The project includes a polished React frontend, an Express backend for local/full-stack hosting, Cloudflare Pages Functions for edge deployment, and an operational admin panel.

## Key Features

| Area | Implementation |
|---|---|
| Frontend | Vite, React, TypeScript, Tailwind CSS, glassmorphism marketplace UI |
| Backend | Express API for local/full-stack runtime with catalog, checkout, auth, health, and admin endpoints |
| Cloudflare | `wrangler.toml` plus Pages Functions under `functions/api/**` for edge API routes |
| Admin Panel | `/admin` dashboard with revenue KPIs, category governance, recent orders, backend health, and launch checklist |
| Brand Migration | All legacy `neuraforge` references have been replaced with `saasproducts` |

## Local Development

```bash
npm install
npm run dev
```

The local server starts the Express backend and Vite middleware together, so frontend routes and `/api/**` endpoints are served from the same runtime.

## Validation

```bash
npm run lint
npm run build
```

Both commands have been run successfully after the full-stack upgrades.

## Cloudflare Pages Deployment

This repository is configured for Cloudflare Pages using the following settings.

| Setting | Value |
|---|---|
| Build command | `npm run build:client` |
| Build output directory | `dist` |
| Functions directory | `functions` |
| Compatibility date | `2026-05-25` |
| Project name | `saasproducts` |

Deploy manually with:

```bash
npx wrangler pages deploy dist --project-name saasproducts
```

For local Cloudflare Pages emulation:

```bash
npm run dev:cloudflare
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon/Postgres database connection used by Auth.js and Prisma in the Express backend |
| `AUTH_SECRET` | Auth.js session encryption secret |
| `GITHUB_ID` | GitHub OAuth application client ID |
| `GITHUB_SECRET` | GitHub OAuth application client secret |
| `VITE_PAYPAL_CLIENT_ID` | PayPal checkout client ID for the frontend button |

## Primary Routes

| Route | Purpose |
|---|---|
| `/` | Professional landing page |
| `/marketplace` | Searchable and filterable product catalog |
| `/template/:id` | Product detail and checkout flow |
| `/dashboard/creator` | Creator dashboard |
| `/admin` | Admin operations panel |
| `/api/health` | Backend and Cloudflare health endpoint |
| `/api/templates` | Product catalog API |
| `/api/admin/overview` | Admin analytics API |
| `/api/checkout/paypal` | Checkout order creation API |
| `/api/checkout/capture` | Checkout completion API |
