/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ItemStatus } from 'src/post/enums/item-status.enum';

export class CreateItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  des?: string;

  @IsInt()
  @Type(()=>Number)
  type_id: number;

  @IsEnum(ItemStatus)
  status: ItemStatus;
}
