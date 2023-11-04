import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateProfileDTO } from './user.dto';
import { User } from '@/app/public/user/user.entity';
import { HashService } from '@/shared/services/hash.service';
import { Nullable } from '@/shared/types/nullable.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private hashService: HashService,
  ) {}

  public async findOne(id: number): Promise<User> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Nullable<User>> {
    return this.repository.findOneBy({ email });
  }

  public async update(body: UpdateProfileDTO, data: User): Promise<User> {
    data.phone = body.phone;
    data.country = body.country;
    data.city = body.city;
    data.address = body.address;
    return await this.repository.save(data);
  }

  create(body: CreateUserDTO): Promise<User> {
    const { password, ...userData } = body;
    const passwordHash = this.hashService.createHash(password);
    const customerEntity = this.repository.create({
      ...userData,
      password: passwordHash,
    });

    return this.repository.save(customerEntity);
  }
}
