import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GlassPanel } from '@/components/ui/glass-panel';
import { Button } from '@/components/ui/button';
import { Template } from '@/types';
import { Check, Star, Download, ShieldCheck, Zap } from 'lucide-react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { api } from '@/lib/api';

export const TemplateDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return navigate('/marketplace');

    api.template(id)
      .then(data => setTemplate(data))
      .catch(() => navigate('/marketplace'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handlePromptCopyAction = () => {
    navigator.clipboard.writeText("# SYSTEM PROMPT\nThis is a securely fetched prompt matrix...");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !template) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{template.title} - AI Templates Suite | saasproducts</title>
        <meta name="description" content={`Download premium high-grade production-ready template logic maps for ${template.title} priced at only $${template.price}.`} />
        {/* Fallback open graph using an absolute or relative image */}
        <meta property="og:image" content="/fallback-og.png" />
      </Helmet>
      
      <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-12 relative z-10">
        {/* Product Information Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2 lg:max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-electric-blue font-mono uppercase tracking-wider">
              Premium System Pack — {template.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">{template.title}</h1>
            <p className="text-lg text-white/50 mt-4 leading-relaxed">{template.description}</p>
          </div>
          <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 p-4 rounded-xl shrink-0">
            <div className="text-left hidden sm:block">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-white/40">Deployment Value</span>
              <span className="text-4xl font-display font-bold text-neon-cyan">${template.price}</span>
            </div>
            <div className="w-48 relative z-20">
              <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test', currency: "USD" }}>
                <PayPalButtons 
                  style={{ layout: "horizontal", height: 44, color: "blue", label: "pay" }}
                  createOrder={async () => {
                    const order = await api.createCheckoutOrder(template.id);
                    return order.id;
                  }}
                  onApprove={async (data) => {
                    const captureData = await api.captureCheckout(data.orderID);
                    if (captureData.success) {
                      navigate(captureData.url);
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>

        {/* Two-Column Technical Integration Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Code Component Execution Engine Container */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-space-void">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <span className="text-xs font-mono text-white/60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_#00F0FF]" />
                  SYSTEM_PROMPT_MATRIX.md
                </span>
                <button 
                  onClick={handlePromptCopyAction}
                  className="text-xs font-mono px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
                >
                  {copied ? "✓ Copied to Memory" : "⚡ Copy Prompt Matrix"}
                </button>
              </div>
              <div className="p-6 overflow-x-auto max-h-[500px] font-mono text-xs text-white/70 leading-relaxed bg-black/40">
                <pre className="whitespace-pre-wrap">
{`# SYSTEM PROMPT: ULTRA-PREMIUM CONVERSION ENGINE
ROLE: You are an elite Senior Designer and Full-Stack Architect.

[CONFIGURATION MATRIX]
{
  "designTokens": {
    "theme": "Dark Mode Default",
    "background": "#030014",
    "primaryGradient": "from-brand-purple to-neon-cyan",
    "surface": "rgba(255, 255, 255, 0.03)",
    "border": "1px solid rgba(255, 255, 255, 0.08)",
    "blur": "backdrop-blur-xl (24px)"
  }
}

[OBJECTIVE]
Generate a production-ready layout structure based on this secure payload...
... (Full payload unlocks upon framework deployment) ...`}
                </pre>
              </div>
            </div>
            
            <GlassPanel className="p-8">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-electric-blue" />
                Technical Assets Included
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-white/80">
                {template.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-cyan shrink-0" />
                    <span className="text-white/70 leading-relaxed">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                   <Check className="w-5 h-5 text-neon-cyan shrink-0" />
                   <span className="text-white/70 leading-relaxed">Lifetime updates & documentation</span>
                </li>
                <li className="flex items-start gap-3">
                   <Check className="w-5 h-5 text-neon-cyan shrink-0" />
                   <span className="text-white/70 leading-relaxed">Creator implementation support</span>
                </li>
              </ul>
            </GlassPanel>
          </div>

          {/* Sidebar Model Constraints Panel */}
          <div className="space-y-6">
            <GlassPanel className="space-y-6 bg-space-void/60 border-electric-blue/20">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white/40">Target Optimization Matrix</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-xs text-white/50 mb-1.5">Recommended Execution Core</span>
                  <div className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/5 font-mono text-sm text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-purple" />
                    {template.compatibility[0] || 'GPT-4o'}
                  </div>
                </div>
                <div>
                  <span className="block text-xs text-white/50 mb-1.5">Engine Tuning Parameters</span>
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="block text-white/40 mb-1">TEMP</span>
                      <span className="text-sm font-bold text-white">0.2</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="block text-white/40 mb-1">TOP_P</span>
                      <span className="text-sm font-bold text-white">0.1</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-5 space-y-3">
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-white/40 text-xs">Creator Auth:</span>
                  <span className="text-white/80">{template.creatorName}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-white/40 text-xs">Evaluation Ratio:</span>
                  <span className="text-amber-400">★ {template.rating.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-white/40 text-xs">Verification Logs:</span>
                  <span className="text-white/80">{template.reviewCount}</span>
                </div>
              </div>
            </GlassPanel>
            
            <GlassPanel className="p-6">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Safe Delivery Assurance</p>
              <div className="text-sm text-white/60 space-y-2">
                <p>Transactions are processed and protected via PayPal API Gateway.</p>
                <p>Deployment access is granted instantly and secured through your dashboard.</p>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </>
  );
};
