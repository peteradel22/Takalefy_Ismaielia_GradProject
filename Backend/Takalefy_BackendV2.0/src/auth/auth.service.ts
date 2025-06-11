import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import * as bcrypt from "bcrypt";

interface UserPayload {
  user_id: bigint;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return this.login(user);
  }

  async validateUser(email: string, password: string): Promise<UserPayload> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return {
        user_id: user.user_id,
        email: user.email,
      };
    }
    throw new UnauthorizedException("Invalid credentials");
  }

  login(user: UserPayload) {
    const payload = {
      email: user.email,
      sub: user.user_id.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
