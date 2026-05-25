import { ADMIN_OVERVIEW } from '../../../src/lib/catalog';

export const onRequestGet: PagesFunction = async () => {
  return Response.json(ADMIN_OVERVIEW);
};
