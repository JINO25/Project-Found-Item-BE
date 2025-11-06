/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UserModule } from 'src/user/user.module';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { MailModule } from 'src/mail/mail.module';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule,
    forwardRef(()=>UserModule),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard, GoogleStrategy,
    {
      provide:HashingProvider,
      useClass:BcryptProvider
    },
    GenerateTokensProvider,
    RefreshTokensProvider,
    SignInProvider,
  ],
  exports: [JwtAuthGuard, RolesGuard, HashingProvider],
})
export class AuthModule {}
