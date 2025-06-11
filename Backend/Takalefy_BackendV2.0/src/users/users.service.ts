import { Injectable, ConflictException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    console.log("Received DTO:", dto);

    const existingUser = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new ConflictException("Username is already taken");
    }

    if (!dto.password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password_hash: hashedPassword,
        full_name: dto.name,
        preferred_currency: dto.currency,
      },
    });

    return newUser;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { user_id: id },
    });
  }
}
