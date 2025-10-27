/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
    public async hashPassword(data: string | Buffer): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
    }

    public async comparePassword(
        data: string | Buffer,
        encrypted: string,
    ): Promise<boolean> {
        return bcrypt.compare(data, encrypted);
    }
}