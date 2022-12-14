import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
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
    @Inject(forwardRef(() => InvitationsService))
    private invitationsService: InvitationsService,
  ) {}

  async getUserChatrooms(userId: string, query: ChatroomQueryParamDto) {
    const limit = query.limit ?? 10;
    const cursor = query.cursor && { id: query.cursor };
    const where = query.searchTerm
      ? {
          name: { contains: query.searchTerm },
          users: { some: { id: userId } },
        }
      : { users: { some: { id: userId } } };

    const chatrooms = await this.prisma.chatroom.findMany({
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          select: {
            author: { select: { username: true } },
            content: true,
            createdAt: true,
          },
        },
        users: { select: { username: true, id: true } },
      },
      orderBy: { updatedAt: 'desc' },
      cursor,
      where,
      skip: query.cursor ? 1 : 0,
      take: limit,
    });

    const newCursor = chatrooms[limit - 1]?.id;
    const actualChatrooms = chatrooms.map((chatroom) => {
      const { messages, ...rest } = chatroom;
      return {
        lastMessage: {
          username: messages[0]?.author.username,
          content: messages[0]?.content,
          createdAt: messages[0]?.createdAt,
        },
        ...rest,
      };
    });

    return { chatrooms: actualChatrooms, newCursor };
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

  async searchChatrooms(query: SearchChatroomQueryParamDto, userId: string) {
    const limit = query.limit ?? 10;
    const cursor = query.cursor && { id: query.cursor };

    const chatrooms = await this.prisma.chatroom.findMany({
      where: {
        name: { contains: query.name },
        users: { none: { id: userId } },
      },
      cursor,
      skip: query.cursor ? 1 : 0,
      take: limit,
    });

    const newCursor = chatrooms[limit - 1]?.id;

    const finalChatrooms = await Promise.all(
      chatrooms.map(async (chatroom) => {
        const invitation = await this.prisma.invitation.findFirst({
          where: { chatroomId: chatroom.id, invitedUserId: userId },
          include: { invitedBy: { select: { username: true } } },
        });
        const request = await this.prisma.request.findFirst({
          where: { chatroomId: chatroom.id, requestedById: userId },
        });
        const status = request
          ? 'REQUESTED'
          : invitation
          ? 'INVITED'
          : 'NO-STATUS';

        return { ...chatroom, status, request, invitation };
      }),
    );

    return { chatrooms: finalChatrooms, newCursor };
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

  async joinChatroom(userId: string, chatroomId: string) {
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

    const invitation = await this.prisma.invitation.findFirst({
      where: { chatroomId, invitedUserId: userId },
    });

    if (chatroom.privacyMode === 'PUBLIC') {
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
      //todo: implement request
      if (!invitation) {
        throw new ForbiddenException(
          "You can't join private chatroom without invitation",
        );
      }
      await this.invitationsService.deleteInvitation(userId, invitation.id);
      await this.prisma.chatroom.update({
        where: { id: chatroomId },
        data: { users: { connect: { id: userId } } },
      });
      return { successful: true };
    }
  }
}
