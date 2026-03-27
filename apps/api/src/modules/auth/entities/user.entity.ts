import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique('uq_users_tenant_email', ['tenantId', 'email'])
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'varchar', length: 128 })
  tenantId!: string;

  @Column({ name: 'nome', type: 'varchar', length: 150 })
  nome!: string;

  @Column({ name: 'email', type: 'varchar', length: 200 })
  email!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ name: 'role', type: 'varchar', length: 50, default: 'COLABORADOR' })
  role!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}

