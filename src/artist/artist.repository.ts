import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    const artists = await this.prismaService.artist.findMany();

    return artists;
  }

  async findById(id: string): Promise<Artist | null> {
    const artist = await this.prismaService.artist.findUnique({
      where: {
        id,
      },
    });

    return artist;
  }

  async create(body: Omit<Artist, 'id'>): Promise<Artist> {
    const artist = await this.prismaService.artist.create({
      data: {
        ...body,
      },
    });

    return artist;
  }

  async update(id: string, body: Omit<Artist, 'id'>): Promise<Artist> {
    const artist = await this.prismaService.artist.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    return artist;
  }

  async delete(id: string): Promise<Artist> {
    return await this.prismaService.artist.delete({
      where: { id },
    });
  }
}
