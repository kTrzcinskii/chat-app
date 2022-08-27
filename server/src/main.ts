import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FRONTEND_ORIGIN } from './utils/constants';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: FRONTEND_ORIGIN,
  });
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
