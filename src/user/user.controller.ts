import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body.name, body.email);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
