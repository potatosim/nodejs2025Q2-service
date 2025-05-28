export const DATABASE_TOKEN = Symbol('Database');

export interface Database {
  findAll<T>(table: string): Promise<T[]>;
  findById<T>(table: string, id: string): Promise<T | undefined>;
  create<T>(table: string, data: Omit<T, 'id'>): Promise<T>;
  update<T>(table: string, id: string, data: Omit<T, 'id'>): Promise<T>;
  delete(table: string, id: string): Promise<void>;
  clear(table: string): Promise<void>;
}
