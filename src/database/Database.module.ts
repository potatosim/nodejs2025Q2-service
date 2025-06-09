import { Module } from '@nestjs/common';
import { DATABASE_TOKEN } from './types';
import { InMemoryDatabase } from './InMemoryDataBase';
import { PrismaService } from './Prisma.service';

@Module({
  providers: [
    {
      provide: DATABASE_TOKEN,
      useClass: InMemoryDatabase,
    },
    PrismaService,
  ],
  exports: [DATABASE_TOKEN, PrismaService],
})
export class DatabaseModule {
  public constructor() {}
}
