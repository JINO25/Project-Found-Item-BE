/* eslint-disable prettier/prettier */
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoomResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  latitude?: number;

  @Expose()
  longitude?: number;

  @Expose()
  facility_id: number;
}
