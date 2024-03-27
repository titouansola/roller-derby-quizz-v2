import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.export';

export const connection = neon(process.env.DATABASE_CONNECTION_URL!);
export const db = drizzle(connection, { schema });
