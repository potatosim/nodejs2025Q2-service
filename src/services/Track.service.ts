import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITrack, TrackRepository } from 'src/repositories/Track.repository';

@Injectable()
export class TrackService {
  public constructor(private readonly tracksRepository: TrackRepository) {}

  async getAllTracks(): Promise<ITrack[]> {
    const tracks = await this.tracksRepository.findAll();

    return tracks;
  }

  async getTrackById(id: string): Promise<ITrack> {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new NotFoundException("Track with such id doesn't exist");
    }

    return track;
  }

  async createTrack(dto: Omit<ITrack, 'id'>): Promise<ITrack> {
    const tracks = await this.tracksRepository.create({
      ...dto,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
    });

    return tracks;
  }

  async updateTrack(id: string, dto: Omit<ITrack, 'id'>): Promise<ITrack> {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new NotFoundException();
    }

    const updatedTrack = await this.tracksRepository.update(id, dto);

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new NotFoundException();
    }

    await this.tracksRepository.delete(id);

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
