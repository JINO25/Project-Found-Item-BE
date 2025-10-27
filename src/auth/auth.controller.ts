/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Roles } from './enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-in')
  @Auth([Roles.None])
  @HttpCode(HttpStatus.OK)
  async signIn(@Res({ passthrough: true }) res, @Body() dto:SignInDto) {

    const { accessToken, refreshToken } = await this.authService.login(dto);    

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 ngay
      sameSite: 'lax',
    });

    return 'login successful';
  }

  @Post('sign-up')
  @Auth([Roles.None])
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto:CreateUserDto) {
    await this.authService.signUp(dto);
    return 'Sign up account successfully';
  }

  @Auth([Roles.User])
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
