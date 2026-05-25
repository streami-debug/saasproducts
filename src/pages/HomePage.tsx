import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { TemplateCard } from '@/components/marketplace/template-card';
import { Template } from '@/types';
import { getHomepageSEO, getOrganizationStructuredData } from '@/lib/seo';

// Structural high-demand data assets mapped to the required catalog parameters
const HOMEPAGE_CATALOG: { hero: Template; trending: Template[]; premium: Template[] } = {
  hero: {
    id: "tpl_1", // Using existing mock ID so details page works
    title: "AI SaaS Website System Matrix",
    description: "Generates fully realized responsive SaaS landing pages, structured layout components, optimized checkout grids, and elegant, high-converting copy layouts.",
    price: 29,
    category: "saas",
    tier: "premium",
    tags: ["Next.js 15", "Tailwind CSS", "UX Architecture"],
    rating: 4.98,
    reviewCount: 412,
    downloadCount: 8940,
    creatorId: "forge_core",
    creatorName: "saasproducts Studio",
    features: ["Responsive Breakpoint Logic", "Conversion Copy Arrays"],
    compatibility: ["Claude 3.5 Sonnet", "GPT-4o"],
    createdAt: "2026-03-01"
  },
  trending: [
    {
      id: "t_free_tk",
      title: "Freelancer AI Operational Toolkit",
      description: "Complete operations framework prompt bundle processing high-conversion agency proposals, client onboarding tracks, automated scoping parameters, and outreach sequences.",
      price: 19,
      category: "marketing",
      tier: "bundle",
      tags: ["Agency Scaling", "Operations"],
      rating: 4.91,
      reviewCount: 189,
      downloadCount: 3120,
      creatorId: "forge_core",
      creatorName: "saasproducts Studio",
      features: ["Onboarding Engine Blueprints", "Proposal Templates"],
      compatibility: ["ChatGPT", "Claude"],
      createdAt: "2026-03-10"
    },
    {
      id: "t_viral_c",
      title: "Viral Content Creator Engine Pack",
      description: "High-yield behavioral script algorithms optimized for native TikTok hooks, narrative YouTube script development, and structured programmatic visual direction schemas.",
      price: 15,
      category: "marketing",
      tier: "basic",
      tags: ["Social Algorithms", "Growth Hooks"],
      rating: 4.85,
      reviewCount: 342,
      downloadCount: 12450,
      creatorId: "grow_labs",
      creatorName: "Growth Labs Engine",
      features: ["Retention Hooks", "Multi-Platform Copy Matrices"],
      compatibility: ["ChatGPT Plus", "Claude 3 Haiku"],
      createdAt: "2026-03-12"
    },
    {
      id: "t_prod_sys",
      title: "Ultimate ChatGPT Productivity System",
      description: "Deep procedural memory integration layers automating calendar operations pipelines, complex personal information architecture layouts, and business management workflows.",
      price: 25,
      category: "automation",
      tier: "premium",
      tags: ["Workflows", "Personal OS"],
      rating: 4.96,
      reviewCount: 215,
      downloadCount: 5410,
      creatorId: "forge_core",
      creatorName: "saasproducts Studio",
      features: ["Task-Batching Blueprints", "Context-Switching Logic"],
      compatibility: ["GPT-4o Native"],
      createdAt: "2026-03-14"
    }
  ],
  premium: [
    {
      id: "p_launch_kit",
      title: "AI Startup Launch Kit Matrix",
      description: "Comprehensive multi-layered brand system prompts outputting production positioning formulas, target persona matrices, presentation assets, and conversion flows.",
      price: 35,
      category: "saas",
      tier: "premium",
      tags: ["Founders", "Go-To-Market"],
      rating: 5.0,
      reviewCount: 94,
      downloadCount: 1890,
      creatorId: "forge_core",
      creatorName: "saasproducts Studio",
      features: ["Brand DNA Engines", "Pitch Deck Content Structures"],
      compatibility: ["Claude 3.5 Sonnet"],
      createdAt: "2026-03-18"
    },
    {
      id: "p_auto_biz",
      title: "AI Automation Business System Engine",
      description: "Our premium flagship asset framework. Deploys complete autonomous architecture logic patterns, advanced environment mappings, CRM setups, and complex lead-generation webhooks.",
      price: 40,
      category: "automation",
      tier: "premium",
      tags: ["Enterprise Nodes", "AI Agents"],
      rating: 4.99,
      reviewCount: 512,
      downloadCount: 3820,
      creatorId: "forge_core",
      creatorName: "saasproducts Studio",
      features: ["Autonomous Agent Logic Maps", "CRM Script Automations"],
      compatibility: ["Make.com Engine", "CrewAI Framework", "n8n"],
      createdAt: "2026-03-20"
    }
  ]
};

export const HomePage = () => {
  const seo = getHomepageSEO();
  const orgSchema = getOrganizationStructuredData();

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords?.join(', ')} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:type" content={seo.ogType} />
        <meta name="robots" content={seo.robots} />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>
      <div className="w-full bg-space-black text-white space-y-32 pb-32 overflow-hidden relative z-10">
      
      {/* SECTION 1: HERO CONTAINER AREA */}
      <section className="relative pt-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono text-electric-blue uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#0DFEAA]" />
            ENGINEERED UTILITY VS RAW PROMPTS
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-display font-bold tracking-tight leading-[1.05]">
            Premium AI Systems <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-electric-blue to-neon-cyan">
              Without Premium Prices.
            </span>
          </h1>

          <p className="text-white/60 text-base md:text-xl font-sans max-w-xl leading-relaxed font-light">
            Stop buying basic chat inputs. Deploy our robust, conversion-driven prompt matrices and framework packs explicitly engineered for creators, developers, and startups.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to={`/template/${HOMEPAGE_CATALOG.hero.id}`}>
              <Button size="lg" variant="primary">Deploy Flagship System — $29</Button>
            </Link>
            <Link to="/marketplace?bundle=true">
              <Button size="lg" variant="secondary">View System Bundles</Button>
            </Link>
          </div>
        </div>

        {/* HERO FEATURED PRODUCT INTERACTIVE CARD DISPLAY */}
        <div className="lg:col-span-5 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-purple to-electric-blue opacity-30 blur-xl animate-pulse" />
            <GlassPanel className="p-6 relative bg-space-void/80 border-white/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest text-neon-cyan uppercase bg-neon-cyan/10 px-2.5 py-1 rounded-md">
                  Hero Showcase Matrix
                </span>
                <span className="text-2xl font-display font-bold text-white">${HOMEPAGE_CATALOG.hero.price}</span>
              </div>
              <h2 className="text-xl font-display font-bold text-white">{HOMEPAGE_CATALOG.hero.title}</h2>
              <p className="text-xs text-white/60 leading-relaxed">{HOMEPAGE_CATALOG.hero.description}</p>
              
              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] font-mono text-white/40">
                <div>COMPATIBILITY: <span className="block text-white font-medium">{HOMEPAGE_CATALOG.hero.compatibility.join(', ')}</span></div>
                <div>EVALUATION RATIO: <span className="block text-white font-medium">★ 4.98 (412 Verification Logs)</span></div>
              </div>
              <Link to={`/template/${HOMEPAGE_CATALOG.hero.id}`} className="block pt-2">
                <Button variant="secondary" className="w-full text-xs py-2 h-10">Inspect System Variables</Button>
              </Link>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: HIGH-DEMAND TRENDING MATRIX ARRAYS */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6">
          <div>
            <h2 className="text-xl md:text-3xl font-display font-bold">Trending System Packs</h2>
            <p className="text-sm text-white/40 mt-1">Highly functional asset matrices scaling production workflows immediately.</p>
          </div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider mt-4 md:mt-0">Metrics Refresh Cycle: Real-Time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOMEPAGE_CATALOG.trending.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      </section>

      {/* SECTION 3: FLAGSHIP HIGH-VALUE PREMIUM SETTLEMENT BOUNDARY */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-purple/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="max-w-2xl space-y-4 mb-12 relative z-10">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-md">
              Enterprise Grade Framework Nodes
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold">Flagship Architectural Packages</h2>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Our highest tier system assets. These products contain complex multi-agent system definitions, broad business automation routines, and programmatic cross-functional code layers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {HOMEPAGE_CATALOG.premium.map((tpl) => (
              <GlassPanel key={tpl.id} className="p-8 flex flex-col justify-between border-white/10 bg-space-black/40 group hover:border-brand-purple/30 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white/40 uppercase">System Target Engine: {tpl.compatibility[0]}</span>
                    <span className="text-2xl font-display font-bold text-electric-blue">${tpl.price}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold group-hover:text-electric-blue transition-colors line-clamp-1">{tpl.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{tpl.description}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-neon-cyan">Includes {tpl.features.length} Core Matrix Modules</span>
                  <Link to={`/template/${tpl.id}`}>
                    <Button variant="secondary" size="sm">Deploy Module</Button>
                  </Link>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};
