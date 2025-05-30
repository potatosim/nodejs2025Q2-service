import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/Database.module';
import { ArtistRepository } from './Artist.repository';
import { AlbumRepository } from '../album/album.repository';
import { FavoritesRepository } from './Favorites.repository';

@Module({
  imports: [DatabaseModule],
  providers: [ArtistRepository, AlbumRepository, FavoritesRepository],
  exports: [ArtistRepository, AlbumRepository, FavoritesRepository],
})
export class RepositoriesModule {
  public constructor() {}
}
