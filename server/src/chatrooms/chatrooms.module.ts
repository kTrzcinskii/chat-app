import { Module } from '@nestjs/common';
import { InvitationsModule } from 'src/invitations/invitations.module';
import { ChatroomsController } from './chatrooms.controller';
import { ChatroomsService } from './chatrooms.service';

@Module({
  controllers: [ChatroomsController],
  providers: [ChatroomsService],
  imports: [InvitationsModule],
})
export class ChatroomsModule {}
