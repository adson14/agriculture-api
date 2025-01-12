import { Injectable } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private producersRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const newProducer =
      await this.producersRepository.create(createProducerDto);
    return this.producersRepository.save(newProducer);
  }

  async findAll(): Promise<Producer[]> {
    return await this.producersRepository.find();
  }
}
