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
    //todo: messages pagination
    const chatroom = await this.prisma.chatroom.findFirst({
      where: { id: chatroomId, users: { some: { id: userId } } },
      include: {
        users: { select: { id: true, username: true } },
        messages: true,
      },
    });
    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
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
