import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackRepository } from 'src/repositories/Track.repository';
import { ITrack } from 'src/types';

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
      throw new NotFoundException("Album with such id doesn't exist");
    }

    return track;
  }

  async createTrack(dto: Omit<ITrack, 'id'>): Promise<ITrack> {
    const artistId = dto['artistId'] ? dto['artistId'] : null;
    const albumId = dto['albumId'] ? dto['albumId'] : null;

    const tracks = await this.tracksRepository.create({
      ...dto,
      artistId,
      albumId,
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
