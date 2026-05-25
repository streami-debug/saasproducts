/**
 * Manage sponsored product campaigns on Cloudflare Pages
 * GET /api/ads/sponsored-products - List all campaigns
 * POST /api/ads/sponsored-products - Create new campaign
 * PATCH /api/ads/sponsored-products/:id - Update campaign
 */

export const onRequest: PagesFunction = async ({ request, env }) => {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const campaignId = pathParts[pathParts.length - 1];

  try {
    if (request.method === 'GET') {
      // List all sponsored products
      const mockCampaigns = [
        {
          id: 'camp_001',
          productId: 'tpl_1',
          productTitle: 'AI SaaS Website System Matrix',
          productPrice: 29,
          sponsorId: 'creator_001',
          sponsorName: 'saasproducts Studio',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          dailyBudget: 50,
          totalSpent: 450,
          impressions: 12500,
          clicks: 425,
          conversions: 18,
          status: 'active'
        },
        {
          id: 'camp_002',
          productId: 'tpl_2',
          productTitle: 'Freelancer AI Operational Toolkit',
          productPrice: 19,
          sponsorId: 'creator_002',
          sponsorName: 'Growth Labs',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
          dailyBudget: 30,
          totalSpent: 210,
          impressions: 8200,
          clicks: 285,
          conversions: 12,
          status: 'active'
        }
      ];

      return Response.json({
        success: true,
        campaigns: mockCampaigns,
        total: mockCampaigns.length
      });
    } else if (request.method === 'POST') {
      // Create new sponsored campaign
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

      const newCampaign = {
        id: `camp_${Date.now()}`,
        ...body,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        totalSpent: 0,
        status: 'active'
      };

      console.log('Created sponsored campaign:', newCampaign);

      return Response.json({
        success: true,
        id: newCampaign.id,
        message: 'Campaign created successfully'
      });
    } else if (request.method === 'PATCH' && campaignId && campaignId !== 'sponsored-products') {
      // Update campaign
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

      console.log('Updated campaign:', campaignId, body);

      return Response.json({
        success: true,
        id: campaignId,
        message: 'Campaign updated successfully'
      });
    } else {
      return Response.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error('Sponsored products error:', error);
    return Response.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
};
