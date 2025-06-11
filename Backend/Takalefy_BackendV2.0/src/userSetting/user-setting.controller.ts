import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { UserSettingService } from "./user-setting.service";
import { CreateUserSettingDto } from "./dto/create-user-setting.dto";
import { UpdateUserSettingDto } from "./dto/update-user-setting.dto";

@Controller("user-settings")
export class UserSettingController {
  constructor(private readonly service: UserSettingService) {}

  @Post()
  create(@Body() dto: CreateUserSettingDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateUserSettingDto) {
    return this.service.update(BigInt(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(BigInt(id));
  }
}
