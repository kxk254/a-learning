import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from '../db/db.module';
import { users } from '../db/schema';
import { DrizzleService } from '../db/db.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private drizzleService: DrizzleService) {}

  async create(name: string, age: number, email: string) {
    return db.insert(users).values({ name, age, email }).returning();
  }

  async findAll() {
    const allUsers = await db.select().from(users);
    return allUsers;
  }

  async findOne(id: number) {
    const oneUser = await db.select().from(users).where(eq(users.id, id));
    return oneUser;
  }

  async update(id: number, name: string, age: number, email: string) {
    const upDate = await db
      .update(users)
      .set({ name: name, age: age, email: email })
      .where(eq(users.id, id));
    return upDate;
  }

  async remove(id: number) {
    return db.delete(users).where(eq(users.id, id));
  }
}
