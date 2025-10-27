/* eslint-disable prettier/prettier */

import { Expose } from 'class-transformer';

export class UserDTORes {
  @Expose()
  name: string;
  @Expose()
  phone: string;
  @Expose()
  email: string;
  @Expose()
  date: Date;
  @Expose()
  role: string;
}
