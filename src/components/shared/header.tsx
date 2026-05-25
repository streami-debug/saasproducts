import { Link } from 'react-router-dom';
import { Search, Heart, User, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-space-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-hyper-growth flex items-center justify-center text-space-black group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">saasproducts</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <Link to="/marketplace" className="hover:text-white transition-colors">Explore</Link>
          <Link to="/marketplace?category=saas" className="hover:text-white transition-colors">SaaS Kits</Link>
          <Link to="/pricing" className="hover:text-white transition-colors">Bundles & Pricing</Link>
          <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative group">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Templates... (⌘K)" 
              className="pl-9 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-electric-blue/50 focus:bg-white/10 transition-all font-sans text-white placeholder-white/40 min-w-[200px]"
            />
          </div>
          <Link to="/admin" className="text-white/60 hover:text-white transition-colors" aria-label="Open admin panel">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/wishlist" className="hidden sm:block text-white/60 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </Link>
          <Button size="sm" className="hidden sm:inline-flex">Sign In</Button>
        </div>
      </div>
    </header>
  );
};
