import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesRepository {
  private readonly table = 'favorites';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  async findAll(): Promise<Record<Favorite['type'], string[]>> {
    const records = await this.db.findAll<Favorite>(this.table);

    return records.reduce<Record<Favorite['type'], string[]>>(
      (acc, cur) => {
        acc[cur.type] = [...acc[cur.type], cur.targetId];

        return acc;
      },
      {
        albums: [],
        artists: [],
        tracks: [],
      } as Record<Favorite['type'], string[]>,
    );
  }

  async create(dto: Omit<Favorite, 'id'>): Promise<Favorite> {
    return this.db.create<Favorite>(this.table, dto);
  }

  async findOne(dto: Partial<Favorite>): Promise<Favorite | null> {
    return this.db.findOne<Favorite>(this.table, dto);
  }

  async delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
