import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';

export interface IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class ArtistRepository {
  private readonly table = 'artists';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<IArtist[]> {
    return this.db.findAll<IArtist>(this.table);
  }

  findById(id: string): Promise<IArtist | undefined> {
    return this.db.findById<IArtist>(this.table, id);
  }

  create(body: Omit<IArtist, 'id'>): Promise<IArtist> {
    return this.db.create<IArtist>(this.table, body);
  }

  update(id: string, body: Omit<IArtist, 'id'>): Promise<IArtist> {
    return this.db.update<IArtist>(this.table, id, body);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
