import {
  BadRequestException,
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
}
