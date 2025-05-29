import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/Repositories.module';
import { ArtistService } from './Artist.service';
import { AlbumService } from './Album.service';
import { TrackService } from './Track.service';
import { FavoritesService } from './Favorites.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ArtistService, AlbumService, TrackService, FavoritesService],
  exports: [ArtistService, AlbumService, TrackService, FavoritesService],
})
export class ServicesModule {
  public constructor() {}
}
