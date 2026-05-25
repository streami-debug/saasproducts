import { PRODUCT_CATALOG } from '../../../src/lib/catalog';

export const onRequestPost: PagesFunction = async ({ request }) => {
  const body = (await request.json().catch(() => ({}))) as { templateId?: string };
  const template = PRODUCT_CATALOG.find((item) => item.id === body.templateId);

  if (!template) {
    return Response.json({ error: 'A valid templateId is required to create an order.' }, { status: 400 });
  }

  return Response.json({ id: `SAASPRODUCTS_ORDER_${Date.now()}`, status: 'CREATED' });
};
