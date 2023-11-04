import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/app/public/user/user.service';
import {
  AuthLoginDTO,
  AuthRegisterDTO,
  AuthTokenDTO,
  AuthTokenPayloadDTO,
} from './auth.dto';
import { User } from '@/app/public/user/user.entity';
import { HashService } from '@/shared/services/hash.service';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { AuthStore } from '@/shared/stores/auth.store';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
    private authStore: ClsService<AuthStore>,
  ) {}

  register(body: AuthRegisterDTO): Promise<User> {
    return this.userService.create(body);
  }

  async login(body: AuthLoginDTO): Promise<AuthTokenDTO> {
    const { email, password } = body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!this.hashService.checkHash(password, user.password)) {
      throw new UnauthorizedException();
    }

    const authTokenPayload: AuthTokenPayloadDTO = {
      id: user.id,
      tenantId: user?.tenant?.id ? user.tenant.id : null,
    };
    const token = await this.jwtService.signAsync(authTokenPayload);

    return { token };
  }

  async getMe(): Promise<User> {
    return this.authStore.get('user');
  }
}
