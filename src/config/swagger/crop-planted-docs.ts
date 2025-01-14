import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateCropPlantedDto } from 'src/modules/crops_planted/dto/create-crop-planted.dto';
import { UpdateCropPlantedDto } from 'src/modules/crops_planted/dto/update-crop-planted.dto';

export const CropPlantedSwaggerDocs = {
  create: [
    ApiOperation({ summary: 'Criar uma nova cultura plantada' }),
    ApiResponse({
      status: 201,
      description: 'Cultura plantada criada com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'Soja',
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
            'O nome não pode ser vazio',
            'O ID da fazenda é obrigatório',
          ],
          error: 'Bad Request',
        },
      },
    }),
    ApiBody({
      description: 'Dados necessários para criar uma cultura plantada',
      type: CreateCropPlantedDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            name: 'Soja',
            farm_id: 1,
          },
        },
        invalid: {
          summary: 'Exemplo inválido',
          value: {
            name: '',
            farm_id: null,
          },
        },
      },
    }),
  ],

  findAll: [
    ApiOperation({ summary: 'Listar todas as culturas plantadas' }),
    ApiResponse({
      status: 200,
      description: 'Lista de culturas plantadas retornada com sucesso',
      schema: {
        example: [
          {
            id: 1,
            name: 'Soja',
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
    ApiOperation({ summary: 'Obter uma cultura plantada pelo ID' }),
    ApiResponse({
      status: 200,
      description: 'Cultura plantada retornada com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'Soja',
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
      description: 'Cultura plantada não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Cultura plantada não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da cultura plantada',
      example: 1,
    }),
  ],

  update: [
    ApiOperation({ summary: 'Atualizar uma cultura plantada' }),
    ApiResponse({
      status: 200,
      description: 'Cultura plantada atualizada com sucesso',
      schema: {
        example: {
          id: 1,
          name: 'Milho',
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
      description: 'Cultura plantada não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Cultura plantada não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiBody({
      description: 'Dados para atualizar uma cultura plantada',
      type: UpdateCropPlantedDto,
      examples: {
        valid: {
          summary: 'Exemplo válido',
          value: {
            name: 'Milho',
          },
        },
        invalid: {
          summary: 'Exemplo inválido',
          value: {
            name: '',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da cultura plantada',
      example: 1,
    }),
  ],

  delete: [
    ApiOperation({ summary: 'Excluir uma cultura plantada pelo ID' }),
    ApiResponse({
      status: 204,
      description: 'Cultura plantada excluída com sucesso',
    }),
    ApiResponse({
      status: 404,
      description: 'Cultura plantada não encontrada',
      schema: {
        example: {
          statusCode: 404,
          message: 'Cultura plantada não encontrada',
          error: 'Not Found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID da cultura plantada',
      example: 1,
    }),
  ],
};
