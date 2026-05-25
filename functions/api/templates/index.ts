import { filterTemplates } from '../../../src/lib/catalog';

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const templates = filterTemplates({
    category: url.searchParams.get('category'),
    search: url.searchParams.get('search'),
    minPrice: Number(url.searchParams.get('minPrice') || 0),
    maxPrice: Number(url.searchParams.get('maxPrice') || 1000)
  });

  return Response.json({ templates, total: templates.length });
};
