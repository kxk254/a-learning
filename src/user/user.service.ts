import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from '../db/db.module';
import { users } from '../db/schema';
import { DrizzleService } from '../db/db.service';

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
