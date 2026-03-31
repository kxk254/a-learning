import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';
import { users } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

@Global()
@Module({
  providers: [{ provide: 'DB', useValue: db }],
  exports: ['DB'],
})
export class DbModule {}
