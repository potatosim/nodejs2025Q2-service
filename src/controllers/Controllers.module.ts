import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/Services.module';
import { ArtistController } from './Artist.controller';
import { FavoritesController } from './Favorites.controller';

@Module({
  imports: [ServicesModule],
  controllers: [ArtistController, FavoritesController],
})
export class ControllersModule {}
