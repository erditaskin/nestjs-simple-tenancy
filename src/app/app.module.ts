import { Module } from '@nestjs/common';
import { TenantedModule } from './tenanted/tenanted.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [TenantedModule, PublicModule],
})
export class AppModule {}
