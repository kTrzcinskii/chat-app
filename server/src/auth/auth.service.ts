import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const { hashedPassword, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const newUser = await this.prismaService.user.create({
        data: { username: dto.username, hashedPassword },
      });
      const { hashedPassword: _, ...result } = newUser;
      return this.login(result);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Provided username is already in use');
      }
      throw error;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
