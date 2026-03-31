import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../db/drizzle.service';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { db } from '../db/db.module';

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async createUser(name: string, email: string) {
    return db.insert(users).values({ name, email }).returning();
  }

  async getUserById(id: number) {
    return db.select().from(users).where(eq(users.id, id));
  }

  async getAllUsers() {
    return db.select().from(users);
  }
}
