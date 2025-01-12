import { Test, TestingModule } from '@nestjs/testing';
import { FarmService } from './farm.service';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { Producer } from '../producer/entities/producer.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateFarmDto } from './dto/update-farm.dto';

describe('FarmService', () => {
  let service: FarmService;
  let farmRepository: Repository<Farm>;
  let producerRepository: Repository<Producer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        {
          provide: getRepositoryToken(Farm),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Producer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
    producerRepository = module.get<Repository<Producer>>(
      getRepositoryToken(Producer),
    );
  });

  describe('create', () => {
    it('should create a farm and associate it with a producer', async () => {
      const producerMock = {
        id: 1,
        name: 'Producer Test',
        document: '12345678909',
        doc_type: 'CPF',
      } as Producer;

      const farmMock = {
        id: 1,
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
        producer: producerMock,
      } as Farm;

      const createFarmDto: CreateFarmDto = {
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
        producer_id: 1,
      };

      jest
        .spyOn(producerRepository, 'findOneBy')
        .mockResolvedValue(producerMock);
      jest.spyOn(farmRepository, 'create').mockReturnValue(farmMock);
      jest.spyOn(farmRepository, 'save').mockResolvedValue(farmMock);

      const result = await service.create(createFarmDto);

      expect(producerRepository.findOneBy).toHaveBeenCalledWith({
        id: createFarmDto.producer_id,
      });
      expect(farmRepository.create).toHaveBeenCalledWith({
        ...createFarmDto,
        producer: producerMock,
      });
      expect(farmRepository.save).toHaveBeenCalledWith(farmMock);
      expect(result).toEqual(farmMock);
    });

    it('should throw NotFoundException if producer does not exist', async () => {
      const createFarmDto: CreateFarmDto = {
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
        producer_id: 9999,
      };

      jest.spyOn(producerRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.create(createFarmDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(producerRepository.findOneBy).toHaveBeenCalledWith({
        id: createFarmDto.producer_id,
      });
    });
  });

  describe('findAll', () => {
    it('should return all farms with their producers', async () => {
      const producerMock = {
        id: 1,
        name: 'Producer Test',
        document: '12345678909',
        doc_type: 'CPF',
      } as Producer;

      const farmMock = [
        {
          id: 1,
          name: 'Farm Test 1',
          city: 'City Test',
          state: 'State Test',
          total_area: 100,
          farming_area: 60,
          vegetation_area: 40,
          producer: producerMock,
        },
        {
          id: 2,
          name: 'Farm Test 2',
          city: 'City Test',
          state: 'State Test',
          total_area: 200,
          farming_area: 120,
          vegetation_area: 80,
          producer: producerMock,
        },
      ] as Farm[];

      jest.spyOn(farmRepository, 'find').mockResolvedValue(farmMock);

      const result = await service.findAll();

      expect(farmRepository.find).toHaveBeenCalledWith({
        relations: ['producer'],
      });
      expect(result).toEqual(farmMock);
    });
  });

  describe('findOne', () => {
    it('should return a farm with its producer', async () => {
      const producerMock = {
        id: 1,
        name: 'Producer Test',
        document: '12345678909',
        doc_type: 'CPF',
      } as Producer;

      const farmMock = {
        id: 1,
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
        producer: producerMock,
      } as Farm;

      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(farmMock);

      const result = await service.findOne(1);

      expect(farmRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['producer'],
      });
      expect(result).toEqual(farmMock);
    });

    it('should throw NotFoundException if farm is not found', async () => {
      jest.spyOn(farmRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(farmRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['producer'],
      });
    });
  });

  describe('update', () => {
    it('should update a farm and return the updated farm', async () => {
      const farmMock = {
        id: 1,
        name: 'Farm Test',
        city: 'City Test',
        state: 'State Test',
        total_area: 100,
        farming_area: 60,
        vegetation_area: 40,
      } as Farm;

      const updateFarmDto: UpdateFarmDto = {
        name: 'Updated Farm',
        total_area: 120,
      };

      const updatedFarmMock = {
        ...farmMock,
        ...updateFarmDto,
      };

      jest.spyOn(farmRepository, 'findOneBy').mockResolvedValue(farmMock);
      jest.spyOn(farmRepository, 'merge').mockReturnValue(updatedFarmMock);
      jest.spyOn(farmRepository, 'save').mockResolvedValue(updatedFarmMock);

      const result = await service.update(1, updateFarmDto);

      expect(farmRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(farmRepository.merge).toHaveBeenCalledWith(
        farmMock,
        updateFarmDto,
      );
      expect(farmRepository.save).toHaveBeenCalledWith(updatedFarmMock);
      expect(result).toEqual(updatedFarmMock);
    });

    it('should throw NotFoundException if farm is not found', async () => {
      const updateFarmDto: UpdateFarmDto = {
        name: 'Updated Farm',
        total_area: 120,
      };

      jest.spyOn(farmRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update(999, updateFarmDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(farmRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('remove', () => {
    it('should delete a farm and return the result', async () => {
      const deleteResult = { affected: 1 } as DeleteResult;

      jest
        .spyOn(farmRepository, 'findOneBy')
        .mockResolvedValue({ id: 1 } as Farm);
      jest.spyOn(farmRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await service.remove(1);

      expect(farmRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(farmRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });

    it('should throw NotFoundException if farm is not found', async () => {
      jest.spyOn(farmRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);

      expect(farmRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });
});
