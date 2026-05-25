import { useEffect, useMemo, useState } from 'react';
import { Activity, BarChart3, CheckCircle2, CircleDollarSign, Database, PackageCheck, ShieldCheck, Users } from 'lucide-react';
import { GlassPanel } from '@/components/ui/glass-panel';
import { api } from '@/lib/api';
import type { AdminOverview } from '@/lib/catalog';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export const AdminPanel = () => {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [health, setHealth] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    api.adminOverview().then(setOverview).catch(() => setOverview(null));
    api.health().then(() => setHealth('online')).catch(() => setHealth('offline'));
  }, []);

  const maxRevenue = useMemo(() => Math.max(...(overview?.revenue.map((point) => point.revenue) || [1])), [overview]);

  if (!overview) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: 'Gross Revenue', value: formatCurrency(overview.metrics.grossRevenue), detail: '+18.4% month over month', icon: CircleDollarSign },
    { label: 'Monthly Revenue', value: formatCurrency(overview.metrics.monthlyRevenue), detail: `${overview.revenue.at(-1)?.orders || 0} orders this month`, icon: BarChart3 },
    { label: 'Active Creators', value: overview.metrics.activeCreators.toString(), detail: 'Verified seller accounts', icon: Users },
    { label: 'Conversion Rate', value: `${overview.metrics.conversionRate}%`, detail: 'Checkout to purchase', icon: Activity }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Operations Console
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">saasproducts Admin Panel</h1>
          <p className="text-white/55 max-w-2xl leading-relaxed">
            Manage marketplace performance, review checkout activity, monitor backend health, and govern the catalog from one professional operational workspace.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
          <Database className="w-4 h-4 text-electric-blue" />
          <span className="text-white/50">Backend API</span>
          <span className={`font-mono ${health === 'online' ? 'text-neon-cyan' : health === 'offline' ? 'text-red-300' : 'text-white/60'}`}>{health}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <GlassPanel key={card.label} className="p-6 relative overflow-hidden">
              <Icon className="absolute right-5 top-5 w-10 h-10 text-white/10" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">{card.label}</p>
              <p className="text-3xl font-display font-bold mt-4">{card.value}</p>
              <p className="text-xs text-neon-cyan mt-3">{card.detail}</p>
            </GlassPanel>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <GlassPanel className="p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-display font-semibold">Revenue Trend</h2>
              <p className="text-sm text-white/45">Monthly order volume and gross marketplace value.</p>
            </div>
            <span className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 rounded-full px-3 py-1">LIVE SAMPLE DATA</span>
          </div>
          <div className="h-72 flex items-end gap-4 border-b border-white/10 pb-4">
            {overview.revenue.map((point) => (
              <div key={point.month} className="flex-1 h-full flex flex-col justify-end gap-3">
                <div className="rounded-t-xl bg-gradient-to-t from-brand-purple to-neon-cyan min-h-6 shadow-[0_0_20px_rgba(0,240,255,0.18)]" style={{ height: `${(point.revenue / maxRevenue) * 100}%` }} />
                <div className="text-center">
                  <p className="text-xs font-mono text-white/45">{point.month}</p>
                  <p className="text-[11px] text-white/70">{formatCurrency(point.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="text-xl font-display font-semibold mb-2">Catalog Governance</h2>
          <p className="text-sm text-white/45 mb-6">Category coverage and revenue concentration.</p>
          <div className="space-y-4">
            {overview.categoryMix.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-2 capitalize">
                  <span className="text-white/70">{item.category}</span>
                  <span className="text-white/45">{item.count} products</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-hyper-growth" style={{ width: `${Math.min(100, item.revenue / 3000)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <GlassPanel className="p-0 xl:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-semibold">Recent Orders</h2>
              <p className="text-sm text-white/45">Latest checkout and settlement records.</p>
            </div>
            <PackageCheck className="w-5 h-5 text-electric-blue" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/[0.02] text-white/40 font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-normal">Order</th>
                  <th className="px-6 py-4 font-normal">Customer</th>
                  <th className="px-6 py-4 font-normal">Product</th>
                  <th className="px-6 py-4 font-normal">Value</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/75">
                {overview.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-white/55">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">{formatCurrency(order.value)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-neon-cyan/10 text-neon-cyan text-xs font-mono capitalize">
                        <CheckCircle2 className="w-3 h-3" />{order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 space-y-5">
          <h2 className="text-xl font-display font-semibold">Launch Checklist</h2>
          {['Cloudflare Pages configuration added', 'Backend endpoints normalized', 'Admin route connected', 'Brand renamed to saasproducts', 'GitHub-ready repository scripts'].map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-white/70">
              <CheckCircle2 className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </GlassPanel>
      </div>
    </div>
  );
};
