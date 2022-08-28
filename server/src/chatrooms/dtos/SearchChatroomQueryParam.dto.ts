import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class SearchChatroomQueryParamDto {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  cursor?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
