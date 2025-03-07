import './tracing';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { setupSwagger } from './config/swagger/swagger.config';
import { OtelLogger } from './config/otel-logger';
import { TraceExceptionInterceptor } from './config/traceinterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Rejeita propriedades extras
      transform: true, // Transforma os tipos automaticamente
    }),
  );

  // Configuração do Swagger
  setupSwagger(app);
  app.useGlobalInterceptors(new TraceExceptionInterceptor());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
