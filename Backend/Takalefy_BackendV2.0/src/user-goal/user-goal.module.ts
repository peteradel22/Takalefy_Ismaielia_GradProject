import { Module } from "@nestjs/common";
import { UserGoalService } from "./user-goal.service";
import { UserGoalController } from "./user-goal.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [UserGoalController],
  providers: [UserGoalService, PrismaService],
})
export class UserGoalModule {}
