import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { IArtist } from './Artist.repository';
import { IAlbum } from './Album.repository';

export interface ITrack {
  id: string;
  name: string;
  artistId: IArtist['id'] | null;
  albumId: IAlbum['id'] | null;
  duration: number;
}

@Injectable()
export class TrackRepository {
  private readonly table = 'tracks';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<ITrack[]> {
    return this.db.findAll<ITrack>(this.table);
  }

  findById(id: string): Promise<ITrack | undefined> {
    return this.db.findById<ITrack>(this.table, id);
  }

  create(body: Omit<ITrack, 'id'>): Promise<ITrack> {
    return this.db.create<ITrack>(this.table, body);
  }

  update(id: string, body: Omit<ITrack, 'id'>): Promise<ITrack> {
    return this.db.update<ITrack>(this.table, id, body);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }

  findMany(dto: Partial<ITrack>): Promise<ITrack[] | null> {
    return this.db.findMany<ITrack>(this.table, dto);
  }
}
