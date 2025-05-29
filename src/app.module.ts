import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from './controllers/Controllers.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), ControllersModule, UserModule],
})
export class AppModule {}
