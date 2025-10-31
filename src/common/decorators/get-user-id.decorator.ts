/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserID = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number => {
        const req = ctx.switchToHttp().getRequest();
        return req.user.id;
    }
)