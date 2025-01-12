import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { Producer } from '../producer/entities/producer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Producer])],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
