import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserGoalDto } from "./dto/create-user-goal.dto";
import { UpdateUserGoalDto } from "./dto/update-user-goal.dto";

@Injectable()
export class UserGoalService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserGoalDto) {
    return this.prisma.userGoal.create({ data });
  }

  findAll() {
    return this.prisma.userGoal.findMany();
  }

  findOne(id: bigint) {
    return this.prisma.userGoal.findUnique({ where: { goal_id: id } });
  }

  update(id: bigint, data: UpdateUserGoalDto) {
    return this.prisma.userGoal.update({
      where: { goal_id: id },
      data,
    });
  }

  remove(id: bigint) {
    return this.prisma.userGoal.delete({ where: { goal_id: id } });
  }
}
