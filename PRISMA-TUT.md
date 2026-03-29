https://www.prisma.io/docs/guides/frameworks/nestjs

DATABASE_URL="postgres://konno:Dev0126@192.168.11.71:5432/test01?api_key=e"

# Second Patch

✅ start project in current folder

```
npx @nestjs/cli new . 

```
install dependency 
```
npm install 
```

Install Prisma locally
```
npm install prisma @prisma/client 
```

✅ Enter PostgrePostgreSQL
```
sudo -u postgres psql
psql -h 192.168.11.71 -U postgres
psql -h <remote_host> -p <port> -U <username> -d <database_name>
```
✅ Create database + user
```
CREATE DATABASE test02;

CREATE USER nestuser WITH PASSWORD 'password';
or
GRANT ALL PRIVILEGES ON DATABASE test02 TO konno;

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

## 3️⃣ Use .env in NestJS for other settings

Install NestJS ConfigModule:
```
npm install @nestjs/config
```

In app.module.ts:
```
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env automatically
  ],
})
export class AppModule {}
Now you can inject ConfigService anywhere:
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private config: ConfigService) {
    const dbUrl = this.config.get<string>('DATABASE_URL');
    console.log(dbUrl); // prints the value from .env
  }
}
```
4️⃣ Prisma Migrate / Generate using .env
Generate Prisma client:
```
npx prisma generate
```
Run migrations:
```
npx prisma migrate dev --name init
```
Both commands will read the DATABASE_URL from .env


🚀 1️⃣2️⃣ Run the app 

```
npm run start:dev
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








