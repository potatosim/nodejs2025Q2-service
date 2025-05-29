import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/Database.module';
import { ArtistRepository } from './Artist.repository';
import { AlbumRepository } from './Album.repository';
import { TrackRepository } from './Track.repository';
import { FavoritesRepository } from './Favorites.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ArtistRepository,
    AlbumRepository,
    TrackRepository,
    FavoritesRepository,
  ],
  exports: [
    ArtistRepository,
    AlbumRepository,
    TrackRepository,
    FavoritesRepository,
  ],
})
export class RepositoriesModule {
  public constructor() {}
}
