import { Module } from "@nestjs/common";
import { UserSettingService } from "./user-setting.service";
import { UserSettingController } from "./user-setting.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [UserSettingController],
  providers: [UserSettingService, PrismaService],
})
export class UserSettingModule {}
