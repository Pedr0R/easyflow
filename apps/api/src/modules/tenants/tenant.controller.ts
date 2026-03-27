import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class TenantController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('tenant/context')
  tenantContext(@Req() req: Request) {
    return {
      tenantId: req.tenant?.tenantId ?? null,
      userId: req.tenant?.userId ?? null
    };
  }
}
