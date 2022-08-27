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
import { ChatroomsService } from './chatrooms.service';
import { ChatroomQueryParamDto } from './dtos/ChatroomQueryParam.dto';
import CreateChatroomDto from './dtos/CreateChatroom.dto';

@UseGuards(JwtAuthGuard)
@Controller(Routes.CHATROOMS)
export class ChatroomsController {
  constructor(private chatroomsService: ChatroomsService) {}

  @Get()
  async getUserChatrooms(
    @Request() req: AuthenticatedRequest,
    @Query() query: ChatroomQueryParamDto,
  ) {
    return this.chatroomsService.getUserChatrooms(req.user.userId, query);
  }

  @Get(':id')
  async getChatroom(
    @Request() req: AuthenticatedRequest,
    @Param('id') chatroomId: string,
  ) {
    return this.chatroomsService.getChatroom(req.user.userId, chatroomId);
  }

  @Post('create')
  async createChatroom(
    @Body() dto: CreateChatroomDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.chatroomsService.createChatroom(dto, req.user.userId);
  }
}
