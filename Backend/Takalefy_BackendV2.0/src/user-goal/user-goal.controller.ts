import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { UserGoalService } from "./user-goal.service";
import { CreateUserGoalDto } from "./dto/create-user-goal.dto";
import { UpdateUserGoalDto } from "./dto/update-user-goal.dto";

@Controller("user-goals")
export class UserGoalController {
  constructor(private readonly service: UserGoalService) {}

  @Post()
  create(@Body() dto: CreateUserGoalDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(BigInt(id));
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUserGoalDto) {
    return this.service.update(BigInt(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(BigInt(id));
  }
}
