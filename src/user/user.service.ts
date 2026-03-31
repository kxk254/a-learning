import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async createUser(name: string, email: string) {
    return this.drizzle.db.insert(users).values({ name, email }).returning();
  }

  async getUserById(id: number) {
    return this.drizzle.db.select().from(users).where(eq(users.id, id));
  }

  async getAllUsers() {
    try {
      return await this.drizzle.db.select().from(users);
    } catch (err) {
      console.error('🔥 REAL ERROR:', err);
      throw err;
    }
  }
}
