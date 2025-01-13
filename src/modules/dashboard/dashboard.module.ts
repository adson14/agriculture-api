import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropCulture } from 'src/entity/cropCulture.entity';
import { Farm } from '../farm/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, CropCulture])],

  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
