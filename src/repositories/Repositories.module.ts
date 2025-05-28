import { Module } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { DatabaseModule } from 'src/database/Database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {
  public constructor() {}
}
