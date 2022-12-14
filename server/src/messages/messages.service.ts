import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AllMessagesQueryParamDto from './dtos/AllMessagesQueryParam.dto';
import CreateMessageDto from './dtos/CreateMessage.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getAllMessagesFromChatroom(
    chatroomId: string,
    userId: string,
    query: AllMessagesQueryParamDto,
  ) {
    const limit = query.limit ?? 30;
    const cursor = query.cursor && { id: query.cursor };

    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          cursor,
          skip: query.cursor ? 1 : 0,
          take: limit,
          include: {
            author: {
              select: { username: true },
            },
          },
        },
        users: { select: { id: true } },
      },
    });

    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    if (chatroom.users.filter((user) => user.id === userId).length === 0) {
      throw new ForbiddenException(
        "You don't have permission to see the messages of this chatroom",
      );
    }

    const newCursor = chatroom.messages[limit - 1]?.id;

    return { messages: chatroom.messages, newCursor };
  }

  async createMessage(
    userId: string,
    chatroomId: string,
    dto: CreateMessageDto,
  ) {
    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
      include: {
        users: {
          select: { id: true },
        },
      },
    });
    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    if (chatroom.users.filter((user) => user.id === userId).length === 0) {
      throw new ForbiddenException(
        "You don't have permission to create message in this chatroom",
      );
    }

    const newMessage = await this.prisma.message.create({
      data: {
        content: dto.content,
        author: { connect: { id: userId } },
        Chatroom: { connect: { id: chatroomId } },
      },
    });

    const updatedChatroom = await this.prisma.chatroom.update({
      where: { id: chatroomId },
      data: { updatedAt: new Date() },
      include: { users: { select: { id: true } } },
    });

    return { message: newMessage, users: updatedChatroom.users };
  }
}
