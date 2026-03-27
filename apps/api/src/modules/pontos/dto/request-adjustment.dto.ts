import { IsDateString, IsIn, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { PunchTipo } from '../entities/punch.entity';

export class RequestAdjustmentDto {
  @IsString()
  justificativa!: string;

  @IsOptional()
  @IsIn(['ENTRADA', 'SAIDA'])
  novoTipo?: PunchTipo;

  @IsOptional()
  @IsDateString()
  novoTimestamp?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;
}

