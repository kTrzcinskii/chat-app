import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Message } from '@prisma/client';
import { Server } from 'socket.io';
import { FRONTEND_ORIGIN, MessageEvents } from './utils/constants';

@WebSocketGateway({ cors: { origin: FRONTEND_ORIGIN, credentials: true } })
export class MainGateway {
  @WebSocketServer() server: Server;

  @OnEvent(MessageEvents.CREATED)
  async handleMessageCreatead(payload: {
    message: Message;
    users: {
      id: string;
    }[];
  }) {
    this.server.emit(MessageEvents.CREATED, {
      chatroomId: payload.message.chatroomId,
      users: payload.users,
      content: payload.message.content,
    });
  }
}
