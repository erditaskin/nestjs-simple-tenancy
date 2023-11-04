import { Global, Module } from '@nestjs/common';
import { HashService } from './services/hash.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [HashService],
  exports: [HashService],
})
@Global()
export class SharedModule {}
