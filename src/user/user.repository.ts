import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  private readonly table = 'users';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<User[]> {
    return this.db.findAll<User>(this.table);
  }

  findById(id: string): Promise<User | undefined> {
    return this.db.findById<User>(this.table, id);
  }

  create(body: Pick<User, 'login' | 'password'>): Promise<User> {
    return this.db.create<User>(this.table, {
      ...body,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    });
  }

  update(id: string, body: Omit<User, 'id'>): Promise<User> {
    return this.db.update<User>(this.table, id, {
      ...body,
      version: body.version + 1,
      updatedAt: new Date().getTime(),
    });
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
