import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid access token');
    }

    const parsedAuthorizationHeader = authorizationHeader
      .replace('Bearer ', '')
      .trim();

    try {
      await this.jwtService.verifyAsync(parsedAuthorizationHeader, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }
}
