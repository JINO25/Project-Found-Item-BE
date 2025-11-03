/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendForgotPasswordEmail(to: string, resetToken: string) {
        const resetUrl = `${process.env.URL_HOST}/reset-password?token=${resetToken}`;

        await this.mailerService.sendMail({
            to,
            subject: 'Reset your password',
            template: './forgot-password',
            context: {
                resetUrl,
            },
        });
    }
}
