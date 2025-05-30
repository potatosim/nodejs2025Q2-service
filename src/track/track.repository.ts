import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { Track } from './track.entity';

@Injectable()
export class TrackRepository {
  private readonly table = 'tracks';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<Track[]> {
    return this.db.findAll<Track>(this.table);
  }

  findById(id: string): Promise<Track | undefined> {
    return this.db.findById<Track>(this.table, id);
  }

  create(body: Omit<Track, 'id'>): Promise<Track> {
    return this.db.create<Track>(this.table, body);
  }

  update(id: string, body: Omit<Track, 'id'>): Promise<Track> {
    return this.db.update<Track>(this.table, id, body);
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }

  findMany(dto: Partial<Track>): Promise<Track[] | null> {
    return this.db.findMany<Track>(this.table, dto);
  }
}
