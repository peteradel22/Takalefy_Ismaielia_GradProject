import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { UpdateTransactionDto } from "./dtos/update-transaction.dto";

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTransactionDto) {
    return this.prisma.transaction.create({ data });
  }

  findAll() {
    return this.prisma.transaction.findMany();
  }

  findOne(id: bigint) {
    return this.prisma.transaction.findUnique({
      where: { transaction_id: id },
    });
  }

  update(id: bigint, data: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { transaction_id: id },
      data,
    });
  }

  remove(id: bigint) {
    return this.prisma.transaction.delete({ where: { transaction_id: id } });
  }
}
