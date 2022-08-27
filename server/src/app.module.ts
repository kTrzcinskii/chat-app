import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [PrismaModule, AuthModule, ChatroomsModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
