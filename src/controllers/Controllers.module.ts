import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/Services.module';
import { UserController } from './User.controller';
import { ArtistController } from './Artist.controller';

@Module({
  imports: [ServicesModule],
  controllers: [UserController, ArtistController],
})
export class ControllersModule {}
