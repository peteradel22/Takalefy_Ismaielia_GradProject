import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// Define a type for the JWT payload
interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Use type assertion to fix the "error" typed value
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as unknown as () => string,
    
      ignoreExpiration: false,
      secretOrKey: "SECRET_KEY",
    });
  }

  // Remove async since there's no await, or add eslint disable comment
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
