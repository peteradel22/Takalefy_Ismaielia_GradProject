import { IsBoolean, IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateNotificationDto {
  @IsInt()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  is_read: boolean;
}
