import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from 'src/album/album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumResponseDto } from './dto/album-response.dto';
import { plainToInstance } from 'class-transformer';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  public constructor(
    private readonly albumsRepository: AlbumRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAllAlbums(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumsRepository.findAll();

    return albums.map((album) => plainToInstance(AlbumResponseDto, album));
  }

  async getAlbumById(id: string): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.findById(id);

    if (!album) {
      throw new NotFoundException("Album with such id doesn't exist");
    }

    return plainToInstance(AlbumResponseDto, album);
  }

  async createAlbum(dto: CreateAlbumDto): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.create({
      ...dto,
      artistId: dto.artistId ?? null,
    });

    return plainToInstance(AlbumResponseDto, album);
  }

  async updateAlbum(
    id: string,
    dto: UpdateAlbumDto,
  ): Promise<AlbumResponseDto> {
    const album = await this.albumsRepository.findById(id);

    if (!album) {
      throw new NotFoundException();
    }

    const updatedAlbum = await this.albumsRepository.update(id, {
      ...album,
      ...dto,
    });

    return plainToInstance(AlbumResponseDto, updatedAlbum);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumsRepository.findById(id);

    if (!album) {
      throw new NotFoundException();
    }

    await this.albumsRepository.delete(id);

    this.eventEmitter.emit('album.delete', id);

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }

  @OnEvent('artist.delete')
  private async handleArtistDelete(artistId: string) {
    const albumsToUpdate = await this.albumsRepository.findMany({
      artistId,
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
  }
}
