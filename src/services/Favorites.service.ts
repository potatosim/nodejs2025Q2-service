import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/album.entity';
import { AlbumRepository } from 'src/album/album.repository';
import { Artist } from 'src/artist/artist.entity';
import { ArtistRepository } from 'src/artist/artist.repository';
import {
  FavoritesRepository,
  IFavoriteItem,
  IFavorites,
} from 'src/repositories/Favorites.repository';
import { Track } from 'src/track/track.entity';
import { TrackRepository } from 'src/track/track.repository';

@Injectable()
export class FavoritesService {
  public constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
  ) {}

  async getAllFavorites(): Promise<any> {
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

  async create(type: keyof IFavorites, id: string): Promise<IFavoriteItem> {
    const record = await this.getRecordByType(type, id);

    if (!record) {
      throw new UnprocessableEntityException();
    }

    return this.favoritesRepository.create({
      targetId: id,
      type,
    });
  }

  async delete(type: keyof IFavorites, id: string): Promise<IFavoriteItem> {
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
    type: keyof IFavorites,
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
}
