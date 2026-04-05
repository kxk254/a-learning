import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
