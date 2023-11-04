import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDTO, UpdateCompanyDTO } from './company.dto';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  public async findOne(id: number): Promise<Company> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  public async create(body: CreateCompanyDTO): Promise<Company> {
    const data = new Company();

    data.title = body.title;
    data.createdAt = new Date();

    return await this.repository.save(data);
  }

  public async update(body: UpdateCompanyDTO, data: Company): Promise<Company> {
    data.title = body.title;
    return await this.repository.save(data);
  }

  public async remove(entity: Company): Promise<Company | any> {
    try {
      // delete all other relations
      return await this.repository.remove(entity);
    } catch {
      throw new HttpException('Entity does not found', 404);
    }
  }
}
