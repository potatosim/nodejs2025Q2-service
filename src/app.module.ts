import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './controllers/Controllers.module';

@Module({
  imports: [ConfigModule.forRoot(), ControllersModule],
})
export class AppModule {}
