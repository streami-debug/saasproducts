import { GlassPanel } from '@/components/ui/glass-panel';
import { Activity, DollarSign, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const CreatorDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">Creator Settlement Node</h1>
          <p className="text-white/50 text-sm mt-2 font-mono">Monitor deployment triggers, usage parameters, and settlement payouts.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg">
          <button className="px-4 py-1.5 rounded-md bg-white/10 text-sm font-medium text-white shadow-sm">Overview</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-white/50 hover:text-white transition-colors">Payouts</button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-white/50 hover:text-white transition-colors">Settings</button>
        </div>
      </div>

      {/* Analytics High Density Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassPanel className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-16 h-16 text-white" />
          </div>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
            Gross Volume
          </span>
          <p className="text-3xl font-display font-bold text-white mt-4">$4,890.00</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-neon-cyan flex-wrap">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>12.5% vs last month</span>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-white" />
          </div>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
            Deployment Triggers
          </span>
          <p className="text-3xl font-display font-bold text-white mt-4">241</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-white/50 flex-wrap">
            <span>Total template downloads</span>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            Avg Unit Value
          </span>
          <p className="text-3xl font-display font-bold text-white mt-4">$24.50</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-purple flex-wrap">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Optimized pricing matrices</span>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 relative overflow-hidden group border-electric-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity flex">
            <AlertCircle className="w-16 h-16 text-electric-blue" />
          </div>
          <span className="text-[10px] font-mono text-electric-blue/70 uppercase tracking-widest flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
            Settlement Queue
          </span>
          <p className="text-3xl font-display font-bold text-electric-blue mt-4">$812.00</p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-white/50 flex-wrap">
            <span>Pending Next Payout (Friday)</span>
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        <GlassPanel className="p-0 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h3 className="text-lg font-display font-semibold">Recent Deployment Ledger</h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/[0.02] text-white/40 font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-normal">Asset Tag</th>
                  <th className="px-6 py-4 font-normal">Date</th>
                  <th className="px-6 py-4 font-normal">Value</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-xs uppercase">SAAS</span>
                      </div>
                      SaaS Blueprint MVP
                    </td>
                    <td className="px-6 py-4 text-white/50 font-mono text-xs">2026-05-{10 + i}</td>
                    <td className="px-6 py-4">$35.00</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-neon-cyan/10 text-neon-cyan text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                        Settled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
        
        <div className="space-y-6">
          <GlassPanel className="p-6 space-y-4">
            <h3 className="text-lg font-display font-semibold border-b border-white/5 pb-4">Actions</h3>
            <button className="w-full h-12 bg-hyper-growth text-space-black font-semibold rounded-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2">
              Deploy New Blueprint
            </button>
            <button className="w-full h-12 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
              Manage API Keys
            </button>
          </GlassPanel>

          <GlassPanel className="p-6 space-y-4">
            <h3 className="text-lg font-display font-semibold border-b border-white/5 pb-4">Market Alignment</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Your assets are performing in the top 5% of the Automation category. Consider deploying a structural bundle to maximize user cart value.
            </p>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};
