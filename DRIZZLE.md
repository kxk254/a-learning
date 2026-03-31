
https://github.com/Best-of-Awesome/Awesome-NestJS

DATABASE_URL="postgres://konno:Dev0126@192.168.11.71:5432/test01?api_key=e"


NestJS + Drizzle ORM Tutorial
1. Initialize the NestJS Project
# Create a new NestJS project
```
npx nest new .
npm install @nestjs/cli --save-dev
nest new a-lesson
cd a-lesson
```

```
npx nest generate application app 
npx nest generate module users
npx nest generate controller users
npx nest generate service users 
```

Choose npm or yarn as you prefer. We'll assume npm.

2. Install Dependencies
Runtime dependencies
```
npm i drizzle-orm pg dotenv
```
Dev dependencies
```
npm i -D drizzle-kit tsx @types/pg
```
drizzle-orm → ORM for TypeScript
pg → PostgreSQL driver
dotenv → Load .env
drizzle-kit → CLI for migrations
tsx → Run TypeScript files without compiling
@types/pg → TypeScript types for pg
3. Configure Environment

Create a .env file at the root:

```
DATABASE_URL="postgres://username:password@localhost:5432/test01"
```

Replace username, password, and database name.

4. Create Drizzle Configuration

At root, create drizzle.config.ts:
```
import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: 'postgresql',
  dbCredentials: {url: process.env.DATABASE_URL!},
});
```
schema.ts → define tables
migrations → store generated migration files
5. Define Schema

Create src/db/schema.ts:
```
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content"),
  authorId: integer("author_id").references(() => users.id,{onDelete:'CASCADE'}).notNull().
});
```

Create src/db/db.module.ts 

```
import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';
import { users } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

@Global()
@Module({
  providers: [{ provide: 'DB', useValue: db }],
  exports: ['DB'],
})
export class DbModule {}


```

Drizzle uses code-first tables in TypeScript.

6. Generate Database Migrations
```
npx drizzle-kit generate
```
Creates migration files in drizzle/migrations
Apply migrations:
```
npx drizzle-kit migrate
```
This will create users and posts tables in your PostgreSQL database.
7. Create Prisma Service Equivalent

NestJS prefers dependency injection. Create src/db/drizzle.service.ts:

```
import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

@Injectable()
export class DrizzleService {
  db;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.db = drizzle(pool);
  }
}
```
DrizzleService now provides access to your database.
this.db will be used in repositories/services.
8. Create User Service

src/user/user.service.ts:
```
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "../db/drizzle.service";
import { users } from "../db/schema";
import { eq } from 'drizzle-orm';
import { db } from '../db/db.module'

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async createUser(name: string, email: string) {
    return db.insert(users).values({ name, email }).returning();
  }

  async getUserById(id: number) {
    return db.select().from(users).where(eq(users.id, id));
  }

  async getAllUsers() {
    return db.select().from(users);
  }
}
```
9. Create User Controller

src/user/user.controller.ts:
```

import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { name: string; email: string }) {
    return this.userService.createUser(body.name, body.email);
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
```
10. Update App Module

src/app.module.ts:
```
import { Module } from "@nestjs/common";
import { DrizzleService } from "./db/drizzle.service";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [DrizzleService, UserService],
})
export class AppModule {}
```
11. Run the App
```
npm run start:dev
```
POST /users → create user
GET /users → list users
GET /users/:id → get user by ID

✅ Advantages of this setup:

Type-safe database with Drizzle
NestJS-friendly DI structure
Fully TypeScript-first, no ESM/JS imports issues
Lightweight and easier to debug than Prisma in some setups


# Validation

1. Install Validation Packages
```
npm i class-validator class-transformer
```
class-validator → rules for validation (e.g., @IsEmail())
class-transformer → transforms plain objects to class instances, required for validation to work
2. Enable Global Validation Pipe

In src/main.ts:
```
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // throw error if unknown prop
      transform: true, // auto-transform payloads to DTO classes
    }),
  );

  await app.listen(3000);
}
bootstrap();
```
whitelist + forbidNonWhitelisted ensures only the fields defined in DTOs are accepted.

3. Create a DTO (Data Transfer Object)

Example: src/user/dto/create-user.dto.ts
```
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsEmail()
  email: string;
}
```
@IsNotEmpty() → field must not be empty
@Length(min, max) → string length limit
@IsEmail() → must be a valid email
4. Use DTO in Controller

src/user/user.controller.ts:
```
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body.name, body.email);
  }
}
```
Nest automatically validates the body against the CreateUserDto.
If validation fails, it returns 400 Bad Request with detailed error messages.
5. Advanced Validation Options
Custom Validators:
```
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCompanyEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    return email.endsWith('@company.com');
  }
}

export function IsCompanyEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCompanyEmailConstraint,
    });
  };
}
```
Use in DTO:
```
@IsCompanyEmail({ message: 'Email must be a company email' })
email: string;
```
Nested Validation:
```
export class AddressDto {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;
}

export class UserWithAddressDto {
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
```
✅ Summary
Install class-validator and class-transformer.
Enable ValidationPipe globally.
Define DTOs with decorators (@IsNotEmpty(), @IsEmail(), etc.).
Use DTOs in controller @Body().
Can add custom validators and nested DTOs.
