/**
 * Advertising utilities and analytics for saasproducts marketplace
 * Tracks ad impressions, clicks, and revenue
 */

export interface AdMetrics {
  impressions: number;
  clicks: number;
  ctr: number; // Click-through rate
  revenue: number;
  date: string;
}

export interface SponsoredProduct {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage?: string;
  sponsorId: string;
  sponsorName: string;
  startDate: string;
  endDate: string;
  dailyBudget: number;
  totalSpent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status: 'active' | 'paused' | 'ended';
}

/**
 * Ad placement configurations
 */
export const AD_PLACEMENTS = {
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  FOOTER: 'footer',
  PRODUCT_DETAIL: 'product-detail',
  MARKETPLACE_TOP: 'marketplace-top'
} as const;

/**
 * Get Google AdSense script tag
 */
export function getAdSenseScript(publisherId: string): string {
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisherId}"
     crossorigin="anonymous"></script>`;
}

/**
 * Track ad impression
 */
export async function trackAdImpression(
  adSlot: string,
  placement: string
): Promise<{ success: boolean }> {
  try {
    const response = await fetch('/api/ads/impression', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adSlot,
        placement,
        timestamp: new Date().toISOString(),
        url: window.location.href
      })
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Failed to track ad impression:', error);
    return { success: false };
  }
}

/**
 * Track ad click
 */
export async function trackAdClick(
  adSlot: string,
  placement: string,
  targetUrl?: string
): Promise<{ success: boolean }> {
  try {
    const response = await fetch('/api/ads/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adSlot,
        placement,
        targetUrl,
        timestamp: new Date().toISOString(),
        url: window.location.href
      })
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Failed to track ad click:', error);
    return { success: false };
  }
}

/**
 * Get ad analytics for a specific period
 */
export async function getAdAnalytics(
  startDate: string,
  endDate: string
): Promise<AdMetrics[]> {
  try {
    const response = await fetch(
      `/api/ads/analytics?startDate=${startDate}&endDate=${endDate}`
    );

    if (!response.ok) throw new Error('Failed to fetch ad analytics');

    return await response.json();
  } catch (error) {
    console.error('Failed to get ad analytics:', error);
    return [];
  }
}

/**
 * Get sponsored products
 */
export async function getSponsoredProducts(): Promise<SponsoredProduct[]> {
  try {
    const response = await fetch('/api/ads/sponsored-products');

    if (!response.ok) throw new Error('Failed to fetch sponsored products');

    return await response.json();
  } catch (error) {
    console.error('Failed to get sponsored products:', error);
    return [];
  }
}

/**
 * Create a sponsored product campaign
 */
export async function createSponsoredCampaign(
  campaign: Omit<SponsoredProduct, 'id' | 'impressions' | 'clicks' | 'conversions' | 'totalSpent'>
): Promise<{ success: boolean; campaignId?: string }> {
  try {
    const response = await fetch('/api/ads/sponsored-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaign)
    });

    if (!response.ok) throw new Error('Failed to create campaign');

    const data = (await response.json()) as { id?: string };
    return { success: true, campaignId: data.id };
  } catch (error) {
    console.error('Failed to create sponsored campaign:', error);
    return { success: false };
  }
}

/**
 * Update sponsored product campaign
 */
export async function updateSponsoredCampaign(
  campaignId: string,
  updates: Partial<SponsoredProduct>
): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`/api/ads/sponsored-products/${campaignId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Failed to update sponsored campaign:', error);
    return { success: false };
  }
}

/**
 * Pause sponsored product campaign
 */
export async function pauseSponsoredCampaign(campaignId: string): Promise<{ success: boolean }> {
  return updateSponsoredCampaign(campaignId, { status: 'paused' });
}

/**
 * Resume sponsored product campaign
 */
export async function resumeSponsoredCampaign(campaignId: string): Promise<{ success: boolean }> {
  return updateSponsoredCampaign(campaignId, { status: 'active' });
}

/**
 * Calculate CTR (Click-Through Rate)
 */
export function calculateCTR(clicks: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
}

/**
 * Calculate CPM (Cost Per Mille / Cost Per 1000 Impressions)
 */
export function calculateCPM(spent: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (spent / impressions) * 1000;
}

/**
 * Calculate CPC (Cost Per Click)
 */
export function calculateCPC(spent: number, clicks: number): number {
  if (clicks === 0) return 0;
  return spent / clicks;
}

/**
 * Calculate ROAS (Return On Ad Spend)
 */
export function calculateROAS(revenue: number, spent: number): number {
  if (spent === 0) return 0;
  return revenue / spent;
}
