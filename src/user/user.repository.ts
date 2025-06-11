import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/Prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(body: Pick<User, 'login' | 'password'>): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        ...body,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        version: 1,
      },
    });

    return user;
  }

  async update(id: string, body: Omit<User, 'id'>): Promise<User> {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...body,
        updatedAt: new Date().getTime(),
        version: { increment: 1 },
      },
    });

    return user;
  }

  async delete(id: string): Promise<User> {
    return await this.prismaService.user.delete({ where: { id } });
  }

  async findOne(dto: Prisma.UserFindFirstArgs): Promise<User | null> {
    const user = await this.prismaService.user.findFirst(dto);

    return user;
  }
}
