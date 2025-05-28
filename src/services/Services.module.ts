import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { RepositoriesModule } from 'src/repositories/Repositories.module';
import { ArtistService } from './Artist.service';

@Module({
  imports: [RepositoriesModule],
  providers: [UserService, ArtistService],
  exports: [UserService, ArtistService],
})
export class ServicesModule {
  public constructor() {}
}
