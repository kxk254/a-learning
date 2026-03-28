🔹 NestJS + PostgreSQL Tutorial (Basic Setup)
Prerequisites
Node.js ≥ 18
npm or yarn
PostgreSQL running locally (or in VM, 2 GB+ RAM is enough)
Basic terminal and JS/TS knowledge
1️⃣ Create a new NestJS project
```
npm i -g @nestjs/cli
nest new nest-postgres-demo
cd nest-postgres-demo
```

Choose npm or yarn when prompted.

2️⃣ Install database dependencies

We’ll use TypeORM, which works well with PostgreSQL.
```
npm install --save @nestjs/typeorm typeorm pg
```
@nestjs/typeorm → NestJS integration
typeorm → ORM
pg → PostgreSQL driver
3️⃣ Configure PostgreSQL connection

Edit app.module.ts:
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',      // your DB user
      password: 'postgres',      // your DB password
      database: 'nest_demo',     // your DB name
      entities: [User],
      synchronize: true,         // auto-create tables (dev only)
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

synchronize: true is only for development/testing. Never use in production.

4️⃣ Create a simple User entity
```
nest g module users
nest g service users
nest g controller users
```

In users/user.entity.ts:

```
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```
5️⃣ Set up the User Service

In users/users.service.ts:
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
```
6️⃣ Set up the User Controller

In users/users.controller.ts:
```
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```
7️⃣ Update UsersModule
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```
8️⃣ Test Your API

Start the app:
```
npm run start:dev
```
Create user (POST /users)
```
{
  "name": "Alice",
  "email": "alice@example.com"
}
```
Get all users (GET /users)
Get user by id (GET /users/1)
Delete user (DELETE /users/1)
✅ Key Points
NestJS structure: Controller → Service → Entity → Database
TypeORM handles the database mapping automatically
Server-side validation (like class-validator) can be added later
synchronize: true creates tables automatically for dev/testing

If you want, I can also make a diagram of the folder + database flow, so you can visualize NestJS → Service → Entity → Postgres, which makes this super easy to remember.
