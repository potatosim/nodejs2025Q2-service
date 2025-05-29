import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/Services.module';
import { UserController } from './User.controller';
import { ArtistController } from './Artist.controller';
import { AlbumController } from './Album.controller';
import { TrackController } from './Track.controller';
import { FavoritesController } from './Favorites.controller';

@Module({
  imports: [ServicesModule],
  controllers: [
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
    FavoritesController,
  ],
})
export class ControllersModule {}
