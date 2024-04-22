import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schemas';
import pg from 'pg';

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_CONNECTION_URL,
});
export const db = drizzle(pool, { schema });
