import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistRepository {
  private readonly table = 'artists';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<Artist[]> {
    return this.db.findAll<Artist>(this.table);
  }

  findById(id: string): Promise<Artist | undefined> {
    return this.db.findById<Artist>(this.table, id);
  }

  create(body: Omit<Artist, 'id'>): Promise<Artist> {
    return this.db.create<Artist>(this.table, body);
  }

  update(id: string, body: Omit<Artist, 'id'>): Promise<Artist> {
    return this.db.update<Artist>(this.table, id, body);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
