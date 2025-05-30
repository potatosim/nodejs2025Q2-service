import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/Database.module';
import { TrackRepository } from './track.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackController],
  providers: [TrackRepository, TrackService],
})
export class TrackModule {}
