import { Module } from '@nestjs/common';
import { UserModule } from '@/app/public/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '@/shared/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { ClsService } from 'nestjs-cls';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET_KEY'),
        global: true,
        signOptions: {
          expiresIn: configService.get('AUTH_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule,
  ],
  providers: [
    ClsService,
    UserService,
    AuthService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
