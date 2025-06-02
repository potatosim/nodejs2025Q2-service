import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  public constructor(private readonly usersRepository: UserRepository) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();

    return users.map((user) =>
      plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async getById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User with such id doesn't exist");
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepository.create(dto);

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async updateUserPassword(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException();
    }

    const updatedUser = await this.usersRepository.update(id, {
      ...user,
      password: dto.newPassword,
    });

    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.delete(id);

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
