import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Between, Repository } from 'typeorm';
import { TenantContext } from '../../common/tenant/tenant-context';
import { PunchAdjustmentEntity, PunchAdjustmentStatus } from './entities/punch-adjustment.entity';
import { PunchEntity } from './entities/punch.entity';
import { CreatePunchDto } from './dto/create-punch.dto';
import { RequestAdjustmentDto } from './dto/request-adjustment.dto';

@Injectable()
export class PontosService {
  constructor(
    @InjectRepository(PunchEntity)
    private readonly punchesRepo: Repository<PunchEntity>,
    @InjectRepository(PunchAdjustmentEntity)
    private readonly adjustmentsRepo: Repository<PunchAdjustmentEntity>
  ) {}

  private requireUserId(ctx: TenantContext) {
    if (!ctx.userId || !ctx.userId.trim()) {
      throw new BadRequestException('Header x-user-id e obrigatorio para esta operacao.');
    }
    return ctx.userId.trim();
  }

  create(ctx: TenantContext, dto: CreatePunchDto) {
    const tenantId = ctx.tenantId;
    const userId = this.requireUserId(ctx);

    const pontoTimestamp = dto.timestamp ? new Date(dto.timestamp) : new Date();

    const punch = this.punchesRepo.create({
      id: randomUUID(),
      tenantId,
      userId,
      tipo: dto.tipo,
      pontoTimestamp,
      latitude: dto.latitude,
      longitude: dto.longitude,
      observacao: dto.observacao ?? null
    });

    return this.punchesRepo.save(punch);
  }

  listToday(ctx: TenantContext) {
    const tenantId = ctx.tenantId;
    const userId = this.requireUserId(ctx);

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    return this.punchesRepo.find({
      where: {
        tenantId,
        userId,
        pontoTimestamp: Between(start, end)
      },
      order: { pontoTimestamp: 'ASC' }
    });
  }

  list(ctx: TenantContext, options: { mes?: string; from?: string; to?: string }) {
    const tenantId = ctx.tenantId;
    const userId = this.requireUserId(ctx);

    let start: Date;
    let end: Date;

    if (options.from || options.to) {
      if (!options.from || !options.to) {
        throw new BadRequestException('Para filtrar por intervalo, informe ambas as queries: from e to.');
      }

      const fromMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(options.from);
      const toMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(options.to);

      const fromDate = new Date(options.from);
      const toDate = new Date(options.to);

      if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
        throw new BadRequestException('Query from/to devem ser datas validas (ex: 2026-03-01).');
      }
      if (fromDate > toDate) {
        throw new BadRequestException('Query from deve ser menor ou igual a to.');
      }

      if (fromMatch && toMatch) {
        // Considera datas sem hora como intervalo por dia (UTC)
        const fy = Number(fromMatch[1]);
        const fm = Number(fromMatch[2]);
        const fd = Number(fromMatch[3]);
        const ty = Number(toMatch[1]);
        const tm = Number(toMatch[2]);
        const td = Number(toMatch[3]);

        start = new Date(Date.UTC(fy, fm - 1, fd, 0, 0, 0, 0));
        end = new Date(Date.UTC(ty, tm - 1, td, 23, 59, 59, 999));
      } else {
        // Se incluir hora, usa os timestamps como vieram
        start = fromDate;
        end = toDate;
      }
    } else {
      const mes = options.mes;

      let year: number;
      let month: number; // 1-12

      if (mes) {
        const match = /^(\d{4})-(\d{2})$/.exec(mes);
        if (!match) {
          throw new BadRequestException('Query mes deve estar no formato YYYY-MM.');
        }
        year = Number(match[1]);
        month = Number(match[2]);
        if (month < 1 || month > 12) {
          throw new BadRequestException('Mes invalido.');
        }
      } else {
        const now = new Date();
        year = now.getFullYear();
        month = now.getMonth() + 1;
      }

      start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
      end = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    }

    return this.punchesRepo.find({
      where: {
        tenantId,
        userId,
        pontoTimestamp: Between(start, end)
      },
      order: { pontoTimestamp: 'ASC' }
    });
  }

  async requestAdjustment(ctx: TenantContext, punchId: string, dto: RequestAdjustmentDto) {
    const tenantId = ctx.tenantId;
    const userId = this.requireUserId(ctx);

    const punch = await this.punchesRepo.findOne({ where: { id: punchId, tenantId, userId } });
    if (!punch) {
      throw new NotFoundException('Ponto nao encontrado para este tenant/usuario.');
    }

    const status: PunchAdjustmentStatus = 'PENDENTE';

    const adjustment = this.adjustmentsRepo.create({
      id: randomUUID(),
      tenantId,
      userId,
      punchId,
      justificativa: dto.justificativa,
      novoTipo: dto.novoTipo ?? null,
      novoPontoTimestamp: dto.novoTimestamp ? new Date(dto.novoTimestamp) : null,
      latitude: dto.latitude ?? null,
      longitude: dto.longitude ?? null,
      status
    });

    return this.adjustmentsRepo.save(adjustment);
  }
}

