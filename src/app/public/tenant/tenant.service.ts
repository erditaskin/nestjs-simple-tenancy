import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDTO, UpdateTenantDTO } from './tenant.dto';
import { Tenant } from '@/app/public/tenant/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly repository: Repository<Tenant>,
  ) {}

  public async findOne(id: number): Promise<Tenant> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  public async create(body: CreateTenantDTO): Promise<Tenant> {
    const data = new Tenant();

    data.title = body.title;
    data.createdAt = new Date();

    return await this.repository.save(data);
  }

  public async update(body: UpdateTenantDTO, data: Tenant): Promise<Tenant> {
    data.title = body.title;
    return await this.repository.save(data);
  }

  public async remove(entity: Tenant): Promise<Tenant | any> {
    try {
      // delete all other relations
      return await this.repository.remove(entity);
    } catch {
      throw new HttpException('Entity does not found', 404);
    }
  }
}
