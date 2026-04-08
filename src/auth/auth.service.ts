import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: any): Promise<any> {
    const user = await this.usersService.findOne(data.username);
    if (!user || user.password !== data.password) {
      throw new UnauthorizedException();
    }

    const p = {
      sub: user.id,
      username: user.username,
      password: user.password,
      roles: user.roles,
    };
    return { access_token: await this.jwtService.signAsync(p) };
  }
}
