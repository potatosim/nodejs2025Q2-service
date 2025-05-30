import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/Repositories.module';
import { ArtistService } from './Artist.service';
import { FavoritesService } from './Favorites.service';

@Module({
  imports: [RepositoriesModule],
  providers: [ArtistService, FavoritesService],
  exports: [ArtistService, FavoritesService],
})
export class ServicesModule {
  public constructor() {}
}
