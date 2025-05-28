import { Module } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { DatabaseModule } from 'src/database/Database.module';
import { ArtistRepository } from './Artist.repository';
import { AlbumRepository } from './Album.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, ArtistRepository, AlbumRepository],
  exports: [UserRepository, ArtistRepository, AlbumRepository],
})
export class RepositoriesModule {
  public constructor() {}
}
