export const onRequestGet: PagesFunction = async () => {
  return Response.json({ ok: true, service: 'saasproducts-api', timestamp: new Date().toISOString() });
};
