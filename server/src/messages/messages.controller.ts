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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageEvents, Routes } from 'src/utils/constants';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/AuthenticatedRequest.type';
import AllMessagesQueryParamDto from './dtos/AllMessagesQueryParam.dto';
import CreateMessageDto from './dtos/CreateMessage.dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtAuthGuard)
@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private eventEmitter: EventEmitter2,
  ) {}

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
    const payload = await this.messagesService.createMessage(
      req.user.userId,
      chatroomId,
      dto,
    );
    this.eventEmitter.emit(MessageEvents.CREATED, payload);
    return { message: payload.message };
  }
}
