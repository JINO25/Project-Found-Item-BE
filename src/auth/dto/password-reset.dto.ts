/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class PasswordResetDTO {
    @IsNotEmpty()
    password: string;
}