import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [AuthModule, UserModule, TenantModule],
})
export class PublicModule {}
