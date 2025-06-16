import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUpToApp(@Body(new ValidationPipe()) dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  signInToApp(@Body(new ValidationPipe()) dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  refreshToken(@Body(new ValidationPipe()) dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
}
