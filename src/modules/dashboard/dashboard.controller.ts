import { applyDecorators, Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardSwaggerDocs } from 'src/config/swagger/dashboard-docs';
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @applyDecorators(...DashboardSwaggerDocs.getDashboardData)
  async getDashboard() {
    return this.dashboardService.getDashboardData();
  }
}
