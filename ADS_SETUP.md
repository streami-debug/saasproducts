# saasproducts Advertising Setup Guide

This guide covers setting up Google AdSense, sponsored product campaigns, and ad analytics for the saasproducts marketplace.

## Overview

The saasproducts marketplace includes three advertising revenue streams:

1. **Google AdSense** — Contextual ads on product pages and marketplace
2. **Sponsored Products** — Creators can promote their products with paid campaigns
3. **Banner Ads** — Strategic ad placements for maximum visibility and revenue

## Part 1: Google AdSense Integration

### Step 1: Set Up Google AdSense Account

1. Go to **Google AdSense** (https://www.google.com/adsense/start/)
2. Sign in with your Google account
3. Add your website: `saasproducts.dpdns.org`
4. Verify ownership via DNS or HTML file
5. Wait for approval (usually 24-48 hours)

### Step 2: Get Your Publisher ID

Once approved, you'll receive a **Publisher ID** (format: `ca-pub-xxxxxxxxxxxxxxxx`)

### Step 3: Add Publisher ID to Your Site

Update `src/components/ads/AdBanner.tsx`:

```tsx
data-ad-client="ca-pub-YOUR_PUBLISHER_ID_HERE"
```

Also add the AdSense script to your `index.html`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID_HERE"
     crossorigin="anonymous"></script>
```

### Step 4: Create Ad Slots

In Google AdSense dashboard:

1. Go to **Ads** → **Ad units**
2. Click **New ad unit**
3. Create ad units for each placement:
   - **Header Banner** (728x90)
   - **Sidebar** (300x250)
   - **Product Detail** (300x600)
   - **Marketplace Top** (970x90)

4. Copy the ad slot IDs and update `src/lib/ads.ts`:

```typescript
const adConfigs: Record<string, { width: string; height: string; slot: string }> = {
  header: {
    width: '728px',
    height: '90px',
    slot: 'YOUR_HEADER_SLOT_ID'
  },
  sidebar: {
    width: '300px',
    height: '250px',
    slot: 'YOUR_SIDEBAR_SLOT_ID'
  },
  // ... other placements
};
```

## Part 2: Ad Placements on Your Site

### Homepage Ad Banner

```tsx
import { AdBanner } from '@/components/ads/AdBanner';

export function HomePage() {
  return (
    <div>
      {/* ... hero section ... */}
      <AdBanner placement="marketplace-top" className="my-8" />
      {/* ... rest of page ... */}
    </div>
  );
}
```

### Marketplace Sidebar Ad

```tsx
export function MarketplacePage() {
  return (
    <div className="flex gap-8">
      <aside className="w-64">
        {/* Filters */}
        <AdBanner placement="sidebar" className="mt-8" />
      </aside>
      {/* Main content */}
    </div>
  );
}
```

### Product Detail Page Ad

```tsx
export function TemplateDetailsPage() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        {/* Product details */}
      </div>
      <aside>
        <AdBanner placement="product-detail" />
      </aside>
    </div>
  );
}
```

## Part 3: Sponsored Products

### Enable Sponsored Campaigns

Creators can promote their products by creating sponsored campaigns:

```typescript
import { createSponsoredCampaign } from '@/lib/ads';

const campaign = await createSponsoredCampaign({
  productId: 'tpl_1',
  productTitle: 'AI SaaS Website System Matrix',
  productPrice: 29,
  sponsorId: 'creator_001',
  sponsorName: 'saasproducts Studio',
  startDate: '2026-05-26',
  endDate: '2026-06-26',
  dailyBudget: 50,
  status: 'active'
});
```

### Display Sponsored Products

```tsx
import { SponsoredProductBanner } from '@/components/ads/AdBanner';

export function MarketplacePage() {
  const [sponsoredProducts, setSponsoredProducts] = useState([]);

  useEffect(() => {
    getSponsoredProducts().then(setSponsoredProducts);
  }, []);

  return (
    <div>
      {sponsoredProducts.map(product => (
        <SponsoredProductBanner
          key={product.id}
          productId={product.productId}
          productTitle={product.productTitle}
          productPrice={product.productPrice}
          productImage={product.productImage}
          onClick={() => navigate(`/template/${product.productId}`)}
        />
      ))}
    </div>
  );
}
```

## Part 4: Ad Analytics

### Track Impressions

```typescript
import { trackAdImpression } from '@/lib/ads';

// When an ad is displayed
trackAdImpression('YOUR_AD_SLOT_ID', 'marketplace-top');
```

### Track Clicks

```typescript
import { trackAdClick } from '@/lib/ads';

// When user clicks an ad
trackAdClick('YOUR_AD_SLOT_ID', 'marketplace-top', 'https://target-url.com');
```

### View Analytics

```typescript
import { getAdAnalytics } from '@/lib/ads';

const analytics = await getAdAnalytics('2026-05-01', '2026-05-31');
// Returns: [{ impressions, clicks, ctr, revenue, date }]
```

### Calculate Metrics

```typescript
import { calculateCTR, calculateCPM, calculateCPC, calculateROAS } from '@/lib/ads';

const ctr = calculateCTR(45, 1250); // 3.6%
const cpm = calculateCPM(125.50, 1250); // $100.40 per 1000 impressions
const cpc = calculateCPC(125.50, 45); // $2.79 per click
const roas = calculateROAS(450, 125.50); // 3.58x return
```

## Part 5: API Endpoints

### Ad Tracking

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ads/impression` | POST | Track ad impressions |
| `/api/ads/click` | POST | Track ad clicks |
| `/api/ads/analytics` | GET | Get analytics data |
| `/api/ads/sponsored-products` | GET | List sponsored campaigns |
| `/api/ads/sponsored-products` | POST | Create campaign |
| `/api/ads/sponsored-products/:id` | PATCH | Update campaign |

### Example: Track Impression

```bash
curl -X POST https://saasproducts.dpdns.org/api/ads/impression \
  -H "Content-Type: application/json" \
  -d '{
    "adSlot": "1234567890",
    "placement": "marketplace-top",
    "url": "https://saasproducts.dpdns.org/marketplace"
  }'
```

### Example: Create Sponsored Campaign

```bash
curl -X POST https://saasproducts.dpdns.org/api/ads/sponsored-products \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "tpl_1",
    "productTitle": "AI SaaS Website System Matrix",
    "productPrice": 29,
    "sponsorId": "creator_001",
    "sponsorName": "saasproducts Studio",
    "startDate": "2026-05-26",
    "endDate": "2026-06-26",
    "dailyBudget": 50,
    "status": "active"
  }'
```

## Part 6: Environment Variables

Add these to your Cloudflare Pages environment:

```env
# Google AdSense
VITE_ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_ENABLED=true

# Ad Configuration
VITE_AD_HEADER_SLOT=1234567890
VITE_AD_SIDEBAR_SLOT=0987654321
VITE_AD_PRODUCT_SLOT=2222222222
VITE_AD_MARKETPLACE_SLOT=3333333333
```

## Part 7: Revenue Optimization

### Best Practices

1. **Ad Placement** — Place ads where users naturally look (above fold, sidebar)
2. **Content Relevance** — Ensure ads match your audience interests
3. **Ad Density** — Don't overload pages with ads (max 3 per page)
4. **Page Speed** — Optimize ad loading to avoid slowing down your site
5. **Mobile Optimization** — Ensure ads display correctly on mobile

### Sponsored Product Strategy

1. **Pricing** — Charge creators $5-50/day for sponsored placements
2. **Placement** — Feature sponsored products in marketplace and homepage
3. **Duration** — Offer 7, 14, 30-day campaign options
4. **Performance** — Show creators their impressions, clicks, and conversions
5. **Approval** — Review campaigns before going live

## Monitoring & Troubleshooting

### Check Ad Performance

1. Go to **Google AdSense Dashboard**
2. View **Earnings** → **Performance reports**
3. Monitor CTR, CPM, and revenue trends

### Debug Ad Loading

```javascript
// In browser console
console.log((window as any).adsbygoogle);

// Should show array of ad units
// If empty, AdSense script may not have loaded
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Ads not showing | Verify Publisher ID and ad slots are correct |
| Low CTR | Improve ad placement and targeting |
| Low earnings | Increase traffic and optimize for high-value keywords |
| Ads blocked | Check ad blocker extensions and browser settings |

## Support

- **Google AdSense Help:** https://support.google.com/adsense/
- **AdSense Policies:** https://support.google.com/adsense/answer/48182
- **saasproducts Issues:** https://github.com/streami-debug/saasproducts/issues

---

**Ad Revenue Potential:** With 10,000 monthly visitors and 3% CTR, you could earn $300-500/month from AdSense alone, plus additional revenue from sponsored products.
