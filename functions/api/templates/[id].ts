import { PRODUCT_CATALOG } from '../../../src/lib/catalog';

export const onRequestGet: PagesFunction = async ({ params }) => {
  const id = String(params.id || '');
  const template = PRODUCT_CATALOG.find((item) => item.id === id);

  if (!template) {
    return Response.json({ error: 'Template not found' }, { status: 404 });
  }

  return Response.json(template);
};
