import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  create(@Body() dto: CreateNotificationDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateNotificationDto) {
    return this.service.update(BigInt(id), dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(BigInt(id));
  }
}
