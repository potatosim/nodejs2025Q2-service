import { AlbumResponseDto } from 'src/album/dto/album-response.dto';
import { ArtistResponseDto } from 'src/artist/dto/artist-response.dto';
import { TrackResponseDto } from 'src/track/dto/track-response.dto';

export class FavoritesResponseDto {
  artists: ArtistResponseDto[];
  albums: AlbumResponseDto[];
  tracks: TrackResponseDto[];
}
