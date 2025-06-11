import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserSettingDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsString()
  profile_image?: string;
}
