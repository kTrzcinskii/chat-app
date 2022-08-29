import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { InvitationsService } from 'src/invitations/invitations.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatroomQueryParamDto } from './dtos/ChatroomQueryParam.dto';
import CreateChatroomDto from './dtos/CreateChatroom.dto';
import SearchChatroomQueryParamDto from './dtos/SearchChatroomQueryParam.dto';

@Injectable()
export class ChatroomsService {
  constructor(
    private prisma: PrismaService,
    private invitationsService: InvitationsService,
  ) {}

  async getUserChatrooms(userId: string, query: ChatroomQueryParamDto) {
    const limit = query.limit ?? 10;
    const cursor = query.cursor && { id: query.cursor };

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        Chatrooms: {
          include: {
            messages: { take: 1, orderBy: { createdAt: 'desc' } },
            users: { select: { username: true, id: true } },
          },
          orderBy: {
            updatedAt: 'desc',
          },
          cursor,
          skip: query.cursor ? 1 : 0,
          take: limit,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newCursor = user.Chatrooms[limit - 1]?.id;

    return { chatrooms: user.Chatrooms, newCursor };
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

  async searchChatrooms(query: SearchChatroomQueryParamDto) {
    const limit = query.limit ?? 10;
    const cursor = query.cursor && { id: query.cursor };

    const chatrooms = await this.prisma.chatroom.findMany({
      where: { name: { contains: query.name } },
      cursor,
      skip: query.cursor ? 1 : 0,
      take: limit,
    });

    const newCursor = chatrooms[limit - 1]?.id;

    return { chatrooms, newCursor };
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

  async joinChatroom(userId, chatroomId) {
    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: chatroomId },
      include: { users: { select: { id: true } } },
    });

    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    if (chatroom.users.filter((user) => user.id === userId).length !== 0) {
      throw new BadRequestException('You have already joined to this chatroom');
    }

    if (chatroom.privacyMode === 'PUBLIC') {
      const invitation = await this.prisma.invitation.findFirst({
        where: { chatroomId, invitedUserId: userId },
      });
      if (invitation) {
        await this.invitationsService.deleteInvitation(userId, invitation.id);
      }
      await this.prisma.chatroom.update({
        where: { id: chatroomId },
        data: { users: { connect: { id: userId } } },
      });
      return { successful: true };
    }

    if (chatroom.privacyMode === 'PRIVATE') {
      //todo
      throw new BadRequestException('not implemented');
    }
  }
}
