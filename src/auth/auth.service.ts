import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signup.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/user/user.repository';
import { RefreshDto } from './dto/refresh.dto';

type TokenPayload = { userId: string; login: string };

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<SignUpResponseDto> {
    const cryptSalt = +this.configService.get('CRYPT_SALT') || 10;
    const hashedPassword = await hash(dto.password, cryptSalt);

    const user = await this.userRepository.create({
      login: dto.login,
      password: hashedPassword,
    });

    return plainToInstance(SignUpResponseDto, { id: user.id });
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        login: dto.login,
      },
    });

    if (!user) {
      throw new ForbiddenException("User login/password doesn't match");
    }

    const { password } = user;

    const isValidPassword = await compare(dto.password, password);

    if (!isValidPassword) {
      throw new ForbiddenException("User login/password doesn't match");
    }

    const tokens = await this.generateTokens({
      login: user.login,
      userId: user.id,
    });

    return plainToInstance(AuthResponseDto, tokens);
  }

  async refresh(dto: RefreshDto): Promise<AuthResponseDto> {
    if (!dto.refreshToken) {
      throw new UnauthorizedException('Please, provide refresh token');
    }

    const payload = await this.jwtService.verifyAsync<TokenPayload>(
      dto.refreshToken,
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      },
    );

    const tokens = await this.generateTokens(payload);

    return plainToInstance(AuthResponseDto, tokens);
  }

  private async generateTokens(
    payload: TokenPayload,
  ): Promise<AuthResponseDto> {
    const accessToken = await this.jwtService.signAsync(
      {
        userId: payload.userId,
        login: payload.login,
      },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: payload.userId,
        login: payload.login,
      },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      },
    );

    return { accessToken, refreshToken };
  }
}
