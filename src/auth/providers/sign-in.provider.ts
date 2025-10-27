/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    Inject,
    Injectable,
    RequestTimeoutException,
    UnauthorizedException,
    forwardRef,
} from '@nestjs/common';

import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { SignInDto } from '../dto/signin.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SignInProvider {
    constructor(
        // Injecting UserService
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        /**
         * Inject the hashingProvider
         */
        private readonly hashingProvider: HashingProvider,

        /**
         * Inject generateTokensProvider
         */
        private readonly generateTokensProvider: GenerateTokensProvider,
    ) { }

    public async signIn(signInDto: SignInDto) {    
        let user = await this.usersService.findOneByEmail(signInDto.email);      

        let isEqual: boolean = false;

        try {            
            isEqual = await this.hashingProvider.comparePassword(
                signInDto.password,
                user.password,
            );
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not compare the password',
            });
        }

        if (!isEqual) {
            throw new UnauthorizedException('Password does not match');
        }

        return await this.generateTokensProvider.generateTokens(user);
    }
}