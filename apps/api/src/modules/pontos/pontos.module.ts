import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PunchAdjustmentEntity } from './entities/punch-adjustment.entity';
import { PunchEntity } from './entities/punch.entity';
import { PontosController } from './pontos.controller';
import { PontosService } from './pontos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PunchEntity, PunchAdjustmentEntity])],
  controllers: [PontosController],
  providers: [PontosService]
})
export class PontosModule {}

