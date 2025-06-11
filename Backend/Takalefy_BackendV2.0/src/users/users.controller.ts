import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  async findUser(@Param("id") id: string) {
    const userId = Number(id);
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException("User not found");

    const { password_hash, ...rest } = user;
    return rest;
  }
}
