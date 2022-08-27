import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getAllMessagesFromChatroom(chatroomId: string, userId: string) {
    //todo: messages pagination
    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
      include: {
        messages: { orderBy: { createdAt: 'desc' } },
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

    return { messages: chatroom.messages };
  }
}
