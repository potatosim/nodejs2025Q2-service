import { Module } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { DatabaseModule } from 'src/database/Database.module';
import { ArtistRepository } from './Artist.repository';
import { AlbumRepository } from './Album.repository';
import { TrackRepository } from './Track.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserRepository,
    ArtistRepository,
    AlbumRepository,
    TrackRepository,
  ],
  exports: [UserRepository, ArtistRepository, AlbumRepository, TrackRepository],
})
export class RepositoriesModule {
  public constructor() {}
}
