import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { IAlbum } from 'src/types';

@Injectable()
export class AlbumRepository {
  private readonly table = 'albums';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<IAlbum[]> {
    return this.db.findAll<IAlbum>(this.table);
  }

  findById(id: string): Promise<IAlbum | undefined> {
    return this.db.findById<IAlbum>(this.table, id);
  }

  create(body: Omit<IAlbum, 'id'>): Promise<IAlbum> {
    console.log({ body });
    return this.db.create<IAlbum>(this.table, body);
  }

  update(id: string, body: Omit<IAlbum, 'id'>): Promise<IAlbum> {
    return this.db.update<IAlbum>(this.table, id, body);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
