import { Test, TestingModule } from '@nestjs/testing';
import { CropService } from './crop.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { Farm } from '../farm/entities/farm.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CropPlanted } from '../crops_planted/entities/crops_planted.entity';
import { CropCulture } from '../../entity/cropCulture.entity';

describe('CropService', () => {
  let service: CropService;
  let cropRepository: Repository<Crop>;
  let farmRepository: Repository<Farm>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: getRepositoryToken(Crop),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Farm),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CropPlanted),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CropCulture),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CropService>(CropService);
    cropRepository = module.get<Repository<Crop>>(getRepositoryToken(Crop));
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a crop and associate it with a farm', async () => {
      const farmMock = {
        id: 1,
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
      } as Farm;

      const cropMock = {
        id: 1,
        year: '2021',
        farm: farmMock,
      } as Crop;

      const createCropDto: CreateCropDto = {
        year: '2021',
        farm_id: 1,
      };

      jest.spyOn(farmRepository, 'findOneBy').mockResolvedValue(farmMock);
      jest.spyOn(cropRepository, 'create').mockReturnValue(cropMock);
      jest.spyOn(cropRepository, 'save').mockResolvedValue(cropMock);

      const result = await service.create(createCropDto);

      expect(farmRepository.findOneBy).toHaveBeenCalledWith({
        id: createCropDto.farm_id,
      });
      expect(cropRepository.create).toHaveBeenCalledWith({
        ...createCropDto,
        farm: farmMock,
      });
      expect(cropRepository.save).toHaveBeenCalledWith(cropMock);
      expect(result).toEqual(cropMock);
    });

    it('should throw NotFoundException if farm does not exist', async () => {
      const createCropDto: CreateCropDto = {
        year: '2021',
        farm_id: 1,
      };

      jest.spyOn(farmRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.create(createCropDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(farmRepository.findOneBy).toHaveBeenCalledWith({
        id: createCropDto.farm_id,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of crops with their farms', async () => {
      const farmMock = {
        id: 1,
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
      } as Farm;

      const cropsMock = [
        {
          id: 1,
          year: '2021',
          farm: farmMock,
        },
        {
          id: 2,
          year: '2022',
          farm: farmMock,
        },
      ] as Crop[];

      jest.spyOn(cropRepository, 'find').mockResolvedValue(cropsMock);

      const result = await service.findAll();

      expect(cropRepository.find).toHaveBeenCalledWith({
        relations: ['farm'],
      });
      expect(result).toEqual(cropsMock);
    });
  });

  describe('findOne', () => {
    it('should return a crop with its farm', async () => {
      const farmMock = {
        id: 1,
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
      } as Farm;

      const cropMock = {
        id: 1,
        year: '2021',
        farm: farmMock,
      } as Crop;

      jest.spyOn(cropRepository, 'findOne').mockResolvedValue(cropMock);

      const result = await service.findOne(1);

      expect(cropRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['farm'],
      });
      expect(result).toEqual(cropMock);
    });

    it('should throw NotFoundException if crop is not found', async () => {
      jest.spyOn(cropRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);

      expect(cropRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['farm'],
      });
    });
  });

  describe('update', () => {
    it('should update a crop and return the updated crop', async () => {
      const farmMock = {
        id: 1,
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
      } as Farm;

      const cropMock = {
        id: 1,
        year: '2021',
        farm: farmMock,
      } as Crop;

      const updateCropDto: UpdateCropDto = {
        year: '2022',
      };

      const updatedCropMock = {
        ...cropMock,
        ...updateCropDto,
      };

      jest.spyOn(cropRepository, 'findOneBy').mockResolvedValue(cropMock);
      jest.spyOn(cropRepository, 'merge').mockReturnValue(updatedCropMock);
      jest.spyOn(cropRepository, 'save').mockResolvedValue(updatedCropMock);

      const result = await service.update(cropMock.id, updateCropDto);

      expect(cropRepository.findOneBy).toHaveBeenCalledWith({
        id: cropMock.id,
      });
      expect(cropRepository.merge).toHaveBeenCalledWith(
        cropMock,
        updateCropDto,
      );
      expect(cropRepository.save).toHaveBeenCalledWith(updatedCropMock);
      expect(result).toEqual(updatedCropMock);
    });

    it('should throw NotFoundException if crop is not found', async () => {
      const updateCropDto: UpdateCropDto = {
        year: '2022',
      };

      jest.spyOn(cropRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update(999, updateCropDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(cropRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a crop and return the result', async () => {
      const deleteResult = { affected: 1 } as DeleteResult;

      jest
        .spyOn(cropRepository, 'findOneBy')
        .mockResolvedValue({ id: 1 } as Crop);

      jest.spyOn(cropRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.remove(1);

      expect(cropRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });

      expect(cropRepository.delete).toHaveBeenCalledWith(1);

      expect(result).toEqual(deleteResult);
    });

    it('should throw NotFoundException if crop is not found', async () => {
      jest.spyOn(cropRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);

      expect(cropRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });
});
