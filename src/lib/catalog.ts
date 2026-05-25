import type { Template } from '../types';

export type RevenuePoint = {
  month: string;
  revenue: number;
  orders: number;
};

export type OrderRecord = {
  id: string;
  customer: string;
  product: string;
  value: number;
  status: 'paid' | 'pending' | 'refunded';
  createdAt: string;
};

export type AdminOverview = {
  metrics: {
    grossRevenue: number;
    monthlyRevenue: number;
    totalOrders: number;
    conversionRate: number;
    activeCreators: number;
    listedProducts: number;
  };
  revenue: RevenuePoint[];
  recentOrders: OrderRecord[];
  categoryMix: Array<{ category: string; count: number; revenue: number }>;
};

export const PRODUCT_CATALOG: Template[] = [
  {
    id: 'tpl_1',
    title: 'AI SaaS Website System Matrix',
    description: 'A complete launch system for premium SaaS landing pages, pricing sections, onboarding copy, and conversion-focused interface blocks.',
    price: 29,
    category: 'saas',
    tier: 'premium',
    tags: ['Next.js', 'Tailwind CSS', 'UX Architecture'],
    rating: 4.98,
    reviewCount: 412,
    downloadCount: 8940,
    creatorId: 'saasproducts_core',
    creatorName: 'saasproducts Studio',
    features: ['Responsive landing-page structure', 'Conversion copy prompts', 'Pricing section patterns', 'Founder-ready launch checklist'],
    compatibility: ['Next.js', 'React', 'Cloudflare Pages'],
    createdAt: '2026-03-01'
  },
  {
    id: 'tpl_2',
    title: 'Full-Stack MVP Boilerplate Blueprint',
    description: 'Production architecture mapping for founders who need authenticated dashboards, database models, payment handoff, and clean deployment workflows.',
    price: 35,
    category: 'saas',
    tier: 'premium',
    tags: ['Full Stack', 'Auth', 'Database'],
    rating: 5.0,
    reviewCount: 312,
    downloadCount: 4290,
    creatorId: 'saasproducts_core',
    creatorName: 'saasproducts Studio',
    features: ['Backend API route plan', 'Database schema guidance', 'Admin-dashboard modules', 'Deployment runbook'],
    compatibility: ['Cloudflare', 'Postgres', 'Prisma'],
    createdAt: '2026-02-15'
  },
  {
    id: 'tpl_3',
    title: 'Creator Newsletter Automation System',
    description: 'End-to-end newsletter operations with research prompts, issue assembly, reusable editorial calendars, and sponsor placement logic.',
    price: 15,
    category: 'marketing',
    tier: 'basic',
    tags: ['Newsletter', 'Content Ops'],
    rating: 4.8,
    reviewCount: 89,
    downloadCount: 650,
    creatorId: 'creator_growth',
    creatorName: 'Creator Growth Lab',
    features: ['Editorial calendar builder', 'Research prompt chains', 'Sponsor copy templates', 'Repurposing workflow'],
    compatibility: ['ChatGPT', 'Claude'],
    createdAt: '2026-03-01'
  },
  {
    id: 'tpl_4',
    title: 'Visual Prompt Production Pack',
    description: 'A refined prompt library for product images, launch visuals, ad creative, thumbnails, and branded campaign assets.',
    price: 19,
    category: 'midjourney',
    tier: 'basic',
    tags: ['Visual Systems', 'Product Design'],
    rating: 4.7,
    reviewCount: 412,
    downloadCount: 1560,
    creatorId: 'visual_ops',
    creatorName: 'Visual Ops Studio',
    features: ['Lighting modifiers', 'Product-shot structures', 'Brand-style matrices', 'Campaign image prompts'],
    compatibility: ['Midjourney', 'DALL-E', 'Ideogram'],
    createdAt: '2026-02-28'
  },
  {
    id: 'tpl_5',
    title: 'Developer Automation Command Center',
    description: 'A complete suite for automating code reviews, release notes, deployment summaries, QA checklists, and customer-facing changelogs.',
    price: 40,
    category: 'coding',
    tier: 'premium',
    tags: ['GitHub Actions', 'DevOps', 'Automation'],
    rating: 5.0,
    reviewCount: 110,
    downloadCount: 300,
    creatorId: 'devops_studio',
    creatorName: 'DevOps Studio',
    features: ['CI/CD prompt workflows', 'Release-note templates', 'QA acceptance checklists', 'Code-review rubric'],
    compatibility: ['GitHub', 'GitLab', 'Ollama'],
    createdAt: '2026-04-12'
  },
  {
    id: 'tpl_6',
    title: 'AI Automation Agency Starter Kit',
    description: 'Client acquisition, audit delivery, automation scoping, proposal writing, and implementation documentation for service-based operators.',
    price: 39,
    category: 'automation',
    tier: 'bundle',
    tags: ['Agency', 'Lead Generation', 'n8n'],
    rating: 4.96,
    reviewCount: 267,
    downloadCount: 2180,
    creatorId: 'automation_ops',
    creatorName: 'Automation Ops',
    features: ['Discovery-call scripts', 'Automation audit templates', 'Proposal frameworks', 'Implementation handoff docs'],
    compatibility: ['n8n', 'Make.com', 'Zapier'],
    createdAt: '2026-04-20'
  }
];

export const ADMIN_OVERVIEW: AdminOverview = {
  metrics: {
    grossRevenue: 42890,
    monthlyRevenue: 12440,
    totalOrders: 1384,
    conversionRate: 7.8,
    activeCreators: 38,
    listedProducts: PRODUCT_CATALOG.length
  },
  revenue: [
    { month: 'Jan', revenue: 4200, orders: 142 },
    { month: 'Feb', revenue: 6100, orders: 198 },
    { month: 'Mar', revenue: 8900, orders: 276 },
    { month: 'Apr', revenue: 11250, orders: 356 },
    { month: 'May', revenue: 12440, orders: 412 }
  ],
  recentOrders: [
    { id: 'ORD-1048', customer: 'Maya Patel', product: 'AI SaaS Website System Matrix', value: 29, status: 'paid', createdAt: '2026-05-24' },
    { id: 'ORD-1047', customer: 'Jonas Meyer', product: 'Developer Automation Command Center', value: 40, status: 'paid', createdAt: '2026-05-24' },
    { id: 'ORD-1046', customer: 'Ava Johnson', product: 'Full-Stack MVP Boilerplate Blueprint', value: 35, status: 'pending', createdAt: '2026-05-23' },
    { id: 'ORD-1045', customer: 'Leo Chen', product: 'AI Automation Agency Starter Kit', value: 39, status: 'paid', createdAt: '2026-05-23' }
  ],
  categoryMix: ['saas', 'automation', 'marketing', 'midjourney', 'coding'].map((category) => {
    const items = PRODUCT_CATALOG.filter((item) => item.category === category);
    return {
      category,
      count: items.length,
      revenue: items.reduce((sum, item) => sum + item.price * Math.max(10, Math.round(item.downloadCount / 100)), 0)
    };
  })
};

export function filterTemplates(params: { category?: string | null; search?: string | null; minPrice?: number; maxPrice?: number } = {}) {
  const { category = 'all', search = '', minPrice = 0, maxPrice = 1000 } = params;
  const query = (search || '').trim().toLowerCase();

  return PRODUCT_CATALOG.filter((template) => {
    const categoryMatch = !category || category === 'all' || template.category === category;
    const priceMatch = template.price >= minPrice && template.price <= maxPrice;
    const textMatch = !query || [template.title, template.description, template.creatorName, ...template.tags]
      .some((value) => value.toLowerCase().includes(query));
    return categoryMatch && priceMatch && textMatch;
  });
}
