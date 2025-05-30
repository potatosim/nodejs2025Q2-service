import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, TrackModule, AlbumModule],
})
export class AppModule {}
