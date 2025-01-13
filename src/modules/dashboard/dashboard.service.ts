import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../farm/entities/farm.entity';
import { CropPlanted } from '../crops_planted/entities/crops_planted.entity';
import { CropCulture } from '../../entity/cropCulture.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,

    // @InjectRepository(CropPlanted)
    // private readonly cropPlantedRepository: Repository<CropPlanted>,

    @InjectRepository(CropCulture)
    private readonly cropCultureRepository: Repository<CropCulture>,
  ) {}

  async getDashboardData() {
    // Total de fazendas cadastradas
    const totalFarms = await this.farmRepository.count();

    // Total de hectares registrados
    const totalHectares = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.total_area)', 'totalHectares')
      .getRawOne();

    // Gráfico por estado
    const farmsByState = await this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(farm.id)', 'count')
      .groupBy('farm.state')
      .getRawMany();

    // Gráfico por cultura plantada
    const culturesByCrop = await this.cropCultureRepository
      .createQueryBuilder('cropCulture')
      .innerJoinAndSelect('cropCulture.cropPlanted', 'cropPlanted')
      .select('cropPlanted.name', 'culture')
      .addSelect('COUNT(cropCulture.id)', 'count')
      .groupBy('cropPlanted.name')
      .getRawMany();

    // Gráfico por uso do solo
    const landUsage = await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.farming_area)', 'farmingArea')
      .addSelect('SUM(farm.vegetation_area)', 'vegetationArea')
      .getRawOne();

    return {
      totalFarms,
      totalHectares: parseFloat(totalHectares.totalHectares || '0'),
      farmsByState,
      culturesByCrop,
      landUsage: {
        farmingArea: parseFloat(landUsage.farmingArea || '0'),
        vegetationArea: parseFloat(landUsage.vegetationArea || '0'),
      },
    };
  }
}
