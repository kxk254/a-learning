Prerequisites
Node.js ≥ 18
npm or yarn
PostgreSQL installed and running
Basic knowledge of TypeScript and terminal commands
1️⃣ Create a New NestJS Project
```
npm i -g @nestjs/cli
npm install --save-dev @nestjs/cli
nest new nest-postgres-demo
cd nest-postgres-demo
```
Choose npm or yarn when prompted.

2️⃣ Install Database Dependencies
```
npm install --save @nestjs/typeorm typeorm pg
```
@nestjs/typeorm → NestJS integration with TypeORM
typeorm → Object-relational mapping
pg → PostgreSQL driver
3️⃣ Configure PostgreSQL Connection

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
Note: synchronize: true is only for development/testing.

4️⃣ Generate Users Module, Service, Controller
```
npx nest g module users
npx nest g service users
npx nest g controller users
```
5️⃣ Create a User Entity

users/user.entity.ts:
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
6️⃣ Set Up Users Service

users/users.service.ts:
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
7️⃣ Set Up Users Controller

users/users.controller.ts:
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
8️⃣ Update Users Module

users/users.module.ts:
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
9️⃣ Run the Application
```
npm run start:dev
```
POST /users – Create a user
```
{
  "name": "Alice",
  "email": "alice@example.com"
}
```
GET /users – List all users
GET /users/:id – Get a user by ID
DELETE /users/:id – Remove a user
✅ Key Notes
NestJS follows the Controller → Service → Entity → Database pattern
TypeORM handles database mapping automatically
synchronize: true is for dev/testing only
You can expand this to include validation, relations, and DTOs

I can also make a visual diagram of the NestJS flow with PostgreSQL and include it in the Markdown so it’s extremely beginner-friendly.

🔹 Step 1: Install Validation Dependencies
```
npm install class-validator class-transformer
```
class-validator → validates incoming DTO data
class-transformer → converts plain objects to class instances

Enable validation globally in main.ts:
```
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
```
whitelist: true removes properties that are not in the DTO
🔹 Step 2: Create Post Entity

posts/post.entity.ts:
```
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
  user: User;
}
```
🔹 Step 3: Update User Entity

users/user.entity.ts:
```
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
```
Now a User can have multiple Posts.
🔹 Step 4: Create DTOs

users/dto/create-user.dto.ts:
```
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
```

posts/dto/create-post.dto.ts:
```
import { IsString, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  userId: number; // to associate post with a user
}
```
🔹 Step 5: Create Post Module, Service, Controller
```
npx nest g module posts
npx nest g service posts
npx nest g controller posts
```
posts/posts.service.ts:
```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreatePostDto) {
    const user = await this.usersRepository.findOneBy({ id: dto.userId });
    if (!user) throw new Error('User not found');

    const post = this.postsRepository.create({
      title: dto.title,
      content: dto.content,
      user,
    });

    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find({ relations: ['user'] });
  }
}
```

posts/posts.controller.ts:
```
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
```
🔹 Step 6: Update Modules

posts/posts.module.ts:
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
```

app.module.ts:
```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_demo',
      entities: [User, Post],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
```
🔹 Step 7: Test the App
Create a user:
POST /users
```
{
  "name": "Alice",
  "email": "alice@example.com"
}
```
Create a post for the user:
POST /posts
```
{
  "title": "My First Post",
  "content": "Hello NestJS!",
  "userId": 1
}
```
Get posts with user info:
GET /posts

Response example:
```
[
  {
    "id": 1,
    "title": "My First Post",
    "content": "Hello NestJS!",
    "user": {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
]
```
✅ Key Features Added

DTOs with validation (class-validator)
One-to-many User → Post relation
Service layer handles relations
Controller layer handles requests

If you want, I can now combine the full tutorial into a single Markdown file with diagrams showing the flow: Controller → Service → Entity → Database → Relations, so it’s beginner-friendly and visual.

# Second Patch

✅ Enter PostgrePostgreSQL
```
sudo -u postgres psql
```
✅ Create database + user
```
CREATE DATABASE nestdb;

CREATE USER nestuser WITH PASSWORD 'password';

ALTER ROLE nestuser SET client_encoding TO 'utf8';
ALTER ROLE nestuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE nestuser SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE nestdb TO nestuser;
```
🧪 2️⃣ Test DB connection
```
psql -U nestuser -d nestdb -h localhost -W
```

🚀 3️⃣ Create NestJS project
```
npx @nestjs/cli new nest-prisma-app
cd nest-prisma-app
```

📦 4️⃣ Install Prisma
```
npm install prisma @prisma/client
npx prisma init
```

⚙️ 5️⃣ Configure database connection
```
DATABASE_URL="postgresql://nestuser:password@localhost:5432/nestdb"
```

🧬 6️⃣ Define your schema
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

🛠️ 7️⃣ Run migration (VERY IMPORTANT)
```
npx prisma migrate dev --name init
```

🔍 Optional: Open DB UI
```
npx prisma studio
```

🧩 8️⃣ Integrate Prisma into NestJS
```
npx nest g module prisma
npx nest g service prisma 
```

### prisma.service.ts
```
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```
### prisma.module.ts 
```
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

👤 9️⃣ Create Users Module 
```
npx nest g module users
npx nest g controller users
npx nest g service users  
```

⚙️ 🔟 Users Service (Prisma logic) 
```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string; email: string }) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
```


🌐 1️⃣1️⃣ Users controller

```
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
```

🚀 1️⃣2️⃣ Run the app 

```
npm run start:development
```

🧪 1️⃣3️⃣ Test API 

```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

🧱 1️⃣ Install validation packages

```
npm install class-validator class-transformer
```

⚙️ 2️⃣ Enable global validation (VERY IMPORTANT)
### Edit main.ts:
```
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown fields
      forbidNonWhitelisted: true, // throw error if extra fields
      transform: true, // auto transform types
    }),
  );

  await app.listen(3000);
}
bootstrap();
```

📦 3️⃣ Create DTO

Create file:
```
src/users/dto/create-user.dto.ts

```

### DTO CODE 
```
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```
⚙️ 4️⃣ Update Prisma schema

### Add password field:
```
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
}
```

### Run Migration 
```
npx prisma migrate dev --name add-password
```

🔧 5️⃣ Update Service 
```
create(data: CreateUserDto) {
  return this.prisma.user.create({ data });
}
```
🌐 6️⃣ Update Controller
```
import { CreateUserDto } from './dto/create-user.dto';

@Post()
create(@Body() body: CreateUserDto) {
  return this.service.create(body);
}
```








