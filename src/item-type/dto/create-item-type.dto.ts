/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateItemTypeDto {
    @IsString()
    @IsNotEmpty()
    type:string;
}
