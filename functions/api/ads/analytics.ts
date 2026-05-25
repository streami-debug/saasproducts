/**
 * Get ad analytics data on Cloudflare Pages
 * GET /api/ads/analytics?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  try {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!startDate || !endDate) {
      return Response.json(
        { error: 'startDate and endDate query parameters are required' },
        { status: 400 }
      );
    }

    // Mock analytics data (in production, query D1 database)
    const mockAnalytics = [
      {
        date: startDate,
        impressions: 1250,
        clicks: 45,
        ctr: 3.6,
        revenue: 125.5
      },
      {
        date: new Date(new Date(startDate).getTime() + 86400000).toISOString().split('T')[0],
        impressions: 1480,
        clicks: 52,
        ctr: 3.51,
        revenue: 142.3
      },
      {
        date: endDate,
        impressions: 1320,
        clicks: 48,
        ctr: 3.64,
        revenue: 135.8
      }
    ];

    return Response.json({
      success: true,
      startDate,
      endDate,
      analytics: mockAnalytics,
      totals: {
        impressions: mockAnalytics.reduce((sum, d) => sum + d.impressions, 0),
        clicks: mockAnalytics.reduce((sum, d) => sum + d.clicks, 0),
        revenue: mockAnalytics.reduce((sum, d) => sum + d.revenue, 0)
      }
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch analytics', details: String(error) },
      { status: 500 }
    );
  }
};
