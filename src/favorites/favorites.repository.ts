import { Favorite, Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';

export type FavoriteType = 'artists' | 'albums' | 'tracks';

@Injectable()
export class FavoritesRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<
    Array<
      Prisma.FavoriteGetPayload<{
        include: {
          album: true;
          artist: true;
          track: true;
        };
      }>
    >
  > {
    const favorites = await this.prismaService.favorite.findMany({
      include: {
        album: true,
        artist: true,
        track: true,
      },
    });

    return favorites;
  }

  async create(type: FavoriteType, id: string): Promise<Favorite> {
    const createDto = this.getCreateFavoriteDto(type, id);

    const favorite = await this.prismaService.favorite.create({
      data: {
        ...createDto,
      },
    });

    return favorite;
  }

  async findOne(type: FavoriteType, id: string): Promise<Favorite | null> {
    const findFavoriteDto = this.getFindFavoriteDto(type, id);

    const favorite = await this.prismaService.favorite.findUnique({
      where: {
        ...findFavoriteDto,
      },
    });

    return favorite;
  }

  async delete(id: string): Promise<Favorite> {
    return await this.prismaService.favorite.delete({
      where: {
        id,
      },
    });
  }

  private getCreateFavoriteDto(
    type: FavoriteType,
    id: string,
  ): Omit<Favorite, 'id'> {
    switch (type) {
      case 'albums':
        return { albumId: id, artistId: null, trackId: null };
      case 'artists':
        return { artistId: id, albumId: null, trackId: null };
      case 'tracks':
        return {
          trackId: id,
          albumId: null,
          artistId: null,
        };
      default:
        return null as never;
    }
  }

  private getFindFavoriteDto(
    type: FavoriteType,
    id: string,
  ): Prisma.FavoriteFindUniqueArgs['where'] {
    switch (type) {
      case 'albums':
        return { albumId: id };
      case 'artists':
        return { artistId: id };
      case 'tracks':
        return {
          trackId: id,
        };
      default:
        return null as never;
    }
  }
}
