import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserRole } from '@/shared/enums/role.enum';
import { Tenant } from '../tenant/tenant.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Tenant, (tenant: Tenant) => tenant.users)
  public tenant: Tenant;

  @Column({ type: 'varchar' })
  public fullname: string;

  @Column({ type: 'varchar', unique: true, nullable: true, default: null })
  public username: string;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  public phone: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  public country: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  public city: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  public address: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  public role: UserRole;

  @Column({ type: 'boolean', nullable: true, default: true })
  public isActive: boolean;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  public updatedAt: Date | null;
}
