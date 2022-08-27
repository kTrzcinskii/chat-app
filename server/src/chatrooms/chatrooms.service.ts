import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateChatroomDto from './dtos/CreateChatroom.dto';

@Injectable()
export class ChatroomsService {
  constructor(private prisma: PrismaService) {}

  async getUserChatrooms(userId: string) {
    //TODO: chatrooms pagination
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        Chatrooms: {
          include: {
            messages: { take: 1, orderBy: { createdAt: 'desc' } },
            users: { select: { username: true, id: true } },
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { chatrooms: user.Chatrooms };
  }

  async getChatroom(userId: string, chatroomId: string) {
    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
      include: {
        users: { select: { id: true, username: true } },
      },
    });
    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    if (chatroom.users.filter((user) => user.id === userId).length === 0) {
      throw new ForbiddenException(
        "You don't have permission to see the data of this chatroom",
      );
    }

    return { chatroom };
  }

  async createChatroom(dto: CreateChatroomDto, authorId: string) {
    const user = this.prisma.user.findUnique({ where: { id: authorId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const newChatroom = await this.prisma.chatroom.create({
        data: {
          name: dto.name,
          privacyMode: dto.privacy ?? 'PUBLIC',
          users: { connect: { id: authorId } },
        },
      });

      return { chatroomId: newChatroom.id };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException(
          'Provided chatroom name is already in use',
        );
      }
      throw error;
    }
  }
}
