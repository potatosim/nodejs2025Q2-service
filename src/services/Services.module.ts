import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { RepositoriesModule } from 'src/repositories/Repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [UserService],
  exports: [UserService],
})
export class ServicesModule {
  public constructor() {}
}
