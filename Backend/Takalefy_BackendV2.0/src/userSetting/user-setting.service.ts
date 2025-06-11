import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserSettingDto } from "./dto/create-user-setting.dto";
import { UpdateUserSettingDto } from "./dto/update-user-setting.dto";

@Injectable()
export class UserSettingService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserSettingDto) {
    return this.prisma.userSetting.create({ data });
  }

  findAll() {
    return this.prisma.userSetting.findMany();
  }

  findOne(id: bigint) {
    return this.prisma.userSetting.findUnique({
      where: { user_setting_id: id },
    });
  }

  update(id: bigint, data: UpdateUserSettingDto) {
    return this.prisma.userSetting.update({
      where: { user_setting_id: id },
      data,
    });
  }

  remove(id: bigint) {
    return this.prisma.userSetting.delete({ where: { user_setting_id: id } });
  }
}
