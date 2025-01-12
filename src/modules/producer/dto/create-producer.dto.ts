import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerDto {
  @IsNotEmpty({ message: 'o nome não pode ser vazio' })
  @IsString({ message: 'o nome precisa ser uma string' })
  name: string;

  @IsNotEmpty({ message: 'o tipo de documento não pode ser vazio' })
  @IsString({ message: 'o tipo de documento precisa ser uma string' })
  doc_type: string;

  @IsNotEmpty({ message: 'o e documento não pode ser vazio' })
  @IsString({ message: 'o documento precisa ser uma string' })
  document: string;
}
