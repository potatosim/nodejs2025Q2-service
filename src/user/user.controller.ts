import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth.quard';

@Controller('user')
@UseGuards(AuthGuard)
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
