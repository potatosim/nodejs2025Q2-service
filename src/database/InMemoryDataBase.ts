import { Injectable } from '@nestjs/common';
import { Database } from './types';
import { randomUUID } from 'crypto';

@Injectable()
export class InMemoryDatabase implements Database {
  private tables: Map<string, Map<string, unknown>> = new Map();
  public constructor() {}

  private getTable<T>(table: string): Map<string, T> {
    if (!this.tables.has(table)) {
      this.tables.set(table, new Map());
    }
    return this.tables.get(table) as Map<string, T>;
  }

  async findAll<T>(table: string): Promise<T[]> {
    return [...this.getTable<T>(table).values()];
  }

  async findById<T>(table: string, id: string): Promise<T | undefined> {
    return this.getTable<T>(table).get(id);
  }

  async create<T>(table: string, data: Omit<T, 'id'>): Promise<T> {
    const id = randomUUID();
    const newItem = { id, ...data } as T;
    this.getTable<T>(table).set(id, newItem);
    return newItem;
  }

  async update<T>(table: string, id: string, data: Omit<T, 'id'>): Promise<T> {
    const updatedItem = { id, ...data } as T;
    this.getTable<T>(table).set(id, updatedItem);
    return updatedItem;
  }

  async delete(table: string, id: string): Promise<void> {
    this.getTable(table).delete(id);
  }

  async clear(table: string): Promise<void> {
    this.tables.set(table, new Map());
  }
}
