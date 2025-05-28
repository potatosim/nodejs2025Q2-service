import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserService } from 'src/services/User.service';

class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  login: string;
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

@Controller('user')
export class UserController {
  public constructor(private readonly usersService: UserService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getById(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.usersService.getById(id);
  }

  @Post()
  createUser(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    body: CreateUserDto,
  ) {
    return this.usersService.createUser(body);
  }

  @Put('/:id')
  updateUserPassword(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserPassword(id, updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}
