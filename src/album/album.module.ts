import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseModule } from 'src/database/Database.module';
import { AlbumRepository } from './album.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumRepository, AlbumService],
  exports: [AlbumRepository],
})
export class AlbumModule {}
