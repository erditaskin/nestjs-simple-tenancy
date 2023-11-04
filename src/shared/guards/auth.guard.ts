import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthTokenPayloadDTO } from '@/app/public/auth/auth.dto';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { Reflector } from '@nestjs/core';
import { AUTH_METADATA_KEY } from '@/shared/decorators/auth.decorator';
import { UserService } from '@/app/public/user/user.service';
import { AuthStore } from '../stores/auth.store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private authStore: ClsService<AuthStore>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuth = this.reflector.getAllAndOverride<boolean>(
      AUTH_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isAuth) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: AuthTokenPayloadDTO = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('AUTH_SECRET'),
        },
      );
      const user = await this.userService.findOne(payload.id);

      if (!user) {
        throw new UnauthorizedException();
      }

      this.authStore.set('user', user);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
