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

  async create(createUserDto: CreateUserDto) {
    return db.insert(users).values(createUserDto).returning();
  }

  async findAll() {
    const allUsers = await db.select().from(users);
    return allUsers;
  }

  async findOne(id: number) {
    const oneUser = await db.select().from(users).where(eq(users.id, id));
    return oneUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const upDate = await db
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id));
    return upDate;
  }

  async remove(id: number) {
    return db.delete(users).where(eq(users.id, id));
  }
}
