import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from '../db/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in your .evn');
}
export const db = drizzle(process.env.DATABASE_URL!);
export { usersTable };
