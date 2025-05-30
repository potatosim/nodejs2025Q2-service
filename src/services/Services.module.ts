import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/Repositories.module';
import { FavoritesService } from './Favorites.service';

@Module({
  imports: [RepositoriesModule],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class ServicesModule {
  public constructor() {}
}
