import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty({ message: 'A safra deve ser informada' })
  @IsString({ message: 'O ano precisa ser uma string' })
  @Matches(/^\d{4}$/, { message: 'O ano deve ser um número com 4 dígitos' })
  year: string;

  @IsNotEmpty({ message: 'A safra deve ter uma propriedade associada' })
  @IsNumber()
  farm_id: number;
}
