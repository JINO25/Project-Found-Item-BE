/* eslint-disable prettier/prettier */
import { Exclude, Expose, Type } from 'class-transformer';
import { RoomResponseDto } from './room-response.dto';

@Exclude()
export class FacilityResponseDto {
  @Expose()
  id: number;

  @Expose()
  college: string;

  @Expose()
  @Type(() => RoomResponseDto)
  room?: RoomResponseDto[];
}
