import { Config } from 'drizzle-kit';

export default {
  schema: './app/db/schemas.ts',
  out: './app/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_URL!,
  },
  verbose: true,
} satisfies Config;
