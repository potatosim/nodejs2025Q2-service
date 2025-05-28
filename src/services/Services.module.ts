import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { RepositoriesModule } from 'src/repositories/Repositories.module';
import { ArtistService } from './Artist.service';
import { AlbumService } from './Album.service';

@Module({
  imports: [RepositoriesModule],
  providers: [UserService, ArtistService, AlbumService],
  exports: [UserService, ArtistService, AlbumService],
})
export class ServicesModule {
  public constructor() {}
}
