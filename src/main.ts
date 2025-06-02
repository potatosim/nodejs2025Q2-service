import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './swagger';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await setupSwagger(app, 'doc/api.yaml');

  const PORT = app.get(ConfigService).get('PORT') || DEFAULT_PORT;

  await app.listen(PORT);
}

bootstrap();
