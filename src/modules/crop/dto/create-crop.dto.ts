import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty({ message: 'A safra deve ser informada' })
  @IsNumber()
  year: string;

  @IsNotEmpty({ message: 'A safra deve ter uma propriedade associada' })
  @IsNumber()
  farm_id: number;
}
