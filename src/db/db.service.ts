import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  db = drizzle(process.env.DATABASE_URL!);
}
