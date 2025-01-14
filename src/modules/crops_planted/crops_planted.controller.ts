import {
  applyDecorators,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CropsPlantedService } from './crops_planted.service';
import { CreateCropPlantedDto } from './dto/create-crop-planted.dto';
import { UpdateCropPlantedDto } from './dto/update-crop-planted.dto';
import { CropPlantedSwaggerDocs } from 'src/config/swagger/crop-planted-docs';

@Controller('crops-planted')
export class CropsPlantedController {
  constructor(private readonly plantedService: CropsPlantedService) {}

  @Post()
  @applyDecorators(...CropPlantedSwaggerDocs.create)
  create(@Body() createCropPlantedDto: CreateCropPlantedDto) {
    return this.plantedService.create(createCropPlantedDto);
  }

  @Get()
  @applyDecorators(...CropPlantedSwaggerDocs.findAll)
  findAll() {
    return this.plantedService.findAll();
  }

  @Get(':id')
  @applyDecorators(...CropPlantedSwaggerDocs.findOne)
  findOne(@Param('id') id: string) {
    return this.plantedService.findOne(+id);
  }

  @Patch(':id')
  @applyDecorators(...CropPlantedSwaggerDocs.update)
  update(
    @Param('id') id: string,
    @Body() updateCropPlantedDto: UpdateCropPlantedDto,
  ) {
    return this.plantedService.update(+id, updateCropPlantedDto);
  }

  @Delete(':id')
  @applyDecorators(...CropPlantedSwaggerDocs.delete)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.plantedService.remove(+id);
  }
}
