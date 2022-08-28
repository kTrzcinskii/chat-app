import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { LocalAuthGuard } from '../utils/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
