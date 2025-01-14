import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateProducerDto } from 'src/modules/producer/dto/create-producer.dto';
import { UpdateProducerDto } from 'src/modules/producer/dto/update-producer.dto';

export const ProducerSwaggerDocs = {
  create: [
    ApiOperation({ summary: 'Criar um novo produtor' }),
    ApiResponse({
      status: 201,
      description: 'Produtor criado com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'José da Silva',
          doc_type: 'CPF',
          document: '12345678909',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Dados inválidos',
      schema: {
        example: {
          statusCode: 400,
          message: [
            'O nome não pode ser vazio',
            'O tipo de documento não pode ser vazio',
            'O documento deve conter apenas números',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiBody({
      description: 'Dados necessários para criar um produtor',
      type: CreateProducerDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            name: 'José da Silva',
            doc_type: 'CPF',
            document: '12345678909',
          },
        },
        invalid: {
          summary: 'Exemplo inválido',
          value: {
            name: '',
            doc_type: 'CPF',
            document: '1234567890',
          },
        },
      },
    }),
  ],

  findAll: [
    ApiOperation({ summary: 'Listar todos os produtores' }),
    ApiResponse({
      status: 200,
      description: 'Lista de produtores retornada com sucesso',
      schema: {
        example: [
          {
            id: 1,
            name: 'José da Silva',
            doc_type: 'CPF',
            document: '12345678909',
          },
          {
            id: 2,
            name: 'Maria Souza',
            doc_type: 'CNPJ',
            document: '12345678000195',
          },
        ],
      },
    }),
  ],

  findOne: [
    ApiOperation({ summary: 'Obter um produtor pelo ID' }),
    ApiResponse({
      status: 200,
      description: 'Produtor retornado com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'José da Silva',
          doc_type: 'CPF',
          document: '12345678909',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Produtor não encontrado',
      schema: {
        example: {
          statusCode: 404,
          message: 'Produtor não encontrado',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do produtor',
      example: 1,
    }),
  ],

  update: [
    ApiOperation({ summary: 'Atualizar um produtor' }),
    ApiResponse({
      status: 200,
      description: 'Produtor atualizado com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'José da Silva Atualizado',
          doc_type: 'CPF',
          document: '12345678909',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Produtor não encontrado',
      schema: {
        example: {
          statusCode: 404,
          message: 'Produtor não encontrado',
          error: 'Not Found',
        },
      },
    }),
    ApiBody({
      description: 'Dados para atualizar o produtor',
      type: UpdateProducerDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            name: 'José da Silva Atualizado',
            doc_type: 'CPF',
            document: '12345678909',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do produtor',
      example: 1,
    }),
  ],

  delete: [
    ApiOperation({ summary: 'Excluir um produtor pelo ID' }),
    ApiResponse({
      status: 204,
      description: 'Produtor excluído com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Produtor não encontrado',
      schema: {
        example: {
          statusCode: 404,
          message: 'Produtor não encontrado',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do produtor',
      example: 1,
    }),
  ],
};
