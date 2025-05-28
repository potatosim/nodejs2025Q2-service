import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/Services.module';
import { UserController } from './User.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UserController],
})
export class ControllersModule {}
