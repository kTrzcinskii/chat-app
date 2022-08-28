import { IsNotEmpty } from 'class-validator';

export default class SentInvitationDto {
  @IsNotEmpty()
  sentToUsername: string;

  @IsNotEmpty()
  chatroomId: string;
}
