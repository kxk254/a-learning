import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @Isstring()
  name: string;

  @IsEmail()
  email: string;
}
