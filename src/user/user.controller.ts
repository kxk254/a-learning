import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: { name: string; email: string }) {
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
