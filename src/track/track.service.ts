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
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TrackService {
  public constructor(
    private readonly tracksRepository: TrackRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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

    this.eventEmitter.emit('track.delete', id);

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }

  @OnEvent('album.delete')
  private async handleAlbumDelete(albumId: string) {
    const tracksToUpdate = await this.tracksRepository.findMany({
      albumId,
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
  }

  @OnEvent('artist.delete')
  private async handleArtistDelete(artistId: string) {
    const tracksToUpdate = await this.tracksRepository.findMany({
      artistId,
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
  }
}
