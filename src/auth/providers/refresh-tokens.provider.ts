/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import jwtConfig from 'src/config/jwt.config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshTokensProvider {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly generateTokenProvider: GenerateTokensProvider,
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService
    ) { }

    public async refreshTokens(refreshTokenDTO: RefreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync<
                Pick<ActiveUserData, 'sub'>
            >(refreshTokenDTO.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            });
            // Fetch the user from the database
            const user = await this.usersService.findOne(sub);

            // Generate the tokens
            return await this.generateTokenProvider.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException("Please login again!");
        }
    }
}
