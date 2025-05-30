import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/Services.module';
import { FavoritesController } from './Favorites.controller';

@Module({
  imports: [ServicesModule],
  controllers: [FavoritesController],
})
export class ControllersModule {}
