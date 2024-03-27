import 'dotenv/config';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '~/db/db.server';

void migrate(db, { migrationsFolder: './app/db/drizzle' });
