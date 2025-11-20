/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';


export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  phone?: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  course?:string;

  @IsInt()
  @IsOptional()
  @Type(()=>Number)
  facilityId?:number;

  @IsNotEmpty()
  @MinLength(8)
  @Match('password', { message: 'Password confirmation does not match password' })
  passwordConfirm: string;

}
