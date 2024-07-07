import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {

  if (url.pathname != '/coming-soon') {

    redirect(307, '/coming-soon');
  }
}
