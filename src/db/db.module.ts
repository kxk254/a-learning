import { Module } from '@nestjs/common';
import { DatabaseService } from './index';

@Module({ providers: [DatabaseService], exports: [DatabaseService] })
export class DatabaseModule {}
