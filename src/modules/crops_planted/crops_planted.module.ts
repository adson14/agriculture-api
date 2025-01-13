import { Module } from '@nestjs/common';
import { CropsPlantedService } from './crops_planted.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropPlanted } from './entities/crops_planted.entity';
import { CropsPlantedController } from './crops_planted.controller';
import { Farm } from '../farm/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CropPlanted, Farm])],
  providers: [CropsPlantedService],
  controllers: [CropsPlantedController],
})
export class CropsPlantedModule {}
