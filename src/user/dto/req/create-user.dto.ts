/* eslint-disable prettier/prettier */
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  course?:string;

  @IsInt()
  @IsOptional()
  facilityId?:number;

  @IsNotEmpty()
  @MinLength(6)
  @Match('password', { message: 'Password confirmation does not match password' })
  passwordConfirm: string;

}
