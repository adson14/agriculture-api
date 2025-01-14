import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  applyDecorators,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmSwaggerDocs } from 'src/config/swagger/farm-docs';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @applyDecorators(...FarmSwaggerDocs.create)
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmService.create(createFarmDto);
  }

  @Get()
  @applyDecorators(...FarmSwaggerDocs.findAll)
  findAll() {
    return this.farmService.findAll();
  }

  @Get(':id')
  @applyDecorators(...FarmSwaggerDocs.findOne)
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(+id);
  }

  @Patch(':id')
  @applyDecorators(...FarmSwaggerDocs.update)
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  @applyDecorators(...FarmSwaggerDocs.delete)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.farmService.remove(+id);
  }
}
