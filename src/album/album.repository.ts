import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Album[]> {
    const albums = await this.prismaService.album.findMany();

    return albums;
  }

  async findById(id: string): Promise<Album | undefined> {
    const album = await this.prismaService.album.findUnique({
      where: {
        id,
      },
    });

    return album;
  }

  async create(body: Omit<Album, 'id'>): Promise<Album> {
    const album = await this.prismaService.album.create({
      data: {
        ...body,
      },
    });

    return album;
  }

  async update(id: string, body: Omit<Album, 'id'>): Promise<Album> {
    const album = await this.prismaService.album.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    return album;
  }

  async delete(id: string): Promise<Album> {
    return await this.prismaService.album.delete({
      where: {
        id,
      },
    });
  }

  async findMany(dto: Partial<Album>): Promise<Album[] | null> {
    return await this.prismaService.album.findMany({
      where: {
        ...dto,
      },
    });
  }
}
