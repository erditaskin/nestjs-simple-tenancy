import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Tenant } from '@/app/public/tenant/tenant.entity';
import { Locale } from '@/shared/enums/locale.enum';

@Entity('users')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Tenant, (tenant: Tenant) => tenant.companies)
  public tenant: Tenant;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'enum', enum: Locale, default: Locale.TR })
  public locale: Locale;

  @Column({ type: 'boolean', nullable: true, default: true })
  public isActive: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  public updatedAt: Date | null;
}
