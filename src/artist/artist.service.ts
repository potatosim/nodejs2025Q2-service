import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ArtistService {
  public constructor(private readonly artistsRepository: ArtistRepository) {}

  async getAllArtists(): Promise<ArtistResponseDto[]> {
    const artists = await this.artistsRepository.findAll();

    return artists.map((artist) => plainToInstance(ArtistResponseDto, artist));
  }

  async getArtistById(id: string): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new NotFoundException("Artist with such id doesn't exist");
    }

    return plainToInstance(ArtistResponseDto, artist);
  }

  async createArtist(dto: CreateArtistDto): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.create(dto);

    return plainToInstance(ArtistResponseDto, artist);
  }

  async updateArtist(
    id: string,
    dto: UpdateArtistDto,
  ): Promise<ArtistResponseDto> {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new NotFoundException();
    }

    const updatedArtist = await this.artistsRepository.update(id, {
      ...artist,
      ...dto,
    });

    return plainToInstance(ArtistResponseDto, updatedArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new NotFoundException();
    }

    await this.artistsRepository.delete(id);

    // const tracksToUpdate = await this.tracksRepository.findMany({
    //   artistId: id,
    // });

    // if (tracksToUpdate && tracksToUpdate.length) {
    //   await Promise.all(
    //     tracksToUpdate.map((track) =>
    //       this.tracksRepository.update(track.id, {
    //         ...track,
    //         artistId: null,
    //       }),
    //     ),
    //   );
    // }

    // const albumsToUpdate = await this.albumsRepository.findMany({
    //   artistId: id,
    // });

    // if (albumsToUpdate && albumsToUpdate.length) {
    //   await Promise.all(
    //     albumsToUpdate.map((album) =>
    //       this.albumsRepository.update(album.id, {
    //         ...album,
    //         artistId: null,
    //       }),
    //     ),
    //   );
    // }

    // const itemToDeleteInFavorites = await this.favoritesRepository.findOne({
    //   type: 'artists',
    //   targetId: id,
    // });

    // if (itemToDeleteInFavorites) {
    //   await this.favoritesRepository.delete(itemToDeleteInFavorites.id);
    // }

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
