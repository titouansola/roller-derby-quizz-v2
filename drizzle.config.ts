import { Config } from 'drizzle-kit';

export default {
  schema: './app/common/schema.export.ts',
  out: './db/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_CONNECTION_URL!,
  },
} satisfies Config;
