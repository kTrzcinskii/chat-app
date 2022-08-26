import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/AuthenticatedRequest.type';
import { ChatroomsService } from './chatrooms.service';
import CreateChatroomDto from './dtos/CreateChatroom.dto';

@UseGuards(JwtAuthGuard)
@Controller(Routes.CHATROOMS)
export class ChatroomsController {
  constructor(private chatroomsService: ChatroomsService) {}

  @Post('create')
  async createChatroom(
    @Body() dto: CreateChatroomDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.chatroomsService.createChatroom(dto, req.user.userId);
  }
}
