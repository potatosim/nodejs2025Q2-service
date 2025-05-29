import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository, IAlbum } from 'src/repositories/Album.repository';
import { FavoritesRepository } from 'src/repositories/Favorites.repository';
import { TrackRepository } from 'src/repositories/Track.repository';

@Injectable()
export class AlbumService {
  public constructor(
    private readonly albumsRepository: AlbumRepository,
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksRepository: TrackRepository,
  ) {}

  async getAllAlbums(): Promise<IAlbum[]> {
    const albums = await this.albumsRepository.findAll();

    return albums;
  }

  async getAlbumById(id: string): Promise<IAlbum> {
    const album = await this.albumsRepository.findById(id);

    if (!album) {
      throw new NotFoundException("Album with such id doesn't exist");
    }

    return album;
  }

  async createAlbum(dto: Omit<IAlbum, 'id'>): Promise<IAlbum> {
    const albums = await this.albumsRepository.create({
      ...dto,
      artistId: dto.artistId ?? null,
    });

    return albums;
  }

  async updateAlbum(id: string, dto: Omit<IAlbum, 'id'>): Promise<IAlbum> {
    const album = await this.albumsRepository.findById(id);

    if (!album) {
      throw new NotFoundException();
    }

    const updatedAlbum = await this.albumsRepository.update(id, dto);

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumsRepository.findById(id);

    if (!album) {
      throw new NotFoundException();
    }

    await this.albumsRepository.delete(id);

    const tracksToUpdate = await this.tracksRepository.findMany({
      albumId: id,
    });

    if (tracksToUpdate && tracksToUpdate.length) {
      await Promise.all(
        tracksToUpdate.map((track) =>
          this.tracksRepository.update(track.id, {
            ...track,
            albumId: null,
          }),
        ),
      );
    }

    const itemToDeleteInFavorites = await this.favoritesRepository.findOne({
      type: 'albums',
      targetId: id,
    });

    if (itemToDeleteInFavorites) {
      await this.favoritesRepository.delete(itemToDeleteInFavorites.id);
    }

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
