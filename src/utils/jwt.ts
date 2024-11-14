import { JwtService } from '@nestjs/jwt';

interface JwtProviderProps {
  sub: string;
  email: string;
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtProviderProps) {
    return { id: payload.sub, email: payload.email };
  }
}

@Injectable()
export class JwtAuthToken {
  constructor(private readonly jwtService: JwtService) {}

  genToken(email: string, id: string | number): Record<string, string> {
    const payload = { email: email, sub: id };
    const auth = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    return {
      auth,
      expiresIn: process.env.JWT_EXPIRESIN,
    };
  }
}
