import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ValidateFarmArea } from 'src/validators/farm';

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
  @ValidateFarmArea({
    message:
      'A soma das áreas agricultável e de vegetação não pode exceder a área total.',
  })
  total_area: number;

  @IsNumber()
  farming_area: number;

  @IsNumber()
  vegetation_area: number;

  @IsNotEmpty({ message: 'A propriedade deve ter um produtor associado' })
  @IsNumber()
  producer_id: number; // Relaciona a fazenda com o produtor
}
