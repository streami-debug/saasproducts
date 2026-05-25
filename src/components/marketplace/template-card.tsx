import { FC } from 'react';
import { Link } from 'react-router-dom';
import { GlassPanel } from '../ui/glass-panel';
import { Button } from '../ui/button';
import { Template } from '@/types';
import { Star } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: FC<TemplateCardProps> = ({ template }) => {
  return (
    <GlassPanel hoverEffect className="flex flex-col h-full justify-between group overflow-hidden">
      <div>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-space-void mb-5 border border-white/5">
          <div className="absolute top-3 right-3 z-10 bg-space-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-electric-blue font-display font-bold text-sm tracking-tight">${template.price}</span>
          </div>
          <div className="w-full h-full bg-gradient-to-br from-brand-purple/20 to-electric-blue/10 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="text-center space-y-2 relative z-10">
              <span className="text-white/40 text-xs font-mono uppercase tracking-widest">{template.category}</span>
              {/* Abstract decorative element representing the product visually */}
              <div className="w-16 h-16 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:border-electric-blue/30 transition-colors duration-500">
                <span className="text-2xl text-white/50">{template.title.charAt(0)}</span>
              </div>
            </div>
            
            {/* Ambient abstract glows behind */}
            <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-mono tracking-tight bg-white/5 px-2 py-1 rounded text-white/60 uppercase">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-display font-semibold text-white mb-2 group-hover:text-electric-blue transition-colors duration-200 line-clamp-1">
          {template.title}
        </h3>
        <p className="text-sm text-white/50 line-clamp-2 leading-relaxed h-10">
          {template.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-white font-medium">{template.rating.toFixed(1)}</span>
          <span className="text-xs text-white/40">({template.reviewCount})</span>
        </div>
        <Link to={`/template/${template.id}`}>
          <Button size="sm" variant="secondary" className="px-4">Details</Button>
        </Link>
      </div>
    </GlassPanel>
  );
};
