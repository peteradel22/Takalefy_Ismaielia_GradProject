import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post(":userId")
  async create(
    @Param("userId") userId: string,
    @Body() dto: CreateCategoryDto,
  ) {
    const result = await this.service.create(BigInt(userId), dto);

    return {
      ...result,
      user_id: result.user_id.toString(),
      category_id: result.category_id.toString(),
    };
  }

  @Get(":userId")
  async findAll(@Param("userId") userId: string) {
    const results = await this.service.findAll(BigInt(userId));

    return results.map((item) => ({
      ...item,
      user_id: item.user_id.toString(),
      category_id: item.category_id.toString(),
    }));
  }
}
