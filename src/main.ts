import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {
  const PORT: number = Number.parseInt(process.env.PORT) | 4000;
  console.log(PORT);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
