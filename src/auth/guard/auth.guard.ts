import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(data: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', data.getHandler());
    if (isPublic) return true;

    const request = data.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    // Step 1: veryfy JWT and attach payload
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    // Step 2: check roles
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // if no roles are determined
    if (!roles || roles.length === 0) return true;
    const userRoles = request.user.roles ?? [];
    const hasRole = roles.come((role) => userRoles.includes(role));
    if (!hasRole) throw new UnauthorizedException();

    //Step 3: final authorization to return true
    return true;
  }
  private extractTokenFromHeader(r: Request) {
    const [type, token] = r.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
