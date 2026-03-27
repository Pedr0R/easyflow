import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export type PunchAdjustmentStatus = 'PENDENTE' | 'APROVADO' | 'REJEITADO';

@Entity({ name: 'punch_adjustments' })
export class PunchAdjustmentEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'varchar', length: 128 })
  tenantId!: string;

  @Column({ name: 'user_id', type: 'varchar', length: 128 })
  userId!: string;

  @Column({ name: 'punch_id', type: 'uuid' })
  punchId!: string;

  @Column({ name: 'justificativa', type: 'text' })
  justificativa!: string;

  @Column({ name: 'novo_tipo', type: 'varchar', length: 16, nullable: true })
  novoTipo?: string | null;

  @Column({ name: 'novo_ponto_timestamp', type: 'timestamptz', nullable: true })
  novoPontoTimestamp?: Date | null;

  @Column({ name: 'latitude', type: 'double precision', nullable: true })
  latitude?: number | null;

  @Column({ name: 'longitude', type: 'double precision', nullable: true })
  longitude?: number | null;

  @Column({ name: 'status', type: 'varchar', length: 16, default: 'PENDENTE' })
  status!: PunchAdjustmentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}

