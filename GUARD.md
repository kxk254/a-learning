Here’s a clear **step‑by‑step guide** to *extend the NestJS 19‑auth‑jwt sample to support roles* (Role‑Based Access Control). The sample currently only authenticates via JWT — it doesn’t include any role logic out of the box.([NestJS ドキュメント][1])

---

## 🧱 1. Define Your Roles Enum

Create an enum to list all possible roles:

```ts
// src/auth/role.enum.ts
export enum Role {
  User = 'user',
  Admin = 'admin',
}
```

This makes your role values consistent everywhere.([NestJS ドキュメント][2])

---

## 🔖 2. Add Roles Metadata Decorator

Create a decorator to mark routes with required roles:

```ts
// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

This stores required roles in route metadata.([NestJS ドキュメント][2])

---

## 🛡️ 3. Create a Roles Guard

This guard reads the metadata and checks the authenticated user’s role:

```ts
// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true; // no role restriction

    const { user } = context.switchToHttp().getRequest();
    return user && requiredRoles.some(role => user.role === role);
  }
}
```

✔️ Notice this guard expects `request.user.role` to exist (we’ll ensure this next).([NestJS ドキュメント][2])

---

## 🧠 4. Put User Roles in JWT Payload

When signing the JWT in your auth service, include the user’s role. For example, in `AuthService`:

```ts
// wherever you sign your token
const payload = { sub: user.userId, username: user.username, role: user.role };
return { access_token: await this.jwtService.signAsync(payload) };
```

Now the JWT contains the user’s role — useful for authorization.

---

## 🧑‍✈️ 5. Make Sure JWT Guard Sets `request.user`

Your existing AuthGuard must extract the token *and* populate `request.user` with the token’s payload (including `role`). When using Passport + JWT strategy, Nest will do this automatically if configured correctly. For example:

```ts
// jwt.strategy.ts (Passport strategy)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // payload.role now gets attached to req.user
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
```

---

## 🚪 6. Apply Guards & Decorators on Routes

### Per‑route usage:

```ts
@Controller('profile')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProfileController {
  @Get()
  @Roles(Role.Admin)      // only admin can access
  getAdminOnlyData() {
    return 'secret admin data';
  }

  @Get('/user')
  @Roles(Role.User, Role.Admin) // user or admin
  getUserData() {
    return 'general data';
  }
}
```

### Or globally (all routes protected):

```ts
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard('jwt'),
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
```

This way every route requires JWT + roles unless explicitly exempted.([NestJS ドキュメント][2])

---

## 🧪 Example Flow

1. **Login:** User calls `/auth/login` → gets JWT including `{ role: 'user' }`.
2. **Request:** Client calls protected endpoint with Bearer token.
3. **Auth Guard:** Validates JWT and populates `req.user`.
4. **Roles Guard:** Reads `@Roles(...)` metadata and checks `req.user.role`.
5. **Result:** Access allowed or 403 Forbidden based on role.([NestJS ドキュメント][2])

---

## ⚠️ Notes & Tips

* Order of guards matters: `AuthGuard` must run *before* `RolesGuard`. So always do `@UseGuards(AuthGuard('jwt'), RolesGuard)`.([DeepWiki][3])
* If you use global guards, **don’t override them incorrectly** in module providers — use `APP_GUARD`.([DeepWiki][3])
* Roles can come from the database too — you’re just encoding them in the JWT for simplicity.

---

If you want, I can tailor this to your **current sample code** by showing the exact diff + patch — just tell me your NestJS version!

[1]: https://docs.nestjs.com/security/authentication?utm_source=chatgpt.com "Authentication | NestJS - A progressive Node.js framework"
[2]: https://docs.nestjs.com/security/authorization?utm_source=chatgpt.com "Authorization | NestJS - A progressive Node.js framework"
[3]: https://deepwiki.com/nestjs/nest/7.3-authentication-and-authorization?utm_source=chatgpt.com "Authentication & Authorization | nestjs/nest | DeepWiki"


# SAMPLE CODE 
```
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
```
