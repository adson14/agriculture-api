import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateCropDto } from 'src/modules/crop/dto/create-crop.dto';
import { UpdateCropDto } from 'src/modules/crop/dto/update-crop.dto';

export const CropSwaggerDocs = {
  create: [
    ApiOperation({ summary: 'Criar uma nova safra' }),
    ApiResponse({
      status: 201,
      description: 'Safra criada com sucesso',
      schema: {
        example: {
          id: 1,
          year: '2023',
          farm_id: 1,
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
            'O ano não pode ser vazio',
            'O ID da fazenda é obrigatório',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiBody({
      description: 'Dados necessários para criar uma safra',
      type: CreateCropDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            year: '2023',
            farm_id: 1,
          },
        },
        invalid: {
          summary: 'Exemplo inválido',
          value: {
            year: '',
            farm_id: null,
          },
        },
      },
    }),
  ],

  findAll: [
    ApiOperation({ summary: 'Listar todas as safras' }),
    ApiResponse({
      status: 200,
      description: 'Lista de safras retornada com sucesso',
      schema: {
        example: [
          {
            id: 1,
            year: '2023',
            farm: {
              id: 1,
              name: 'Fazenda Boa Vista',
              city: 'Uberlândia',
              state: 'MG',
            },
          },
        ],
      },
    }),
  ],

  findOne: [
    ApiOperation({ summary: 'Obter uma safra pelo ID' }),
    ApiResponse({
      status: 200,
      description: 'Safra retornada com sucesso',
      schema: {
        example: {
          id: 1,
          year: '2023',
          farm: {
            id: 1,
            name: 'Fazenda Boa Vista',
            city: 'Uberlândia',
            state: 'MG',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Safra não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Safra não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da safra',
      example: 1,
    }),
  ],

  update: [
    ApiOperation({ summary: 'Atualizar uma safra' }),
    ApiResponse({
      status: 200,
      description: 'Safra atualizada com sucesso',
      schema: {
        example: {
          id: 1,
          year: '2024',
          farm: {
            id: 1,
            name: 'Fazenda Boa Vista',
            city: 'Uberlândia',
            state: 'MG',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Safra não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Safra não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiBody({
      description: 'Dados para atualizar uma safra',
      type: UpdateCropDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            year: '2024',
          },
        },
        invalid: {
          summary: 'Exemplo inválido',
          value: {
            year: '',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da safra',
      example: 1,
    }),
  ],

  delete: [
    ApiOperation({ summary: 'Excluir uma safra pelo ID' }),
    ApiResponse({
      status: 204,
      description: 'Safra excluída com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Safra não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Safra não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da safra',
      example: 1,
    }),
  ],

  getCulturesByCrop: [
    ApiOperation({
      summary: 'Obter todas as culturas associadas a uma safra específica',
    }),
    ApiResponse({
      status: 200,
      description: 'Culturas associadas retornadas com sucesso',
      schema: {
        example: [
          {
            id: 1,
            name: 'Soja',
          },
          {
            id: 2,
            name: 'Milho',
          },
        ],
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Safra não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Safra não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'cropId',
      required: true,
      description: 'ID da safra',
      example: 1,
    }),
  ],

  addCulturesToCrop: [
    ApiOperation({
      summary: 'Associar culturas a uma safra específica',
    }),
    ApiResponse({
      status: 200,
      description: 'Culturas associadas com sucesso',
      schema: {
        example: {
          message: 'Culturas associadas com sucesso',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Safra ou cultura não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Safra ou cultura não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiBody({
      description: 'IDs das culturas a serem associadas',
      schema: {
        example: {
          culture_ids: [1, 2],
        },
      },
    }),
    ApiParam({
      name: 'cropId',
      required: true,
      description: 'ID da safra',
      example: 1,
    }),
  ],
};
