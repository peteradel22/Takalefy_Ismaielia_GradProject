import { IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  icon_key: string;
}
