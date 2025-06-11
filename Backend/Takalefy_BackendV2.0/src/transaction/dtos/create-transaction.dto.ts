import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsInt,
} from "class-validator";

export class CreateTransactionDto {
  @IsInt()
  user_id: number;

  @IsInt()
  category_id: number;

  @IsNumber()
  amount: number;

  @IsString()
  type: string;

  @IsDateString()
  occurred_at: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
