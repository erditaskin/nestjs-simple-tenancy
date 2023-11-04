import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './shared/config/database/typeorm.config';
import { AppModule } from '@/app/app.module';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    // Nosql DB Connection
    //MongooseModule.forRootAsync({
    //  imports: [ConfigModule],
    //  useClass: MongodbConfigService,
    //}),
    // Relational DB Connection
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    AppModule,
    SharedModule,
  ],
  // Roles should be accessible everywhere.
  providers: [],
})
export class CoreModule {}
