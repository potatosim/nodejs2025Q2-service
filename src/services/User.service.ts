import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserEntity, UserEntity } from 'src/entities/User.entiy';
import { UserRepository } from 'src/repositories/User.repository';

export interface ICreateUserDto {
  login: string;
  password: string;
}

export interface IUpdateUserDto {
  oldPassword: string;
  newPassword: string;
}

@Injectable()
export class UserService {
  public constructor(private readonly usersRepository: UserRepository) {}

  async getAllUsers(): Promise<IUserEntity[]> {
    const users = await this.usersRepository.findAll();

    return users.map((user) => new UserEntity(user).get());
  }

  async getById(id: string): Promise<IUserEntity> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User with such id doesn't exist");
    }

    return new UserEntity(user).get();
  }

  async createUser(dto: ICreateUserDto): Promise<IUserEntity> {
    const user = await this.usersRepository.create(dto);

    return new UserEntity(user).get();
  }

  async updateUserPassword(
    id: string,
    dto: IUpdateUserDto,
  ): Promise<IUserEntity> {
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

    return new UserEntity(updatedUser).get();
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.delete(id);

    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
