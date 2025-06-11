import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./category.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create(userId: bigint, dto: CreateCategoryDto) {
    return this.categoryRepository.create(userId, dto);
  }

  findAll(userId: bigint) {
    return this.categoryRepository.findAll(userId);
  }
}
