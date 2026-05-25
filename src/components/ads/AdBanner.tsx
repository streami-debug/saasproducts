/**
 * AdBanner Component - Display banner ads on the marketplace
 * Supports Google AdSense and custom ad placements
 */

import { useEffect, useRef } from 'react';

export interface AdBannerProps {
  placement: 'header' | 'sidebar' | 'footer' | 'product-detail' | 'marketplace-top';
  adSlot?: string;
  className?: string;
}

export function AdBanner({ placement, adSlot, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google AdSense if available
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  // Ad slot configurations
  const adConfigs: Record<string, { width: string; height: string; slot: string }> = {
    header: {
      width: '728px',
      height: '90px',
      slot: adSlot || '1234567890'
    },
    sidebar: {
      width: '300px',
      height: '250px',
      slot: adSlot || '0987654321'
    },
    footer: {
      width: '728px',
      height: '90px',
      slot: adSlot || '1111111111'
    },
    'product-detail': {
      width: '300px',
      height: '600px',
      slot: adSlot || '2222222222'
    },
    'marketplace-top': {
      width: '970px',
      height: '90px',
      slot: adSlot || '3333333333'
    }
  };

  const config = adConfigs[placement] || adConfigs.sidebar;

  return (
    <div
      ref={adRef}
      className={`flex items-center justify-center bg-white/5 border border-white/10 rounded-lg overflow-hidden ${className}`}
      style={{
        width: config.width,
        height: config.height,
        minHeight: config.height
      }}
    >
      {/* Google AdSense Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: config.width,
          height: config.height
        }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx" // Replace with your AdSense publisher ID
        data-ad-slot={config.slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Sponsored Product Banner - Promote featured products
 */
export interface SponsoredProductProps {
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage?: string;
  onClick?: () => void;
}

export function SponsoredProductBanner({
  productId,
  productTitle,
  productPrice,
  productImage,
  onClick
}: SponsoredProductProps) {
  return (
    <div
      onClick={onClick}
      className="group relative p-4 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-brand-purple/10 border border-neon-cyan/30 hover:border-neon-cyan/50 transition-all cursor-pointer overflow-hidden"
    >
      <div className="absolute top-2 right-2 text-xs font-mono bg-neon-cyan/20 text-neon-cyan px-2 py-1 rounded">
        SPONSORED
      </div>

      <div className="flex items-start gap-3">
        {productImage && (
          <img
            src={productImage}
            alt={productTitle}
            className="w-16 h-16 rounded object-cover group-hover:scale-105 transition-transform"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate group-hover:text-neon-cyan transition-colors">
            {productTitle}
          </h4>
          <p className="text-xs text-white/60 mt-1">
            Starting at <span className="text-neon-cyan font-mono">${productPrice}</span>
          </p>
          <button className="mt-2 text-xs font-mono text-neon-cyan hover:text-electric-blue transition-colors">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
}
