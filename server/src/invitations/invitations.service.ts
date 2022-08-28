import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import SentInvitationDto from './dtos/SentInvitation.dto';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  async getSingleInvitation(userId: string, invitationId: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.invitedUserId !== userId) {
      throw new ForbiddenException(
        "You don't have permission to get this invitation's data",
      );
    }
  }

  async getAllInvitations(userId: string) {
    //todo: add pagination

    const invitations = await this.prisma.invitation.findMany({
      where: { invitedUserId: userId },
      include: {
        Chatroom: { select: { id: true, name: true } },
        invitedBy: { select: { id: true, username: true } },
      },
    });

    const mappedInvitations = invitations.map((invitation) => {
      return {
        invitationId: invitation.id,
        chatroom: { ...invitation.Chatroom },
        sentBy: { ...invitation.invitedBy },
      };
    });

    return { invitations: mappedInvitations };
  }

  async sentInvitation(
    senderUsername: string,
    senderId: string,
    dto: SentInvitationDto,
  ) {
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
}
