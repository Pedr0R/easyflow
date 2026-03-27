import { IsDateString, IsIn, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { PunchTipo } from '../entities/punch.entity';

export class CreatePunchDto {
  @IsIn(['ENTRADA', 'SAIDA'])
  tipo!: PunchTipo;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;

  // timestamp do ponto; útil para modo offline/sincronização
  @IsOptional()
  @IsDateString()
  timestamp?: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}

