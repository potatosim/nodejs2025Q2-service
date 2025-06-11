import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth.quard';

@Controller('favs')
@UseGuards(AuthGuard)
export class FavoritesController {
  public constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrackToFavs(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.favoritesService.create('tracks', id);
  }

  @Delete('track/:id')
  deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.delete('tracks', id);
  }

  @Post('album/:id')
  addAlbumToFavs(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.favoritesService.create('albums', id);
  }

  @Delete('album/:id')
  deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.delete('albums', id);
  }

  @Post('artist/:id')
  addArtistToFavs(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.favoritesService.create('artists', id);
  }

  @Delete('artist/:id')
  deleteArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.delete('artists', id);
  }
}
