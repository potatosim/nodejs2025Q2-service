import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { IArtist } from './Artist.repository';
import { IAlbum } from './Album.repository';
import { ITrack } from './Track.repository';

export interface IFavorites {
  artists: IArtist['id'][];
  albums: IAlbum['id'][];
  tracks: ITrack['id'][];
}

export interface IFavoriteItem {
  id: string;
  targetId: string;
  type: keyof IFavorites;
}

@Injectable()
export class FavoritesRepository {
  private readonly table = 'favorites';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  async findAll(): Promise<IFavorites> {
    const records = await this.db.findAll<IFavoriteItem>(this.table);

    return records.reduce<IFavorites>(
      (acc, cur) => {
        acc[cur.type] = [...acc[cur.type], cur.targetId];

        return acc;
      },
      {
        albums: [],
        artists: [],
        tracks: [],
      } as IFavorites,
    );
  }

  async create(dto: Omit<IFavoriteItem, 'id'>): Promise<IFavoriteItem> {
    return this.db.create<IFavoriteItem>(this.table, dto);
  }

  async findOne(dto: Partial<IFavoriteItem>): Promise<IFavoriteItem | null> {
    return this.db.findOne<IFavoriteItem>(this.table, dto);
  }

  async delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
