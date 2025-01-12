import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Producer } from '../producer/entities/producer.entity';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    const producer = await this.producerRepository.findOneBy({
      id: createFarmDto.producer_id,
    });

    if (!producer) {
      throw new NotFoundException('Produtor inexistente.');
    }

    const farm = this.farmRepository.create({
      ...createFarmDto,
      producer,
    });

    return this.farmRepository.save(farm);
  }

  async findAll(): Promise<Farm[]> {
    return this.farmRepository.find({ relations: ['producer'] });
  }

  async findOne(id: number): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: ['producer'],
    });

    if (!farm) {
      throw new NotFoundException(`Propriedade não encontrada`);
    }

    return farm;
  }

  async update(id: number, updateFarmDto: UpdateFarmDto): Promise<Farm> {
    const farm = await this.farmRepository.findOneBy({ id });

    if (!farm) {
      throw new NotFoundException(`Propriedade não encontrada.`);
    }

    const updatedFarm = this.farmRepository.merge(farm, updateFarmDto);
    return this.farmRepository.save(updatedFarm);
  }

  async remove(id: number): Promise<DeleteResult> {
    const farm = await this.farmRepository.findOneBy({ id });

    if (!farm) {
      throw new NotFoundException(`Propriedade não encontrada`);
    }

    return this.farmRepository.delete(id);
  }
}
