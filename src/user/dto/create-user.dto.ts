import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  login: string;
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
