/**
 * SEO and Metadata utilities for saasproducts marketplace
 * Generates Open Graph tags, meta descriptions, and structured data
 */

import { Template } from '../types';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
}

/**
 * Generate SEO metadata for the homepage
 */
export function getHomepageSEO(): SEOMetadata {
  return {
    title: 'saasproducts — Premium Digital Products & SaaS Templates',
    description: 'Discover high-quality SaaS templates, AI automation systems, and digital products. Buy and sell professional digital assets on the saasproducts marketplace.',
    keywords: ['SaaS templates', 'digital products', 'AI automation', 'creator economy', 'digital marketplace'],
    canonical: 'https://saasproducts.dpdns.org',
    ogTitle: 'saasproducts Marketplace',
    ogDescription: 'The premium marketplace for digital products and SaaS templates',
    ogType: 'website',
    robots: 'index, follow'
  };
}

/**
 * Generate SEO metadata for the marketplace page
 */
export function getMarketplaceSEO(): SEOMetadata {
  return {
    title: 'Marketplace — saasproducts | Buy Digital Products & Templates',
    description: 'Browse thousands of premium digital products including SaaS templates, AI prompts, automation systems, and creator tools. Find exactly what you need.',
    keywords: ['digital products', 'SaaS templates', 'AI prompts', 'automation', 'marketplace'],
    canonical: 'https://saasproducts.dpdns.org/marketplace',
    ogTitle: 'saasproducts Marketplace',
    ogDescription: 'Premium digital products and SaaS templates',
    ogType: 'website',
    robots: 'index, follow'
  };
}

/**
 * Generate SEO metadata for a product detail page
 */
export function getProductSEO(template: Template): SEOMetadata {
  return {
    title: `${template.title} — saasproducts`,
    description: `${template.description} Price: $${template.price}. Rating: ${template.rating}/5. Category: ${template.category}`,
    keywords: [
      template.title,
      template.category,
      ...template.tags,
      ...template.compatibility,
      'digital product',
      'SaaS'
    ],
    canonical: `https://saasproducts.dpdns.org/template/${template.id}`,
    ogTitle: template.title,
    ogDescription: template.description,
    ogImage: template.previewUrl || 'https://saasproducts.dpdns.org/og-image.png',
    ogType: 'product',
    robots: 'index, follow'
  };
}

/**
 * Generate JSON-LD structured data for a product
 */
export function getProductStructuredData(template: Template): Record<string, unknown> {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: template.title,
    description: template.description,
    image: template.previewUrl || 'https://saasproducts.dpdns.org/og-image.png',
    brand: {
      '@type': 'Brand',
      name: 'saasproducts'
    },
    offers: {
      '@type': 'Offer',
      url: `https://saasproducts.dpdns.org/template/${template.id}`,
      priceCurrency: 'USD',
      price: template.price.toString(),
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: template.rating.toString(),
      reviewCount: template.reviewCount.toString()
    },
    category: template.category,
    keywords: template.tags.join(', ')
  };
}

/**
 * Generate JSON-LD structured data for the organization
 */
export function getOrganizationStructuredData(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'saasproducts',
    url: 'https://saasproducts.dpdns.org',
    logo: 'https://saasproducts.dpdns.org/logo.png',
    description: 'Premium marketplace for digital products and SaaS templates',
    sameAs: [
      'https://twitter.com/saasproducts',
      'https://github.com/streami-debug/saasproducts'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@saasproducts.dpdns.org'
    }
  };
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Allow: /marketplace
Allow: /template/
Allow: /api/templates
Allow: /api/health

Disallow: /admin
Disallow: /dashboard
Disallow: /api/admin
Disallow: /api/checkout

Sitemap: https://saasproducts.dpdns.org/sitemap.xml

# Crawl delay to avoid overloading the server
Crawl-delay: 1

# User-agent specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemap(templates: Template[]): string {
  const baseUrl = 'https://saasproducts.dpdns.org';
  const now = new Date().toISOString().split('T')[0];

  const urls = [
    {
      loc: baseUrl,
      lastmod: now,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/marketplace`,
      lastmod: now,
      changefreq: 'daily',
      priority: '0.9'
    },
    ...templates.map((template) => ({
      loc: `${baseUrl}/template/${template.id}`,
      lastmod: template.createdAt,
      changefreq: 'weekly',
      priority: '0.8'
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

/**
 * Generate meta tags HTML string
 */
export function generateMetaTags(seo: SEOMetadata): string {
  const tags: string[] = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    seo.keywords ? `<meta name="keywords" content="${escapeHtml(seo.keywords.join(', '))}" />` : '',
    seo.canonical ? `<link rel="canonical" href="${seo.canonical}" />` : '',
    `<meta name="robots" content="${seo.robots || 'index, follow'}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle || seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription || seo.description)}" />`,
    seo.ogImage ? `<meta property="og:image" content="${seo.ogImage}" />` : '',
    `<meta property="og:type" content="${seo.ogType || 'website'}" />`,
    `<meta property="og:url" content="${seo.canonical || 'https://saasproducts.dpdns.org'}" />`,
    `<meta name="twitter:card" content="${seo.twitterCard || 'summary_large_image'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.ogTitle || seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.ogDescription || seo.description)}" />`,
    seo.ogImage ? `<meta name="twitter:image" content="${seo.ogImage}" />` : ''
  ];

  return tags.filter((tag) => tag).join('\n');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
