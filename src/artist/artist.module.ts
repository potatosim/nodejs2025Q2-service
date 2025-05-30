import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from 'src/database/Database.module';
import { ArtistRepository } from './artist.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistController],
  providers: [ArtistRepository, ArtistService],
  exports: [ArtistRepository],
})
export class ArtistModule {}
