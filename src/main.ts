import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT: number = Number.parseInt(process.env.PORT) | 4000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT).then(() => {
    console.log('app is listening on http://localhost:4000');
  });
}

bootstrap();
