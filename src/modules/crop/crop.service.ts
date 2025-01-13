import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Farm } from '../farm/entities/farm.entity';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async create(createCropDto: CreateCropDto): Promise<Crop> {
    const farm = await this.farmRepository.findOneBy({
      id: createCropDto.farm_id,
    });

    if (!farm) {
      throw new NotFoundException('Produtor inexistente.');
    }

    const crop = this.cropRepository.create({
      ...createCropDto,
      farm,
    });

    return this.cropRepository.save(crop);
  }

  async findAll(): Promise<Crop[]> {
    return this.cropRepository.find({ relations: ['farm'] });
  }

  async findOne(id: number): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id },
      relations: ['farm'],
    });

    if (!crop) {
      throw new NotFoundException(`Safra não encontrada`);
    }

    return crop;
  }

  async update(id: number, updateCropDto: UpdateCropDto): Promise<Crop> {
    const crop = await this.cropRepository.findOneBy({ id });

    if (!crop) {
      throw new NotFoundException(`Safra não encontrada.`);
    }

    const updatedFarm = this.cropRepository.merge(crop, updateCropDto);
    return this.cropRepository.save(updatedFarm);
  }

  async remove(id: number): Promise<DeleteResult> {
    const crop = await this.cropRepository.findOneBy({ id });

    if (!crop) {
      throw new NotFoundException(`Safra não encontrada`);
    }

    return this.cropRepository.delete(id);
  }
}
