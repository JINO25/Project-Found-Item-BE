/* eslint-disable prettier/prettier */
import { Expose, Type } from 'class-transformer';
import { ItemStatus } from 'src/post/enums/item-status.enum';

export class ImageResDto {
  @Expose()
  id: number;

  @Expose()
  url: string;
}
export class RoomResDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
}

export class FacilityResDTO {
  @Expose()
  id: number;
  @Expose()
  college: string;
}

export class UserResDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  avatar: string;
  @Expose()
  phone: string;
}

export class TypeResDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
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
  @Type(() => TypeResDTO)
  type: TypeResDTO;

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
  @Type(() => FacilityResDTO)
  facility: FacilityResDTO;

  @Expose()
  @Type(() => RoomResDTO)
  room: RoomResDTO;

  @Expose()
  @Type(() => UserResDTO)
  user: UserResDTO;

  @Expose()
  @Type(() => ItemResDto)
  item?: ItemResDto;
}
