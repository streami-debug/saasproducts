import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../src/db/schema.ts';

const sqlite = new Database(process.env.DATABASE_URL || 'file:./local.db');
const db = drizzle(sqlite, { schema });

const seedData = [
  {
    id: 'prod-1',
    title: 'Autonomous AI Support Ingestion Agent',
    description: 'An autonomous backend worker layout that filters incoming client tickets, performs sentiment scoring, and drafts context-aware responses automatically.',
    price: 29.00,
    category: 'automation',
    tier: 'premium',
    tags: JSON.stringify(['Cloudflare', 'Workers', 'AI']),
    rating: 5.0,
    reviewCount: 42,
    downloadCount: 280,
    creatorId: 'creator_cloudflare',
    creatorName: 'Cloudflare Solutions',
    features: JSON.stringify(['Sentiment analysis', 'Auto-response drafting', 'Ticket routing', 'Analytics dashboard']),
    compatibility: JSON.stringify(['Cloudflare Workers', 'JavaScript', 'Node.js']),
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    title: 'Minimalist Cloudflare D1 + NextAuth Edge Shell',
    description: 'High performance App Router framework boilerplate completely optimized for D1. Includes pre-configured authentication, database migrations, and instant deployment.',
    price: 49.00,
    category: 'saas',
    tier: 'premium',
    tags: JSON.stringify(['Next.js', 'Tailwind', 'Drizzle', 'D1']),
    rating: 4.9,
    reviewCount: 118,
    downloadCount: 650,
    creatorId: 'creator_nextjs',
    creatorName: 'Next.js Studio',
    features: JSON.stringify(['Pre-configured auth', 'Database schema', 'Deployment scripts', 'TypeScript setup']),
    compatibility: JSON.stringify(['Next.js 15', 'Tailwind CSS', 'Drizzle ORM', 'Cloudflare Pages']),
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-3',
    title: 'Senior TypeScript Architect Prompt Engine',
    description: 'A master-tier engineering directive prompt that forces clean architectural design, proper type constraints, and production-grade code structure outputs from AI models.',
    price: 12.00,
    category: 'prompts',
    tier: 'basic',
    tags: JSON.stringify(['Claude', 'TypeScript', 'Architecture']),
    rating: 5.0,
    reviewCount: 305,
    downloadCount: 1200,
    creatorId: 'creator_prompts',
    creatorName: 'Prompt Engineering Lab',
    features: JSON.stringify(['Type-safe templates', 'Architecture patterns', 'Code review rubrics', 'Best practices guide']),
    compatibility: JSON.stringify(['Claude 3.5 Sonnet', 'ChatGPT-4', 'Local LLMs']),
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-4',
    title: 'AI SaaS Website System Matrix',
    description: 'A complete launch system for premium SaaS landing pages, pricing sections, onboarding copy, and conversion-focused interface blocks.',
    price: 29.00,
    category: 'saas',
    tier: 'premium',
    tags: JSON.stringify(['Next.js', 'Tailwind CSS', 'UX Architecture']),
    rating: 4.98,
    reviewCount: 412,
    downloadCount: 8940,
    creatorId: 'creator_saas',
    creatorName: 'SaaS Studio',
    features: JSON.stringify(['Responsive landing-page structure', 'Conversion copy prompts', 'Pricing section patterns', 'Founder-ready launch checklist']),
    compatibility: JSON.stringify(['Next.js', 'React', 'Cloudflare Pages']),
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-5',
    title: 'Full-Stack MVP Boilerplate Blueprint',
    description: 'Production architecture mapping for founders who need authenticated dashboards, database models, payment handoff, and clean deployment workflows.',
    price: 35.00,
    category: 'saas',
    tier: 'premium',
    tags: JSON.stringify(['Full Stack', 'Auth', 'Database', 'Drizzle']),
    rating: 5.0,
    reviewCount: 312,
    downloadCount: 4290,
    creatorId: 'creator_fullstack',
    creatorName: 'Full-Stack Lab',
    features: JSON.stringify(['Backend API route plan', 'Database schema guidance', 'Admin-dashboard modules', 'Deployment runbook']),
    compatibility: JSON.stringify(['Cloudflare', 'SQLite/D1', 'Drizzle ORM']),
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Clear existing templates
    db.delete(schema.templates).run();
    
    // Insert seed data
    for (const template of seedData) {
      db.insert(schema.templates).values(template).run();
      console.log(`✓ Inserted: ${template.title}`);
    }
    
    console.log('✅ Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
