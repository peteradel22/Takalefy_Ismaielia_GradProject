import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateNotificationDto) {
    return this.prisma.notification.create({ data });
  }

  findAll() {
    return this.prisma.notification.findMany();
  }

  findOne(id: bigint) {
    return this.prisma.notification.findUnique({
      where: { notification_id: id },
    });
  }

  update(id: bigint, data: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: { notification_id: id },
      data,
    });
  }

  remove(id: bigint) {
    return this.prisma.notification.delete({ where: { notification_id: id } });
  }
}
