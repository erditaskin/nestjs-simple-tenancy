import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Locale } from '@/shared/enums/locale.enum';
import { Company } from '@/app/tenanted/company/company.entity';

@Entity('users')
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToMany(() => User, (user: User) => user.tenant)
  public users: User[];

  @OneToMany(() => Company, (company: Company) => company.tenant)
  public companies: Company[];

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
