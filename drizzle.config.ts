import { Config } from 'drizzle-kit';

export default {
  schema: './app/db/schemas.ts',
  out: './app/db/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_URL!,
  },
} satisfies Config;
