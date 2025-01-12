import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { faker } from '@faker-js/faker';

describe('ProducerService', () => {
  let service: ProducerService;
  let repository: Repository<Producer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: getRepositoryToken(Producer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    repository = module.get<Repository<Producer>>(getRepositoryToken(Producer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new producer', async () => {
      const createProducerDto = {
        name: 'José da Silva',
        doc_type: 'CPF',
        document: '12345678901',
      };

      const savedProducer = {
        id: 1,
        ...createProducerDto,
      };

      jest
        .spyOn(repository, 'create')
        .mockReturnValue(savedProducer as Producer);

      jest.spyOn(repository, 'save').mockResolvedValue(savedProducer);

      const result = await service.create(createProducerDto);

      expect(result).toEqual(savedProducer);

      expect(repository.create).toHaveBeenCalledWith(createProducerDto);

      expect(repository.save).toHaveBeenCalledWith(savedProducer);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const mockProducers = Array.from({ length: 5 }).map(() => {
        const docType = faker.helpers.arrayElement(['CPF', 'CNPJ']);
        const document =
          docType === 'CPF'
            ? faker.string.numeric(11)
            : faker.string.numeric(14);

        return {
          id: faker.number.int(),
          name: faker.person.fullName(),
          doc_type: docType,
          document,
        };
      });
      jest.spyOn(repository, 'find').mockResolvedValue(mockProducers);

      const result = await service.findAll();

      expect(result).toEqual(mockProducers);

      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return producer', async () => {
      const mockProducer = {
        id: faker.number.int(),
        name: faker.person.fullName(),
        doc_type: 'CPF',
        document: '12345678901',
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockProducer);

      const result = await service.findOne(mockProducer.id);

      expect(result).toEqual(mockProducer);

      expect(repository.findOneBy).toHaveBeenCalled();
    });
  });
});
