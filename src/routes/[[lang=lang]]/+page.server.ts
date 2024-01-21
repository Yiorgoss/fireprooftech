import { db } from '$lib/db/database';

export async function load() {
  const rows = await db.selectFrom('Example').selectAll().execute();
  return {
    rows
  };
}
