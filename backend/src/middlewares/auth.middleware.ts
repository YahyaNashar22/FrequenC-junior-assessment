import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Not Authorized!');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify<{
        userId: string;
        username: string;
      }>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      req['user'] = payload;
      next();
    } catch {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
