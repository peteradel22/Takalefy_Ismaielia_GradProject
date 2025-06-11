import { Controller, Post, Body, Get } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { CreateIncomeDto } from "./dto/create-income.dto";

@Controller("incomes")
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomesService.create(createIncomeDto.income);
  }

  @Get()
  findAll() {
    return this.incomesService.findAll();
  }
}
