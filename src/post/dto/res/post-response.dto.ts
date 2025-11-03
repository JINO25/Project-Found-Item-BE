/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import { ItemStatus } from 'src/post/enums/item-status.enum';

export class ImageResDto {
  @Expose()
  id: number;

  @Expose()
  url: string;
}

export class ItemResDto {
  @Expose()
  id: number;

  @Expose()
  name?: string;

  @Expose()
  des?: string;

  @Expose()
  status: ItemStatus;

  @Expose()
  type_id: number;

  @Expose()
  @Type(() => ImageResDto)
  images?: ImageResDto[];
}

export class PostResDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  create_At: Date;

  @Expose()
  user_id: number;

  @Expose()
  @Type(() => ItemResDto)
  item?: ItemResDto;
}
