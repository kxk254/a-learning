import { Injectable } from '@nestjs/common';
import { db } from './db.module';

@Injectable()
export class DrizzleService {
  public readonly db = db;
}
