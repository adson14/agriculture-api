import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Farm } from '../farm/entities/farm.entity';
import { CropCulture } from '../../entity/cropCulture.entity';
import { CropPlanted } from '../crops_planted/entities/crops_planted.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Farm, CropCulture, CropPlanted])],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
