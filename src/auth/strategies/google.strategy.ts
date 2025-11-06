/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';
import googleConfig from 'src/config/google.config';
import { HashingProvider } from '../providers/hashing.provider';
import { AuthService } from '../auth.service';
import { randomBytes } from 'crypto';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleConfig>,
    private readonly hashPass: HashingProvider,
    private readonly authen: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const randomPassword = randomBytes(32).toString('hex');
    const data = {
      email: emails[0].value,
      name: `${name.familyName} ${name.givenName}`,
      phone: '',
      avatar: photos[0].value,
      password: randomPassword,
      passwordConfirm: randomPassword,
    };

    return await this.authen.validateGoogleAuthen(data);
  }
}
