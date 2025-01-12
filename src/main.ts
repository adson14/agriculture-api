import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Rejeita propriedades extras
      transform: true, // Transforma os tipos automaticamente
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
