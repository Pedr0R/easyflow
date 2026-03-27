import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const tenantId = req.header('x-tenant-id');
    const userId = req.header('x-user-id');

    if (tenantId && tenantId.trim()) {
      req.tenant = {
        tenantId: tenantId.trim(),
        userId: userId?.trim() || undefined
      };
    }
    next();
  }
}
