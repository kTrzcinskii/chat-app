import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { MessagesModule } from './messages/messages.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [PrismaModule, AuthModule, ChatroomsModule, MessagesModule, InvitationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
