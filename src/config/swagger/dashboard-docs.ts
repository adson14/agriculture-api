import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const DashboardSwaggerDocs = {
  getDashboardData: [
    ApiOperation({ summary: 'Obter os dados do dashboard' }),
    ApiResponse({
      status: 200,
      description: 'Dados do dashboard retornados com sucesso',
      schema: {
        example: {
          totalFarms: 50,
          totalHectares: 12500.5,
          farmsByState: [
            { state: 'MG', count: 20 },
            { state: 'SP', count: 15 },
            { state: 'GO', count: 10 },
          ],
          culturesByCrop: [
            { culture: 'Soja', count: 40 },
            { culture: 'Milho', count: 30 },
            { culture: 'Café', count: 30 },
          ],
          landUsage: {
            farmingArea: 8000,
            vegetationArea: 4500,
          },
        },
      },
    }),
  ],
};
