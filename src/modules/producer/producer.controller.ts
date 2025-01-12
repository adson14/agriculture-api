import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }
}
