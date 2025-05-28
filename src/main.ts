import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = app.get(ConfigService).get('PORT') || DEFAULT_PORT;

  await app.listen(PORT);
}
bootstrap();
