/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { role, user } from '@prisma/client';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';

type UserWithRole = user & { role: role };

@Injectable()
export class GenerateTokensProvider {
    constructor(       
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }

    public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                // audience: this.jwtConfiguration.audience,
                // issuer: this.jwtConfiguration.issuer,
                // secret: this.jwtConfiguration.secret,
                expiresIn,
            },
        );
    }

    public async generateTokens(user: UserWithRole) {
        const [accessToken, refreshToken] = await Promise.all([
            // Generate Access Token with Email
            this.signToken<Partial<ActiveUserData>>(
                user.id,
                this.jwtConfiguration.accessTokenTtl,
                {
                    email: user.email,
                    role: user.role.role!,
                },
            ),

            // Generate Refresh token without email
            this.signToken(
                user.id,
                this.jwtConfiguration.refreshTokenTtl,
                {
                    role: user.role.role
                }
            ),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
}