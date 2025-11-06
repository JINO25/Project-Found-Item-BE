/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { password_reset } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PasswordResetDTO } from './dto/password-reset.dto';
import { HashingProvider } from './providers/hashing.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly signIn: SignInProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signUp(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  public async validateGoogleAuthen(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (!user) {
      return await this.userService.create(createUserDto);
    } else {
      return user;
    }
  }

  public async login(signInDto: SignInDto) {
    return await this.signIn.signIn(signInDto);
  }

  public async loginWithGoogle(googleUser: any) {
    const user = await this.userService.findOneByEmail(googleUser.email);
    if (!user)
      throw new NotFoundException(
        `User not found with email: ${googleUser.email}`,
      );
    const { accessToken, refreshToken } =
      await this.generateTokensProvider.generateTokens(user);
    return { accessToken, refreshToken };
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }

  public async verifyToken(token: string) {
    const hashedToken = createHash('sha256').update(token).digest('hex');

    const record = await this.prisma.password_reset.findFirst({
      where: {
        token: hashedToken,
      },
    });

    if (!record) {
      throw new NotFoundException(`Not found User`);
    }

    const check = this.isTokenValid(record);

    if (!check) {
      throw new BadRequestException('Token is expired!Token is expired!');
    }

    return {
      email: record.email,
      valid: true,
    };
  }

  private isTokenValid(record: password_reset): boolean {
    const now = new Date();
    const expires = new Date(record.expires);

    return now.getTime() < expires.getTime();
  }

  public async forgotPassword(email: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user)
      throw new NotFoundException(
        `User not found with email: ${email}`,
      );

    const token = randomBytes(32).toString('hex');

    const hashedToken = createHash('sha256').update(token).digest('hex');

    await this.prisma.password_reset.create({
      data: {
        email: email,
        token: hashedToken,
        expires: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await this.mailService.sendForgotPasswordEmail(user.email, token);

    return { message: 'Reset password email sent' };
  }

  async resetPassword(pwdResetDTO: PasswordResetDTO, token: string) {
    const { valid, email } = await this.verifyToken(token);

    if (!valid) {
      throw new BadRequestException(`Token expired, please send email again!`);
    }

    if (!email) {
      throw new BadRequestException('Email not found for this token');
    }

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    const hashPass = await this.hashingProvider.hashPassword(
      pwdResetDTO.password,
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPass,
      },
    });

    await this.prisma.password_reset.deleteMany({
      where: { email },
    });

    return { message: 'Password reset successfully' };
  }
}
