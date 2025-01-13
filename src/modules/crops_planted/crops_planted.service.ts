import { Injectable, NotFoundException } from '@nestjs/common';
import { CropPlanted } from './entities/crops_planted.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCropPlantedDto } from './dto/create-crop-planted.dto';
import { Farm } from '../farm/entities/farm.entity';
import { UpdateCropPlantedDto } from './dto/update-crop-planted.dto';

@Injectable()
export class CropsPlantedService {
  constructor(
    @InjectRepository(CropPlanted)
    private readonly cropPlantedRepository: Repository<CropPlanted>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async create(
    createCropPlantedDto: CreateCropPlantedDto,
  ): Promise<CropPlanted> {
    const farm = await this.farmRepository.findOneBy({
      id: createCropPlantedDto.farm_id,
    });

    if (!farm) {
      throw new NotFoundException('Produtor inexistente.');
    }

    const crop = this.cropPlantedRepository.create({
      ...createCropPlantedDto,
      farm,
    });

    return this.cropPlantedRepository.save(crop);
  }

  async findAll(): Promise<CropPlanted[]> {
    return this.cropPlantedRepository.find({ relations: ['farm'] });
  }

  async findOne(id: number): Promise<CropPlanted> {
    const cropPlanted = await this.cropPlantedRepository.findOne({
      where: { id },
      relations: ['farm'],
    });

    if (!cropPlanted) {
      throw new NotFoundException(`Cultura plantada não encontrada`);
    }

    return cropPlanted;
  }

  async update(
    id: number,
    updateCropPlantedDto: UpdateCropPlantedDto,
  ): Promise<CropPlanted> {
    const cropPlanted = await this.cropPlantedRepository.findOneBy({ id });

    if (!cropPlanted) {
      throw new NotFoundException(`Cultura plantada não encontrada.`);
    }

    const updatedCroptPlanted = this.cropPlantedRepository.merge(
      cropPlanted,
      updateCropPlantedDto,
    );
    return this.cropPlantedRepository.save(updatedCroptPlanted);
  }

  async remove(id: number): Promise<DeleteResult> {
    const cropPlanted = await this.cropPlantedRepository.findOneBy({ id });

    if (!cropPlanted) {
      throw new NotFoundException(`Cuiltura plantada não encontrada`);
    }

    return this.cropPlantedRepository.delete(id);
  }
}
