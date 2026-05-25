# saasproducts Deployment Guide

This guide covers deploying the saasproducts marketplace to **Cloudflare Pages** with custom domain, Drizzle ORM database, and email integration.

## Quick Start

### Prerequisites

- Cloudflare account with domain `saasproducts.dpdns.org`
- GitHub repository: `https://github.com/streami-debug/saasproducts`
- Wrangler CLI: `npm install -g wrangler`

## Step 1: Deploy to Cloudflare Pages (GitHub Integration)

### Option A: Automatic Deployment (Recommended)

1. **Connect GitHub to Cloudflare:**
   - Go to **Cloudflare Dashboard** → **Pages**
   - Click **Create a project** → **Connect to Git**
   - Authorize GitHub and select `streami-debug/saasproducts`

2. **Configure Build Settings:**
   - **Production branch:** `main`
   - **Build command:** `npm run build:client`
   - **Build output directory:** `dist`
   - **Root directory:** `/`

3. **Set Environment Variables:**
   - In Cloudflare Pages project settings, add:
     ```
     VITE_PAYPAL_CLIENT_ID=test
     NODE_ENV=production
     ```

4. **Deploy:**
   - Push to `main` branch to trigger automatic deployment
   - Cloudflare will build and deploy within 2-5 minutes

### Option B: Manual Deployment (Wrangler)

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name saasproducts
```

## Step 2: Configure Custom Domain

1. **In Cloudflare Dashboard:**
   - Navigate to **Pages** → **saasproducts project**
   - Go to **Custom domains**
   - Click **Set up a custom domain**
   - Enter: `saasproducts.dpdns.org`

2. **Verify DNS:**
   - Cloudflare will provide DNS records
   - Ensure they're added to your DNS provider
   - Wait for DNS propagation (usually 5-10 minutes)

## Step 3: Set Up Cloudflare D1 Database

### Create D1 Database

```bash
# Create a new D1 database
wrangler d1 create saasproducts-db

# Note the database_id from the output
```

### Update wrangler.toml

```toml
[[d1_databases]]
binding = "DB"
database_name = "saasproducts-db"
database_id = "YOUR_DATABASE_ID"
```

### Initialize Database Schema

```bash
# Generate Drizzle migrations
npm run db:generate

# Push migrations to D1
npm run db:push

# Seed initial data
npm run db:seed
```

## Step 4: Configure Email Routing

See **CLOUDFLARE_EMAIL_SETUP.md** for detailed email configuration.

Quick setup:
1. Enable Email Routing in Cloudflare
2. Configure DKIM records
3. Set `ADMIN_EMAIL` environment variable in Cloudflare Pages

## Step 5: Deploy Functions (API Routes)

Functions are automatically deployed when you push to GitHub:

| Endpoint | Function | Purpose |
|----------|----------|---------|
| `/api/health` | `functions/api/health.ts` | Health check |
| `/api/templates` | `functions/api/templates/index.ts` | List products |
| `/api/templates/:id` | `functions/api/templates/[id].ts` | Product details |
| `/api/admin/overview` | `functions/api/admin/overview.ts` | Admin dashboard |
| `/api/checkout/paypal` | `functions/api/checkout/paypal.ts` | Create order |
| `/api/checkout/capture` | `functions/api/checkout/capture.ts` | Capture payment |
| `/api/email/send` | `functions/api/email/send.ts` | Send email |

## Step 6: Environment Variables

Set these in **Cloudflare Pages → Settings → Environment variables:**

```env
# PayPal
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id

# Email
ADMIN_EMAIL=admin@saasproducts.dpdns.org

# App
NODE_ENV=production
VITE_APP_NAME=saasproducts
```

## Verification Checklist

- [ ] GitHub repository created and main branch pushed
- [ ] Cloudflare Pages project connected to GitHub
- [ ] Custom domain `saasproducts.dpdns.org` configured
- [ ] D1 database created and migrations applied
- [ ] Email Routing enabled with DKIM records
- [ ] Environment variables set in Cloudflare Pages
- [ ] First deployment successful (check build logs)
- [ ] API endpoints responding at `https://saasproducts.dpdns.org/api/health`
- [ ] Marketplace accessible at `https://saasproducts.dpdns.org/marketplace`
- [ ] Admin panel accessible at `https://saasproducts.dpdns.org/admin`

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Server runs on http://localhost:3000
```

## Testing

### Test API Endpoints

```bash
# Health check
curl https://saasproducts.dpdns.org/api/health

# List templates
curl https://saasproducts.dpdns.org/api/templates

# Get single template
curl https://saasproducts.dpdns.org/api/templates/tpl_1

# Admin overview
curl https://saasproducts.dpdns.org/api/admin/overview
```

### Test Email

```bash
curl -X POST https://saasproducts.dpdns.org/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "html": "<h1>Hello from saasproducts!</h1>"
  }'
```

## Troubleshooting

### Build Fails

1. Check Cloudflare Pages build logs
2. Verify Node.js version compatibility
3. Ensure all dependencies are in `package.json`

### Functions Not Working

1. Check function logs in Cloudflare Pages
2. Verify function files are in `functions/api/` directory
3. Ensure TypeScript compiles without errors

### Database Issues

1. Verify D1 database is created and bound
2. Check database migrations: `wrangler d1 execute saasproducts-db --remote --command "SELECT * FROM templates"`
3. Review Drizzle configuration in `drizzle.config.ts`

### Email Not Sending

See **CLOUDFLARE_EMAIL_SETUP.md** troubleshooting section

### Domain Not Resolving

1. Verify DNS records in Cloudflare
2. Check domain registrar settings
3. Wait for DNS propagation (up to 48 hours)

## Monitoring

### View Logs

```bash
# Stream Cloudflare Pages logs
wrangler pages deployment list --project-name saasproducts

# View function logs
wrangler tail --project-name saasproducts
```

### Analytics

- Cloudflare Pages provides built-in analytics
- Monitor in **Pages → saasproducts → Analytics**

## Scaling

### Database Optimization

- Add indexes for frequently queried columns
- Use pagination for large result sets
- Monitor D1 query performance

### CDN Caching

- Configure cache headers in `wrangler.toml`
- Use Cloudflare Cache Rules for optimization
- Monitor cache hit ratio in Analytics

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/
- **Drizzle Docs:** https://orm.drizzle.team/
- **GitHub Issues:** https://github.com/streami-debug/saasproducts/issues
