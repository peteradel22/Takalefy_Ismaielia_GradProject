import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: bigint, dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        user_id: userId,
        name: dto.name,
        type: dto.type,
        icon_key: dto.icon_key,
      },
    });
  }

  findAll(userId: bigint) {
    return this.prisma.category.findMany({
      where: { user_id: userId },
    });
  }
}
