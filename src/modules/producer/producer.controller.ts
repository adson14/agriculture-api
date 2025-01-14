import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  applyDecorators,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducerSwaggerDocs } from 'src/config/swagger/producer-docs';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @applyDecorators(...ProducerSwaggerDocs.create)
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Get()
  @applyDecorators(...ProducerSwaggerDocs.findAll)
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  @applyDecorators(...ProducerSwaggerDocs.findOne)
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(+id);
  }

  @Patch(':id')
  @applyDecorators(...ProducerSwaggerDocs.update)
  update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producerService.update(+id, updateProducerDto);
  }

  @Delete(':id')
  @applyDecorators(...ProducerSwaggerDocs.delete)
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.producerService.remove(+id);
  }
}
