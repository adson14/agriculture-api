import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerModule } from './modules/producer/producer.module';
import { ConfigModule } from '@nestjs/config';
import { FarmModule } from './modules/farm/farm.module';
import { CropModule } from './modules/crop/crop.module';
import { CropsPlantedModule } from './modules/crops_planted/crops_planted.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProducerModule,
    FarmModule,
    CropModule,
    CropsPlantedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
