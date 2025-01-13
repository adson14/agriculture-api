import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { Farm } from '../farm/entities/farm.entity';
import { CropPlanted } from '../crops_planted/entities/crops_planted.entity';
import { CropCulture } from '../../entity/cropCulture.entity';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(CropPlanted)
    private readonly cropPlantedRepository: Repository<CropPlanted>,
    @InjectRepository(CropCulture)
    private readonly cropCultureRepository: Repository<CropCulture>,
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

  async addCulturesToCrop(cropId: number, cultureIds: number[]): Promise<void> {
    const crop = await this.cropRepository.findOneBy({ id: cropId });

    if (!crop) {
      throw new NotFoundException(`Safra com ID ${cropId} não encontrada`);
    }

    const validCultures = await this.cropPlantedRepository.find({
      where: { id: In(cultureIds) },
    });

    const validCultureIds = validCultures.map((culture) => culture.id);

    const invalidCultureIds = cultureIds.filter(
      (cultureId) => !validCultureIds.includes(cultureId),
    );

    if (invalidCultureIds.length > 0) {
      throw new BadRequestException(
        `As seguintes culturas não existem: ${invalidCultureIds.join(', ')}`,
      );
    }

    const existingRelations = await this.cropCultureRepository.find({
      where: {
        crop: { id: cropId },
        cropPlanted: { id: In(cultureIds) },
      },
    });

    const existingCultureIds = existingRelations.map(
      (relation) => relation.cropPlanted?.id,
    );

    const newRelations = cultureIds
      .filter((cultureId) => !existingCultureIds.includes(cultureId))
      .map((cultureId) => ({
        crop,
        cropPlanted: { id: cultureId },
      }));

    if (newRelations.length === 0) {
      throw new BadRequestException(
        'Todas as culturas já estão associadas a essa safra',
      );
    }

    try {
      await this.cropCultureRepository.save(newRelations);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'Uma ou mais culturas já estão associadas a essa safra.',
        );
      }
      throw error;
    }
  }

  async getCulturesByCrop(cropId: number): Promise<CropPlanted[]> {
    const crop = await this.cropRepository.findOne({
      where: { id: cropId },
      relations: ['cropCultures', 'cropCultures.cropPlanted'],
    });

    if (!crop) {
      throw new NotFoundException(`Safra com ID ${cropId} não encontrada`);
    }

    return crop.cropCultures.map((relation) => relation.cropPlanted);
  }

  async removeCultureFromCrop(
    cropId: number,
    cultureId: number,
  ): Promise<void> {
    const cropCulture = await this.cropCultureRepository.findOne({
      where: { crop: { id: cropId }, cropPlanted: { id: cultureId } },
    });

    if (!cropCulture) {
      throw new NotFoundException(
        `Relacionamento entre Safra ${cropId} e Cultura ${cultureId} não encontrado`,
      );
    }

    await this.cropCultureRepository.delete(cropCulture.id);
  }
}
