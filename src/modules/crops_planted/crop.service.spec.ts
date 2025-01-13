import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CropPlanted } from './entities/crops_planted.entity';
import { Farm } from '../farm/entities/farm.entity';
import { Repository, DeleteResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CropsPlantedService } from './crops_planted.service';

describe('CropsPlantedService', () => {
  let service: CropsPlantedService;
  let cropPlantedRepository: Repository<CropPlanted>;
  let farmRepository: Repository<Farm>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropsPlantedService,
        {
          provide: getRepositoryToken(CropPlanted),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Farm),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CropsPlantedService>(CropsPlantedService);
    cropPlantedRepository = module.get<Repository<CropPlanted>>(
      getRepositoryToken(CropPlanted),
    );
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a crop planted', async () => {
      const createDto = { name: 'Soja', farm_id: 1 };
      const farmMock = { id: 1, name: 'Farm Test' } as Farm;
      const cropMock = { id: 1, name: 'Soja', farm: farmMock } as CropPlanted;

      jest.spyOn(farmRepository, 'findOneBy').mockResolvedValue(farmMock);
      jest.spyOn(cropPlantedRepository, 'create').mockReturnValue(cropMock);
      jest.spyOn(cropPlantedRepository, 'save').mockResolvedValue(cropMock);

      const result = await service.create(createDto);

      expect(farmRepository.findOneBy).toHaveBeenCalledWith({
        id: createDto.farm_id,
      });
      expect(cropPlantedRepository.create).toHaveBeenCalledWith({
        ...createDto,
        farm: farmMock,
      });
      expect(cropPlantedRepository.save).toHaveBeenCalledWith(cropMock);
      expect(result).toEqual(cropMock);
    });

    it('should throw NotFoundException if farm is not found', async () => {
      const createDto = { name: 'Soja', farm_id: 1 };

      jest.spyOn(farmRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(farmRepository.findOneBy).toHaveBeenCalledWith({
        id: createDto.farm_id,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of crops planted', async () => {
      const cropsMock = [{ id: 1, name: 'Soja', farm: {} }] as CropPlanted[];

      jest.spyOn(cropPlantedRepository, 'find').mockResolvedValue(cropsMock);

      const result = await service.findAll();

      expect(cropPlantedRepository.find).toHaveBeenCalledWith({
        relations: ['farm'],
      });
      expect(result).toEqual(cropsMock);
    });
  });

  describe('findOne', () => {
    it('should return a crop planted', async () => {
      const cropMock = { id: 1, name: 'Soja', farm: {} } as CropPlanted;

      jest.spyOn(cropPlantedRepository, 'findOne').mockResolvedValue(cropMock);

      const result = await service.findOne(1);

      expect(cropPlantedRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['farm'],
      });
      expect(result).toEqual(cropMock);
    });

    it('should throw NotFoundException if crop planted is not found', async () => {
      jest.spyOn(cropPlantedRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(cropPlantedRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['farm'],
      });
    });
  });

  describe('update', () => {
    it('should update a crop planted', async () => {
      const cropMock = { id: 1, name: 'Soja', farm: {} } as CropPlanted;
      const updateDto = { name: 'Milho' };

      jest
        .spyOn(cropPlantedRepository, 'findOneBy')
        .mockResolvedValue(cropMock);
      jest
        .spyOn(cropPlantedRepository, 'merge')
        .mockReturnValue({ ...cropMock, ...updateDto });
      jest
        .spyOn(cropPlantedRepository, 'save')
        .mockResolvedValue({ ...cropMock, ...updateDto });

      const result = await service.update(1, updateDto);

      expect(cropPlantedRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(cropPlantedRepository.merge).toHaveBeenCalledWith(
        cropMock,
        updateDto,
      );
      expect(cropPlantedRepository.save).toHaveBeenCalledWith({
        ...cropMock,
        ...updateDto,
      });
      expect(result).toEqual({ ...cropMock, ...updateDto });
    });

    it('should throw NotFoundException if crop planted is not found', async () => {
      const updateDto = { name: 'Milho' };

      jest.spyOn(cropPlantedRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(cropPlantedRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a crop planted', async () => {
      const deleteResult = { affected: 1 } as DeleteResult;

      jest
        .spyOn(cropPlantedRepository, 'findOneBy')
        .mockResolvedValue({ id: 1 } as CropPlanted);
      jest
        .spyOn(cropPlantedRepository, 'delete')
        .mockResolvedValue(deleteResult);

      const result = await service.remove(1);

      expect(cropPlantedRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(cropPlantedRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });

    it('should throw NotFoundException if crop planted is not found', async () => {
      jest.spyOn(cropPlantedRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(cropPlantedRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });
});
