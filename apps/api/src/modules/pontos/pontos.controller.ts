import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreatePunchDto } from './dto/create-punch.dto';
import { PontosService } from './pontos.service';
import { RequestAdjustmentDto } from './dto/request-adjustment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pontos')
export class PontosController {
  constructor(private readonly pontosService: PontosService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreatePunchDto) {
    return this.pontosService.create(req.tenant!, body);
  }

  @Get('today')
  listToday(@Req() req: Request) {
    return this.pontosService.listToday(req.tenant!);
  }

  @Get()
  list(
    @Req() req: Request,
    @Query('mes') mes?: string,
    @Query('from') from?: string,
    @Query('to') to?: string
  ) {
    return this.pontosService.list(req.tenant!, { mes, from, to });
  }

  @Post(':punchId/ajustes')
  requestAdjustment(
    @Req() req: Request,
    @Param('punchId') punchId: string,
    @Body() body: RequestAdjustmentDto
  ) {
    return this.pontosService.requestAdjustment(req.tenant!, punchId, body);
  }
}

