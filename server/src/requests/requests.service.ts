import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateRequestDto from './dtos/CreateRequest.dto';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async createRequest(userId: string, dto: CreateRequestDto) {
    const chatroom = await this.prisma.chatroom.findUnique({
      where: { id: dto.chatroomId },
      include: { users: { select: { id: true } } },
    });

    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    if (chatroom.privacyMode === 'PUBLIC') {
      throw new BadRequestException(
        "You don't have to request to join public chatrooms",
      );
    }

    if (chatroom.users.filter((user) => user.id === userId).length !== 0) {
      throw new BadRequestException('You have already joined to this chatroom');
    }

    const invitation = await this.prisma.invitation.findFirst({
      where: { chatroomId: dto.chatroomId, invitedUserId: userId },
    });

    if (invitation) {
      throw new BadRequestException(
        'You have already been invited to this chatroom',
      );
    }

    const newRequest = await this.prisma.request.create({
      data: {
        Chatroom: { connect: { id: dto.chatroomId } },
        requestedBy: { connect: { id: userId } },
      },
    });

    return { request: newRequest };
  }

  async acceptRequest(userId: string, requestId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
      include: { Chatroom: { select: { users: { select: { id: true } } } } },
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }
    if (
      request.Chatroom.users.filter((user) => user.id === userId).length === 0
    ) {
      throw new ForbiddenException("You can't accept this request");
    }

    await this.prisma.chatroom.update({
      where: { id: request.chatroomId },
      data: { users: { connect: { id: request.requestedById } } },
    });
    await this.deleteRequest(userId, requestId);
    return { successful: true };
  }

  async deleteRequest(userId: string, requestId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
      include: { Chatroom: { select: { users: { select: { id: true } } } } },
    });
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    if (
      request.requestedById !== userId &&
      request.Chatroom.users.filter((user) => user.id === userId).length === 0
    ) {
      throw new ForbiddenException("You can't delete this request");
    }
    await this.prisma.request.delete({ where: { id: requestId } });
    return { successful: true };
  }

  async getSingleRequest(userId: string, requestId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
      include: { Chatroom: { select: { users: { select: { id: true } } } } },
    });
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    if (
      request.requestedById !== userId &&
      request.Chatroom.users.filter((user) => user.id === userId).length === 0
    ) {
      throw new ForbiddenException("You can't access this request");
    }

    const { Chatroom, ...actualRequest } = request;

    return { request: actualRequest };
  }
}
