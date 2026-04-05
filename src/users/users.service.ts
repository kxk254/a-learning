import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: number): Promise<User | undefined> {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  }
}
