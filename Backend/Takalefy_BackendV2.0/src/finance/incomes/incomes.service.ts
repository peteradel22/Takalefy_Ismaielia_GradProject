import { Injectable } from "@nestjs/common";

@Injectable()
export class IncomesService {
  private incomes: number[] = [];

  create(income: number) {
    this.incomes.push(income);
    return { message: "Income added successfully", incomes: this.incomes };
  }

  findAll() {
    return this.incomes;
  }
}
