import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropService.create(createCropDto);
  }

  @Post(':cropId/cultures')
  async addCulturesToCrop(
    @Param('cropId') cropId: number,
    @Body('culture_ids') cultureIds: number[],
  ) {
    await this.cropService.addCulturesToCrop(cropId, cultureIds);
    return { message: 'Culturas associadas com sucesso' };
  }

  @Get()
  findAll() {
    return this.cropService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropService.findOne(+id);
  }

  @Get(':cropId/cultures')
  async getCulturesByCrop(@Param('cropId') cropId: number) {
    return await this.cropService.getCulturesByCrop(cropId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropService.update(+id, updateCropDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.cropService.remove(+id);
  }

  @Delete(':cropId/cultures/:cultureId')
  async removeCultureFromCrop(
    @Param('cropId') cropId: number,
    @Param('cultureId') cultureId: number,
  ) {
    await this.cropService.removeCultureFromCrop(cropId, cultureId);
    return { message: 'Cultura desassociada com sucesso' };
  }
}
