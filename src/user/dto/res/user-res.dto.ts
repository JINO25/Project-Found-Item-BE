/* eslint-disable prettier/prettier */

import { Expose } from 'class-transformer';

export class UserDTORes {
  @Expose()
  id:number;
  @Expose()
  name: string;
  @Expose()
  phone: string;
  @Expose()
  email: string; 
  @Expose()
  course: string;
  @Expose()
  avatar:string;
  @Expose()
  date: Date;
  @Expose()
  role: string;
  @Expose()
  facility: string;
}
