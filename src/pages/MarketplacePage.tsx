import { useState, useEffect } from 'react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { TemplateCard } from '@/components/marketplace/template-card';
import { Template } from '@/types';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { api } from '@/lib/api';

const CATEGORIES = ['all', 'chatgpt', 'claude', 'midjourney', 'cursor', 'saas', 'automation', 'marketing', 'coding'];

export const MarketplacePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [maxPrice, setMaxPrice] = useState(40);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync state to URL 
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (search) params.set('search', search);
    setSearchParams(params, { replace: true });
  }, [selectedCategory, search, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api.templates({ category: selectedCategory, search, minPrice: 0, maxPrice })
      .then(data => setTemplates(data.templates || []))
      .catch(() => setError('Unable to load marketplace inventory. Please retry shortly.'))
      .finally(() => setLoading(false));
  }, [selectedCategory, search, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 relative z-10">
      {/* Left Sidebar Filter Architecture */}
      <aside className="w-full lg:w-64 space-y-6 flex-shrink-0">
        <GlassPanel className="p-6 space-y-6 sticky top-24">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Filter Matrix</h3>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${selectedCategory === cat ? 'bg-hyper-growth text-space-black shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Pricing Boundaries</h3>
            <div className="space-y-4">
              <input type="range" min="15" max="40" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-electric-blue" />
              <div className="flex items-center justify-between text-xs font-mono text-white/60">
                <span className="bg-white/5 px-2 py-1 rounded">$15</span>
                <span className="bg-white/5 px-2 py-1 rounded">{'$'}{maxPrice}</span>
              </div>
            </div>
          </div>
        </GlassPanel>
      </aside>

      {/* Main Content Search Grid Execution Interface */}
      <div className="flex-grow space-y-8">
        <div className="w-full relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-electric-blue transition-colors" />
          <input 
            type="text"
            placeholder="Search engines, system setups, automated nodes... (⌘K)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/40 font-sans focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all backdrop-blur-md shadow-2xl"
          />
        </div>

        {error ? (
          <GlassPanel className="p-8 text-center text-sm text-red-200 border-red-400/20">{error}</GlassPanel>
        ) : loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-sm text-white/60">{templates.length} assets deployed</span>
              <select className="bg-transparent text-sm text-white/80 border-none focus:ring-0 cursor-pointer outline-none font-mono">
                <option value="trending" className="bg-space-void">Sort: Trending</option>
                <option value="price_low" className="bg-space-void">Sort: Price (Low)</option>
                <option value="price_high" className="bg-space-void">Sort: Price (High)</option>
              </select>
            </div>
            {templates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map(tpl => (
                  <TemplateCard key={tpl.id} template={tpl} />
                ))}
              </div>
            ) : (
              <div className="w-full py-24 text-center space-y-4">
                <p className="text-white/40 font-mono">No telemetry found matching parameters.</p>
                <button onClick={() => { setSearch(''); setSelectedCategory('all'); }} className="text-electric-blue hover:underline text-sm">
                  Reset Matrix
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
