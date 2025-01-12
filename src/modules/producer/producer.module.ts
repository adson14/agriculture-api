import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
