import { Module } from '@nestjs/common';
import { DATABASE_TOKEN } from './types';
import { InMemoryDatabase } from './InMemoryDataBase';

@Module({
  providers: [
    {
      provide: DATABASE_TOKEN,
      useClass: InMemoryDatabase,
    },
  ],
  exports: [DATABASE_TOKEN],
})
export class DatabaseModule {
  public constructor() {}
}
