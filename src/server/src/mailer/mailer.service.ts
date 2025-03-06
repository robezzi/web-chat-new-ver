import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface ISendEmailArgs {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

@Injectable()
export class MailerService {
    transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'lolaerq@mail.ru', // generated ethereal user
            pass: '2V565kansLXhqtvnEFDz', // generated ethereal password
        },
    });

    async sendEmail({ to, subject, text, html }: ISendEmailArgs) {
        return await this.transporter.sendMail({
            from: '"WEB-CHAT" lolaerq@mail.ru', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });
    }
}
