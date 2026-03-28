import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { User } from "./users/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRot({
      type: "postgres",
      host: "192.168.11.71",
      port: 5432,
      username: "konno",
      password: "Dev0126",
      database: "test01",
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
