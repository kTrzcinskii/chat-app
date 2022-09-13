import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatroomsModule } from './chatrooms/chatrooms.module';
import { MessagesModule } from './messages/messages.module';
import { InvitationsModule } from './invitations/invitations.module';
import { RequestsModule } from './requests/requests.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MainGateway } from './main.gateway';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ChatroomsModule,
    MessagesModule,
    InvitationsModule,
    RequestsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [MainGateway],
})
export class AppModule {}
