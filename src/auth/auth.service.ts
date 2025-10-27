/* eslint-disable prettier/prettier */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(()=>UserService))
        private readonly userService : UserService,
        private readonly signIn : SignInProvider
        
    ){}

    public async signUp(createUserDto:CreateUserDto){
        return await this.userService.create(createUserDto);
    }

    public async login(signInDto:SignInDto){
        return await this.signIn.signIn(signInDto);
    }

   

}
