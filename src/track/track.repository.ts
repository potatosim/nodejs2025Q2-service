import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PrismaService } from 'src/database/Prisma.service';

@Injectable()
export class TrackRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Track[]> {
    const tracks = await this.prismaService.track.findMany();
    return tracks;
  }

  async findById(id: string): Promise<Track | undefined> {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    return track;
  }

  async create(body: Omit<Track, 'id'>): Promise<Track> {
    const track = await this.prismaService.track.create({ data: { ...body } });
    return track;
  }

  async update(id: string, body: Omit<Track, 'id'>): Promise<Track> {
    const track = await this.prismaService.track.update({
      where: { id },
      data: { ...body },
    });
    return track;
  }

  async delete(id: string): Promise<Track> {
    return await this.prismaService.track.delete({ where: { id } });
  }

  async findMany(dto: Partial<Track>): Promise<Track[] | null> {
    return await this.prismaService.track.findMany({ where: { ...dto } });
  }
}
