import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-space-black relative z-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded bg-hyper-growth flex items-center justify-center text-space-black">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">saasproducts</span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Premium AI templates, prompt libraries, and full-stack modules. Accelerate your production with world-class assets.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-semibold mb-4 text-white">Marketplace</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/marketplace" className="hover:text-electric-blue transition-colors">Explore All</Link></li>
            <li><Link to="/marketplace?category=chatgpt" className="hover:text-electric-blue transition-colors">ChatGPT Assets</Link></li>
            <li><Link to="/marketplace?category=midjourney" className="hover:text-electric-blue transition-colors">Midjourney Prompts</Link></li>
            <li><Link to="/marketplace?category=saas" className="hover:text-electric-blue transition-colors">SaaS Frameworks</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-white">Creator Economy</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/become-creator" className="hover:text-electric-blue transition-colors">Sell Templates</Link></li>
            <li><Link to="/dashboard/creator" className="hover:text-electric-blue transition-colors">Creator Settlement Node</Link></li>
            <li><Link to="/guidelines" className="hover:text-electric-blue transition-colors">Publishing Rules</Link></li>
            <li><Link to="/affiliates" className="hover:text-electric-blue transition-colors">Affiliate Program</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-white">Legal & Resources</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/terms" className="hover:text-electric-blue transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-electric-blue transition-colors">Privacy Policy</Link></li>
            <li><Link to="/faq" className="hover:text-electric-blue transition-colors">Help Center & FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-electric-blue transition-colors">Contact Support</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
        <p>© {new Date().getFullYear()} saasproducts Marketplace. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex gap-4">
          <span>PayPal Confirmed</span>
          <span>SSL Secured</span>
        </div>
      </div>
    </footer>
  );
};
