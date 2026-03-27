import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '../auth.types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = JwtPayload>(
    err: unknown,
    user: JwtPayload | false,
    _info: unknown,
    context: ExecutionContext
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Token invalido ou ausente.');
    }

    const req = context.switchToHttp().getRequest<Request>();
    const headerTenant = req.tenant?.tenantId;
    if (headerTenant && headerTenant !== user.tenantId) {
      throw new UnauthorizedException('Tenant do token difere do header x-tenant-id.');
    }

    req.tenant = {
      tenantId: user.tenantId,
      userId: user.sub
    };

    return user as TUser;
  }
}

