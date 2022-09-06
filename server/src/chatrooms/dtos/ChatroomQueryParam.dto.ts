import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ChatroomQueryParamDto {
  @IsNotEmpty()
  @IsOptional()
  cursor?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNotEmpty()
  searchTerm?: string;
}
