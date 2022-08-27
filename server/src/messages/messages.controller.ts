import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/AuthenticatedRequest.type';
import AllMessagesQueryParamDto from './dtos/AllMessagesQueryParam.dto';
import CreateMessageDto from './dtos/CreateMessage.dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtAuthGuard)
@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('all/:chatroomId')
  async getAllMessagesFromChatroom(
    @Request() req: AuthenticatedRequest,
    @Param('chatroomId') chatroomId: string,
    @Query() query: AllMessagesQueryParamDto,
  ) {
    return this.messagesService.getAllMessagesFromChatroom(
      chatroomId,
      req.user.userId,
      query,
    );
  }

  @Post(':chatroomId')
  async createMessage(
    @Request() req: AuthenticatedRequest,
    @Param('chatroomId') chatroomId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.messagesService.createMessage(req.user.userId, chatroomId, dto);
  }
}
