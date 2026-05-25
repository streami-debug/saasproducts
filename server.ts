import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { ADMIN_OVERVIEW, PRODUCT_CATALOG, filterTemplates } from './src/lib/catalog';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.set('trust proxy', true);
  app.use(express.json());

  // ============================================================================
  // HEALTH CHECK
  // ============================================================================
  app.get('/api/health', (_req, res) => {
    res.json({ 
      ok: true, 
      service: 'saasproducts-api', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // ============================================================================
  // TEMPLATES / CATALOG
  // ============================================================================
  app.get('/api/templates', (req, res) => {
    const templates = filterTemplates({
      category: req.query.category?.toString(),
      search: req.query.search?.toString(),
      minPrice: Number(req.query.minPrice || 0),
      maxPrice: Number(req.query.maxPrice || 1000)
    });

    res.json({ 
      success: true,
      templates, 
      total: templates.length 
    });
  });

  app.get('/api/templates/:id', (req, res) => {
    const item = PRODUCT_CATALOG.find((template) => template.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Template not found' });
    res.json({ success: true, data: item });
  });

  // ============================================================================
  // ADMIN ENDPOINTS
  // ============================================================================
  app.get('/api/admin/overview', (_req, res) => {
    res.json({ success: true, data: ADMIN_OVERVIEW });
  });

  app.get('/api/admin/templates', (_req, res) => {
    res.json({ 
      success: true,
      templates: PRODUCT_CATALOG, 
      total: PRODUCT_CATALOG.length 
    });
  });

  // ============================================================================
  // CHECKOUT
  // ============================================================================
  app.post('/api/checkout/paypal', (req, res) => {
    const templateId = req.body?.templateId;
    const template = PRODUCT_CATALOG.find((item) => item.id === templateId);
    if (!template) return res.status(400).json({ error: 'A valid templateId is required to create an order.' });

    res.json({ 
      success: true,
      id: `SAASPRODUCTS_ORDER_${Date.now()}`, 
      status: 'CREATED' 
    });
  });

  app.post('/api/checkout/capture', (req, res) => {
    if (!req.body?.orderID) return res.status(400).json({ error: 'orderID is required.' });
    res.json({ 
      success: true, 
      url: '/dashboard/user?checkout=success',
      message: 'Order captured successfully'
    });
  });

  // ============================================================================
  // VITE MIDDLEWARE & STATIC FILES
  // ============================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ saasproducts server running on http://0.0.0.0:${PORT}`);
    console.log(`📊 Admin panel: http://0.0.0.0:${PORT}/admin`);
    console.log(`🛍️  Marketplace: http://0.0.0.0:${PORT}/marketplace`);
  });
}

startServer().catch(console.error);
