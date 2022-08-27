import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export default class AllMessagesQueryParamDto {
  @IsNotEmpty()
  @IsOptional()
  cursor?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
