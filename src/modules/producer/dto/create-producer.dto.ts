import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { IsValidDocument } from '../../../validators/document';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @IsNotEmpty({ message: 'o nome não pode ser vazio' })
  @IsString({ message: 'o nome precisa ser uma string' })
  @ApiProperty({ description: 'Nome do produtor', example: 'José da Silva' })
  name: string;

  @IsNotEmpty({ message: 'o tipo de documento não pode ser vazio' })
  @IsString({ message: 'o tipo de documento precisa ser uma string' })
  @IsIn(['CPF', 'CNPJ'], {
    message: 'O tipo de documento deve ser CPF ou CNPJ',
  })
  @ApiProperty({
    description: 'Tipo de documento',
    example: 'CPF',
    enum: ['CPF', 'CNPJ'], // Lista de valores permitidos
  })
  doc_type: string;

  @ValidateIf((o) => o.doc_type)
  @IsNotEmpty({ message: 'o e documento não pode ser vazio' })
  @IsString({ message: 'o documento precisa ser uma string' })
  @IsValidDocument({ message: 'Documento inválido para o tipo especificado' })
  @ApiProperty({
    description: 'Número do documento',
    example: '12345678909',
    minLength: 11,
    maxLength: 14,
  })
  document: string;
}
