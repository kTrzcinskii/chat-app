import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
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
  async createRequest() {}

  @Post('accept/:requestId')
  async acceptRequest() {}

  @Delete(':requestId')
  async deleteRequest() {}
}
