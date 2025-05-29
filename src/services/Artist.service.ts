import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistRepository, IArtist } from 'src/repositories/Artist.repository';

@Injectable()
export class ArtistService {
  public constructor(private readonly artistsRepository: ArtistRepository) {}

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

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
