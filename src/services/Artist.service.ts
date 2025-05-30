import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from 'src/album/album.repository';
import { ArtistRepository, IArtist } from 'src/repositories/Artist.repository';
import { FavoritesRepository } from 'src/repositories/Favorites.repository';
import { TrackRepository } from 'src/track/track.repository';

@Injectable()
export class ArtistService {
  public constructor(
    private readonly artistsRepository: ArtistRepository,
    private readonly tracksRepository: TrackRepository,
    private readonly albumsRepository: AlbumRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async getAllArtists(): Promise<IArtist[]> {
    const artists = await this.artistsRepository.findAll();

    return artists;
  }

  async getArtistById(id: string): Promise<IArtist> {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new NotFoundException("Artist with such id doesn't exist");
    }

    return artist;
  }

  async createArtist(dto: Omit<IArtist, 'id'>): Promise<IArtist> {
    const artist = await this.artistsRepository.create(dto);

    return artist;
  }

  async updateArtist(id: string, dto: Omit<IArtist, 'id'>): Promise<IArtist> {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new NotFoundException();
    }

    const updatedArtist = await this.artistsRepository.update(id, dto);

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new NotFoundException();
    }

    await this.artistsRepository.delete(id);

    const tracksToUpdate = await this.tracksRepository.findMany({
      artistId: id,
    });

    if (tracksToUpdate && tracksToUpdate.length) {
      await Promise.all(
        tracksToUpdate.map((track) =>
          this.tracksRepository.update(track.id, {
            ...track,
            artistId: null,
          }),
        ),
      );
    }

    const albumsToUpdate = await this.albumsRepository.findMany({
      artistId: id,
    });

    if (albumsToUpdate && albumsToUpdate.length) {
      await Promise.all(
        albumsToUpdate.map((album) =>
          this.albumsRepository.update(album.id, {
            ...album,
            artistId: null,
          }),
        ),
      );
    }

    const itemToDeleteInFavorites = await this.favoritesRepository.findOne({
      type: 'artists',
      targetId: id,
    });

    if (itemToDeleteInFavorites) {
      await this.favoritesRepository.delete(itemToDeleteInFavorites.id);
    }

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
