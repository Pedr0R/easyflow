import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export type PunchTipo = 'ENTRADA' | 'SAIDA';

@Entity({ name: 'punches' })
export class PunchEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'varchar', length: 128 })
  tenantId!: string;

  @Column({ name: 'user_id', type: 'varchar', length: 128 })
  userId!: string;

  @Column({ name: 'tipo', type: 'varchar', length: 16 })
  tipo!: PunchTipo;

  @Column({ name: 'ponto_timestamp', type: 'timestamptz' })
  pontoTimestamp!: Date;

  @Column({ name: 'latitude', type: 'double precision' })
  latitude!: number;

  @Column({ name: 'longitude', type: 'double precision' })
  longitude!: number;

  @Column({ name: 'observacao', type: 'text', nullable: true })
  observacao?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}

