import { Inject, Injectable } from '@nestjs/common';
import { Database, DATABASE_TOKEN } from 'src/database/types';
import { ICreateUserDto, IUser } from 'src/types';

@Injectable()
export class UserRepository {
  private readonly table = 'users';

  public constructor(@Inject(DATABASE_TOKEN) private readonly db: Database) {}

  findAll(): Promise<IUser[]> {
    return this.db.findAll<IUser>(this.table);
  }

  findById(id: string): Promise<IUser | undefined> {
    return this.db.findById<IUser>(this.table, id);
  }

  create(body: ICreateUserDto): Promise<IUser> {
    return this.db.create<IUser>(this.table, {
      ...body,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      version: 1,
    });
  }

  update(id: string, body: Omit<IUser, 'id'>): Promise<IUser> {
    return this.db.update<IUser>(this.table, id, {
      ...body,
      version: body.version + 1,
      updatedAt: new Date().getTime(),
    });
  }

  delete(id: string): Promise<void> {
    return this.db.delete(this.table, id);
  }
}
