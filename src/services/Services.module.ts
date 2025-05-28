import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { RepositoriesModule } from 'src/repositories/Repositories.module';
import { ArtistService } from './Artist.service';
import { AlbumService } from './Album.service';
import { TrackService } from './Track.service';

@Module({
  imports: [RepositoriesModule],
  providers: [UserService, ArtistService, AlbumService, TrackService],
  exports: [UserService, ArtistService, AlbumService, TrackService],
})
export class ServicesModule {
  public constructor() {}
}
