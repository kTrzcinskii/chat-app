import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/utils/types/AuthenticatedRequest.type';
import CreateRequestDto from './dtos/CreateRequest.dto';
import { RequestsService } from './requests.service';

@UseGuards(JwtAuthGuard)
@Controller(Routes.REQUESTS)
export class RequestsController {
  constructor(private requestsService: RequestsService) {}

  @Get('all')
  async getAllUserRequests() {}

  @Get('single/:requestId')
  async getSingleRequest() {}

  @Get('/chatroom/:chatroomId')
  async getChatroomRequests() {}

  @Post('create')
  async createRequest(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreateRequestDto,
  ) {
    return this.requestsService.createRequest(req.user.userId, dto);
  }

  @Post('accept/:requestId')
  async acceptRequest(
    @Request() req: AuthenticatedRequest,
    @Param('requestId') requestId: string,
  ) {
    return this.requestsService.acceptRequest(req.user.userId, requestId);
  }

  @Delete(':requestId')
  async deleteRequest(
    @Request() req: AuthenticatedRequest,
    @Param('requestId') requestId: string,
  ) {
    return this.requestsService.deleteRequest(req.user.userId, requestId);
  }
}
