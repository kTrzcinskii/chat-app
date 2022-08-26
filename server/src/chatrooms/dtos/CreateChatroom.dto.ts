import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

enum PrivacyMode {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export default class CreateChatroomDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(PrivacyMode)
  @IsOptional()
  privacy?: PrivacyMode;
}
