import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCropPlantedDto {
  @IsNotEmpty({ message: 'Nome da cultura plantada não pode ser vazio' })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'A cultura plantada deve ter uma propriedade associada',
  })
  @IsNumber()
  farm_id: number;
}
