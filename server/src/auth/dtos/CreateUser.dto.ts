import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(32)
  username: string;

  @IsNotEmpty()
  @MaxLength(32)
  password: string;
}
