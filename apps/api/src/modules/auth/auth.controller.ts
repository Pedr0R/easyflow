import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtPayload } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Req() req: Request, @Body() body: RegisterDto) {
    const tenantId = req.tenant?.tenantId;
    if (!tenantId) {
      throw new UnauthorizedException('Header x-tenant-id e obrigatorio.');
    }
    return this.authService.register(tenantId, body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    const payload = req.user as JwtPayload | undefined;
    if (!payload) {
      throw new UnauthorizedException('Token invalido.');
    }
    return this.authService.me(payload);
  }
}

