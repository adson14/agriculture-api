import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateFarmDto } from 'src/modules/farm/dto/create-farm.dto';
import { UpdateFarmDto } from 'src/modules/farm/dto/update-farm.dto';

export const FarmSwaggerDocs = {
  create: [
    ApiOperation({ summary: 'Criar uma nova fazenda' }),
    ApiResponse({
      status: 201,
      description: 'Fazenda criada com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'Fazenda Boa Vista',
          city: 'Uberlândia',
          state: 'MG',
          total_area: 100,
          farming_area: 60,
          vegetation_area: 40,
          producer_id: 1,
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
            'A área total deve ser maior que zero',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiBody({
      description: 'Dados necessários para criar uma fazenda',
      type: CreateFarmDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            name: 'Fazenda Boa Vista',
            city: 'Uberlândia',
            state: 'MG',
            total_area: 100,
            farming_area: 60,
            vegetation_area: 40,
            producer_id: 1,
          },
        },
        invalid: {
          summary: 'Exemplo inválido',
          value: {
            name: '',
            city: 'Uberlândia',
            state: 'MG',
            total_area: 0,
          },
        },
      },
    }),
  ],

  findAll: [
    ApiOperation({ summary: 'Listar todas as fazendas' }),
    ApiResponse({
      status: 200,
      description: 'Lista de fazendas retornada com sucesso',
      schema: {
        example: [
          {
            id: 1,
            name: 'Fazenda Boa Vista',
            city: 'Uberlândia',
            state: 'MG',
            total_area: 100,
            farming_area: 60,
            vegetation_area: 40,
            producer: {
              id: 1,
              name: 'José da Silva',
              doc_type: 'CPF',
              document: '12345678909',
            },
          },
        ],
      },
    }),
  ],

  findOne: [
    ApiOperation({ summary: 'Obter uma fazenda pelo ID' }),
    ApiResponse({
      status: 200,
      description: 'Fazenda retornada com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'Fazenda Boa Vista',
          city: 'Uberlândia',
          state: 'MG',
          total_area: 100,
          farming_area: 60,
          vegetation_area: 40,
          producer: {
            id: 1,
            name: 'José da Silva',
            doc_type: 'CPF',
            document: '12345678909',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Fazenda não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Fazenda não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da fazenda',
      example: 1,
    }),
  ],

  update: [
    ApiOperation({ summary: 'Atualizar uma fazenda' }),
    ApiResponse({
      status: 200,
      description: 'Fazenda atualizada com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'Fazenda Boa Vista Atualizada',
          city: 'Uberlândia',
          state: 'MG',
          total_area: 120,
          farming_area: 70,
          vegetation_area: 50,
          producer: {
            id: 1,
            name: 'José da Silva',
            doc_type: 'CPF',
            document: '12345678909',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Fazenda não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Fazenda não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiBody({
      description: 'Dados para atualizar a fazenda',
      type: UpdateFarmDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            name: 'Fazenda Boa Vista Atualizada',
            city: 'Uberlândia',
            state: 'MG',
            total_area: 120,
            farming_area: 70,
            vegetation_area: 50,
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da fazenda',
      example: 1,
    }),
  ],

  delete: [
    ApiOperation({ summary: 'Excluir uma fazenda pelo ID' }),
    ApiResponse({
      status: 204,
      description: 'Fazenda excluída com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Fazenda não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Fazenda não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da fazenda',
      example: 1,
    }),
  ],
};
