/* eslint-disable prettier/prettier */

import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateItemDto } from './create-item.dto';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsInt()
  @Type(()=>Number)
  facility_id?: number;
  @IsOptional()
  @Type(()=>Number)
  room_id?: number;
  @ValidateNested()
  @Type(()=>CreateItemDto)
  item: CreateItemDto;
}
