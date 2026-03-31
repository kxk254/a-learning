import { Module } from '@nestjs/common';
import { DrizzleService } from './db/drizzle.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, DrizzleService],
})
export class AppModule {}
