import {
  FavoriteType,
  FavoritesRepository,
} from 'src/favorites/favorites.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FavoritesService {
  public constructor(
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async getAllFavorites(): Promise<FavoritesResponseDto> {
    const favorites = await this.favoritesRepository.findAll();

    return {
      albums: favorites
        .filter((record) => record.albumId)
        .map((record) => record.album),
      artists: favorites
        .filter((record) => record.artistId)
        .map((record) => record.artist),
      tracks: favorites
        .filter((record) => record.trackId)
        .map((record) => record.track),
    };
  }

  async create(type: FavoriteType, id: string): Promise<FavoriteResponseDto> {
    try {
      return await this.favoritesRepository.create(type, id);
    } catch (err) {
      if ((err as PrismaClientKnownRequestError).code === 'P2003') {
        throw new UnprocessableEntityException();
      }

      throw err;
    }
  }

  async delete(type: FavoriteType, id: string): Promise<HttpException> {
    const targetRecord = await this.favoritesRepository.findOne(type, id);

    if (!targetRecord) {
      throw new NotFoundException();
    }

    await this.favoritesRepository.delete(targetRecord.id);

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
