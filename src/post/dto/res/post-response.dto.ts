/* eslint-disable prettier/prettier */
import { ItemStatus } from 'src/post/enums/item-status.enum';

export class ImageResDto {
  id: number;
  url: string;
}

export class ItemResDto {
  id: number;
  name?: string;
  des?: string;
  status: ItemStatus;
  type_id:number;
  images?: ImageResDto[];
}

export class PostResDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  user_id:number;
  item?: ItemResDto;
}
