import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChatroomsService } from 'src/chatrooms/chatrooms.service';
import { PrismaService } from 'src/prisma/prisma.service';
import InvitationsQueryParamDto from './dtos/InvitationsQueryParam.dto';
import SentInvitationDto from './dtos/SentInvitation.dto';

@Injectable()
export class InvitationsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ChatroomsService))
    private chatroomsService: ChatroomsService,
  ) {}

  async getSingleInvitation(userId: string, invitationId: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (
      invitation.invitedUserId !== userId &&
      invitation.invitedById !== userId
    ) {
      throw new ForbiddenException(
        "You don't have permission to get this invitation's data",
      );
    }

    return { invitation };
  }

  async getAllInvitations(userId: string, query: InvitationsQueryParamDto) {
    const limit = query.limit ?? 10;
    const cursor = query.cursor && { id: query.cursor };

    const invitations = await this.prisma.invitation.findMany({
      where: { invitedUserId: userId },
      include: {
        Chatroom: { select: { id: true, name: true } },
        invitedBy: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
      cursor,
      skip: query.cursor ? 1 : 0,
      take: limit,
    });

    const mappedInvitations = invitations.map((invitation) => {
      return {
        invitationId: invitation.id,
        chatroom: { ...invitation.Chatroom },
        sentBy: { ...invitation.invitedBy },
      };
    });

    const newCursor = mappedInvitations[limit - 1]?.invitationId;

    return { invitations: mappedInvitations, newCursor };
  }

  async sentInvitation(
    senderUsername: string,
    senderId: string,
    dto: SentInvitationDto,
  ) {
    const invitedUser = await this.prisma.user.findUnique({
      where: { username: dto.sentToUsername },
      include: { Requests: { select: { chatroomId: true } } },
    });

    if (!invitedUser) {
      throw new NotFoundException('User not found');
    }

    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: dto.chatroomId },
      include: { users: { select: { id: true, username: true } } },
    });

    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    if (chatroom.users.filter((user) => user.id === senderId).length === 0) {
      throw new ForbiddenException(
        "You don't have permisson to invite users to this chatroom",
      );
    }

    if (senderUsername === dto.sentToUsername) {
      throw new BadRequestException('You cannot sent invitation to yourself');
    }

    if (
      chatroom.users.filter((user) => user.username === dto.sentToUsername)
        .length !== 0
    ) {
      throw new BadRequestException('User already in the chatroom');
    }

    if (
      invitedUser.Requests.filter((req) => req.chatroomId === dto.chatroomId)
        .length !== 0
    ) {
      throw new BadRequestException(
        'User already made request to join this chatroom - accept this request instead.',
      );
    }

    const checkIfInvitationExist = await this.prisma.invitation.findFirst({
      where: {
        chatroomId: dto.chatroomId,
        invitedById: senderId,
        invitedUser: { username: dto.sentToUsername },
      },
    });
    if (checkIfInvitationExist) {
      throw new BadRequestException('Invitation has already been sent');
    }

    const newInvitation = await this.prisma.invitation.create({
      data: {
        Chatroom: { connect: { id: dto.chatroomId } },
        invitedBy: { connect: { id: senderId } },
        invitedUser: { connect: { username: dto.sentToUsername } },
      },
    });

    return { invitation: newInvitation };
  }

  async acceptInvitation(userId: string, invitationId: string) {
    const { invitation } = await this.getSingleInvitation(userId, invitationId);
    return this.chatroomsService.joinChatroom(userId, invitation.chatroomId);
  }

  async deleteInvitation(userId: string, invitationId: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id: invitationId },
    });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (
      invitation.invitedById !== userId &&
      invitation.invitedUserId !== userId
    ) {
      throw new ForbiddenException(
        "You don't have permission to delete this invitation",
      );
    }

    await this.prisma.invitation.delete({ where: { id: invitationId } });
    return { successful: true };
  }
}
