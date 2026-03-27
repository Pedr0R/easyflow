import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async register(tenantId: string, dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.usersRepo.findOne({ where: { tenantId, email } });
    if (existing) {
      throw new BadRequestException('Ja existe usuario com este e-mail neste tenant.');
    }

    const passwordHash = await bcrypt.hash(dto.senha, 10);

    const user = this.usersRepo.create({
      id: randomUUID(),
      tenantId,
      nome: dto.nome.trim(),
      email,
      passwordHash,
      role: dto.role?.trim() || 'COLABORADOR'
    });

    await this.usersRepo.save(user);
    return this.buildAuthResponse(user);
  }

  async login(tenantId: string, dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.usersRepo.findOne({ where: { tenantId, email } });

    if (!user) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    const ok = await bcrypt.compare(dto.senha, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Credenciais invalidas.');
    }

    return this.buildAuthResponse(user);
  }

  async me(payload: JwtPayload) {
    const user = await this.usersRepo.findOne({
      where: {
        id: payload.sub,
        tenantId: payload.tenantId
      }
    });

    if (!user) {
      throw new UnauthorizedException('Usuario nao encontrado.');
    }

    return {
      id: user.id,
      tenantId: user.tenantId,
      nome: user.nome,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };
  }

  private buildAuthResponse(user: UserEntity) {
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      user: {
        id: user.id,
        tenantId: user.tenantId,
        nome: user.nome,
        email: user.email,
        role: user.role
      }
    };
  }
}

