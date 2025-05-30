import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { FavoritesRepository } from 'src/favorites/favorites.repository';
import { Track } from 'src/track/track.entity';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { Favorite } from './favorite.entity';
import { FavoriteResponseDto } from './dto/favorite-response.dto';
import { AlbumRepository } from 'src/album/album.repository';
import { ArtistRepository } from 'src/artist/artist.repository';
import { TrackRepository } from 'src/track/track.repository';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FavoritesService {
  public constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly trackRepository: TrackRepository,
  ) {}

  async getAllFavorites(): Promise<FavoritesResponseDto> {
    const { albums, artists, tracks } =
      await this.favoritesRepository.findAll();

    const albumsRecords = await Promise.all(
      albums.map((id) => this.albumRepository.findById(id)),
    );

    const artistsRecords = await Promise.all(
      artists.map((id) => this.artistRepository.findById(id)),
    );
    const tracksRecords = await Promise.all(
      tracks.map((id) => this.trackRepository.findById(id)),
    );

    return {
      albums: albumsRecords.filter(Boolean),
      artists: artistsRecords.filter(Boolean),
      tracks: tracksRecords.filter(Boolean),
    };
  }

  async create(
    type: Favorite['type'],
    id: string,
  ): Promise<FavoriteResponseDto> {
    const record = await this.getRecordByType(type, id);

    if (!record) {
      throw new UnprocessableEntityException();
    }

    return this.favoritesRepository.create({
      targetId: id,
      type,
    });
  }

  async delete(type: Favorite['type'], id: string): Promise<HttpException> {
    const targetRecord = await this.favoritesRepository.findOne({
      type,
      targetId: id,
    });

    if (!targetRecord) {
      throw new NotFoundException();
    }

    await this.favoritesRepository.delete(targetRecord.id);

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }

  private getRecordByType(
    type: Favorite['type'],
    id: string,
  ): Promise<Track | Album | Artist | null> {
    switch (type) {
      case 'albums':
        return this.albumRepository.findById(id);
      case 'artists':
        return this.artistRepository.findById(id);
      case 'tracks':
        return this.trackRepository.findById(id);
      default:
        return null;
    }
  }

  @OnEvent('track.delete')
  private async handleTrackDelete(trackId: string) {
    try {
      await this.delete('tracks', trackId);
    } catch {}
  }

  @OnEvent('album.delete')
  private async handleAlbumDelete(albumId: string) {
    try {
      await this.delete('albums', albumId);
    } catch {}
  }

  @OnEvent('artist.delete')
  private async handleArtistDelete(artistId: string) {
    try {
      await this.delete('artists', artistId);
    } catch {}
  }
}
