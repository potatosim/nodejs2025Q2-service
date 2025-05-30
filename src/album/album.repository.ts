import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { Album } from './album.entity';

@Injectable()
export class AlbumRepository {
  private readonly table = 'albums';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<Album[]> {
    return this.db.findAll<Album>(this.table);
  }

  findById(id: string): Promise<Album | undefined> {
    return this.db.findById<Album>(this.table, id);
  }

  create(body: Omit<Album, 'id'>): Promise<Album> {
    return this.db.create<Album>(this.table, body);
  }

  update(id: string, body: Omit<Album, 'id'>): Promise<Album> {
    return this.db.update<Album>(this.table, id, body);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }

  findMany(dto: Partial<Album>): Promise<Album[] | null> {
    return this.db.findMany<Album>(this.table, dto);
  }
}
