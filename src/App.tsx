/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Header } from './components/shared/header';
import { Footer } from './components/shared/footer';
import { ChatBot } from './components/chat/ChatBot';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { TemplateDetailsPage } from './pages/TemplateDetailsPage';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { AdminPanel } from './pages/AdminPanel';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>saasproducts | Professional SaaS Product Marketplace</title>
          <meta name="description" content="saasproducts is a professional full-stack marketplace for SaaS templates, AI systems, automation kits, and creator-ready product assets." />
        </Helmet>
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand-purple/10 to-transparent blur-[120px] pointer-events-none" />
          <Header />
          <ChatBot />
          <main className="flex-grow z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/template/:id" element={<TemplateDetailsPage />} />
              <Route path="/dashboard/creator" element={<CreatorDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              {/* Catch-all for mockup dashboard links */}
              <Route path="/dashboard/user" element={
                <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-neon-cyan/20 flex items-center justify-center mb-6">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h1 className="text-3xl font-display font-bold">Transaction Confirmed</h1>
                  <p className="text-white/60">Your premium assets have been deployed to your account ledger.</p>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
