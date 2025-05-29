import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { RepositoriesModule } from 'src/repositories/Repositories.module';
import { ArtistService } from './Artist.service';
import { AlbumService } from './Album.service';
import { TrackService } from './Track.service';
import { FavoritesService } from './Favorites.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
  ],
  exports: [
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoritesService,
  ],
})
export class ServicesModule {
  public constructor() {}
}
