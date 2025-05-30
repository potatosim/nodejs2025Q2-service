import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { TrackResponseDto } from './dto/track-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  public constructor(private readonly tracksRepository: TrackRepository) {}

  async getAllTracks(): Promise<TrackResponseDto[]> {
    const tracks = await this.tracksRepository.findAll();

    return tracks.map((track) => plainToInstance(TrackResponseDto, track));
  }

  async getTrackById(id: string): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new NotFoundException("Track with such id doesn't exist");
    }

    return plainToInstance(TrackResponseDto, track);
  }

  async createTrack(dto: CreateTrackDto): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.create({
      ...dto,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
    });

    return plainToInstance(TrackResponseDto, track);
  }

  async updateTrack(
    id: string,
    dto: UpdateTrackDto,
  ): Promise<TrackResponseDto> {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new NotFoundException();
    }

    const updatedTrack = await this.tracksRepository.update(id, {
      ...track,
      ...dto,
    });

    return plainToInstance(TrackResponseDto, updatedTrack);
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new NotFoundException();
    }
    await this.tracksRepository.delete(id);

    // const itemToDeleteInFavorites = await this.favoritesRepository.findOne({
    //   type: 'tracks',
    //   targetId: id,
    // });

    // if (itemToDeleteInFavorites) {
    //   await this.favoritesRepository.delete(itemToDeleteInFavorites.id);
    // }

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
