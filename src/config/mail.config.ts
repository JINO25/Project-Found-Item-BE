/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { registerAs } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export default registerAs('mail', () => ({
    transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        // mail services
        // service: "gmail",
        // auth: {
        //     user: process.env.S_EMAIL,
        //     pass: process.env.S_PASS
        // }
    },
    defaults: {
        from: `"Shop App" <${process.env.EMAIL_FROM}>`,
    },
    template: {
        dir: join(__dirname, '../mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
}));  