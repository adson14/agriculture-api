import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Farm } from '../farm/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Farm])],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
