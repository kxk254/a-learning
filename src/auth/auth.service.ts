import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const [user] = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
