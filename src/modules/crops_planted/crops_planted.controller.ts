import {
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

@Controller('crops-planted')
export class CropsPlantedController {
  constructor(private readonly plantedService: CropsPlantedService) {}

  @Post()
  create(@Body() createCropPlantedDto: CreateCropPlantedDto) {
    return this.plantedService.create(createCropPlantedDto);
  }

  @Get()
  findAll() {
    return this.plantedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCropPlantedDto: UpdateCropPlantedDto,
  ) {
    return this.plantedService.update(+id, updateCropPlantedDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.plantedService.remove(+id);
  }
}
