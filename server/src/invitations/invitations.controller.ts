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
import InvitationsQueryParamDto from './dtos/InvitationsQueryParam.dto';
import SentInvitationDto from './dtos/SentInvitation.dto';
import { InvitationsService } from './invitations.service';

@UseGuards(JwtAuthGuard)
@Controller(Routes.INVITATIONS)
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @Get()
  async getAllInvitations(
    @Request() req: AuthenticatedRequest,
    @Query() query: InvitationsQueryParamDto,
  ) {
    return this.invitationsService.getAllInvitations(req.user.userId, query);
  }

  @Get(':invitationId')
  async getSingleInvitation(
    @Request() req: AuthenticatedRequest,
    @Param('invitationId') invitationId: string,
  ) {
    return this.invitationsService.getSingleInvitation(
      req.user.userId,
      invitationId,
    );
  }

  @Post('sent')
  async sentInvitation(
    @Request() req: AuthenticatedRequest,
    @Body() dto: SentInvitationDto,
  ) {
    return this.invitationsService.sentInvitation(
      req.user.username,
      req.user.userId,
      dto,
    );
  }
}
