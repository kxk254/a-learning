import { Module } from '@nestjs/common';
import { DatabaseService } from './db.service';

@Module({
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule {}
