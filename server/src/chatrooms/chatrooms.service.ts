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
