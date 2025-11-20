/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsInt()
  facilityId?: number;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @Match('password', {
    message: 'Password confirmation does not match password',
  })
  passwordConfirm: string;
}
