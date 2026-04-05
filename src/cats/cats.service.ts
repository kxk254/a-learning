import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { DatabaseService } from '../db/index';
import { cats } from '../db/schema';

@Injectable()
export class CatsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createCatDto: CreateCatDto) {
    return this.databaseService.db.insert(cats).values(createCatDto);
  }

  findAll() {
    return this.databaseService.db.select().from(cats);
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
