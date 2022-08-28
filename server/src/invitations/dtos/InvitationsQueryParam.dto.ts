import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export default class InvitationsQueryParamDto {
  @IsNotEmpty()
  @IsOptional()
  cursor?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
