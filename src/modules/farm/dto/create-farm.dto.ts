import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty({ message: 'Nome da propriedade não pode ser vazio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Cidade não pode ser vazio' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'Estado não pode ser vazio' })
  @IsString()
  state: string;

  @IsNumber()
  total_area: number;

  @IsNumber()
  farming_area: number;

  @IsNumber()
  vegetation_area: number;

  @IsNotEmpty({ message: 'A propriedade deve ter um produtor associado' })
  @IsNumber()
  producer_id: number; // Relaciona a fazenda com o produtor
}
