import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const PORT: number = Number.parseInt(process.env.PORT) | 4000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
