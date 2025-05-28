import { Module } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { DatabaseModule } from 'src/database/Database.module';
import { ArtistRepository } from './Artist.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, ArtistRepository],
  exports: [UserRepository, ArtistRepository],
})
export class RepositoriesModule {
  public constructor() {}
}
