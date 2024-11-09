import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IClientRepository } from 'src/domain/interfaces/client.repository';

interface JwtProviderProps {
  sub: string;
  email: string;
}

export class JwtProvider extends PassportStrategy(Strategy) {
  constructor(private readonly clientRepository: IClientRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtProviderProps) {
    try {
      const client = await this.clientRepository.findById(payload.sub);
      return client;
    } catch (_) {
      throw new UnauthorizedException('Invalid jwt token.');
    }
  }
}

@Injectable()
export class JwtAuthToken {
  constructor(private readonly jwtService: JwtService) {}

  genToken(email: string, id: string | number): Record<string, string> {
    const payload = { email: email, sub: id };
    const auth = this.jwtService?.sign(payload);
    return {
      auth,
      expiresIn: process.env.JWT_EXPIRESIN,
    };
  }
}
