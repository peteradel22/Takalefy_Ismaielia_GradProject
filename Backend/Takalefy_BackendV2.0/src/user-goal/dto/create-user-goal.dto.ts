import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserGoalDto {
  @IsInt()
  user_id: number;
  is_done: boolean;
  @IsString()
  @IsNotEmpty()
  goal_text: string;
}
