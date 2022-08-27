import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/AuthenticatedRequest.type';
import { MessagesService } from './messages.service';

@UseGuards(JwtAuthGuard)
@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('all/:chatroomId')
  async getAllMessagesFromChatroom(
    @Request() req: AuthenticatedRequest,
    @Param('chatroomId') chatroomId: string,
  ) {
    return this.messagesService.getAllMessagesFromChatroom(
      chatroomId,
      req.user.userId,
    );
  }
}
