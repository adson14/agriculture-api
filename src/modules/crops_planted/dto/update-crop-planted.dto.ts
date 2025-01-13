import { PartialType } from '@nestjs/mapped-types';
import { CreateCropPlantedDto } from './create-crop-planted.dto';

export class UpdateCropPlantedDto extends PartialType(CreateCropPlantedDto) {
  id?: number | never;
}
