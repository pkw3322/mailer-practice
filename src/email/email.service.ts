import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService){}

    async _send(
        tos: string[],
        subject: string,
        templateName: string,
        context: any = {},
    ): Promise<boolean>{
        console.log(templateName)
        await this.mailerService.sendMail({
            to: tos.join(', '),
            subject,
            template: 'signup.ejs',
            context
        });
        return true;
    }

    async signin(to: string){
        await this.mailerService.sendMail({
            to: [to].join(', '),
            subject: '로그인 완료',
            template: 'signin.ejs',
            context : {
                emailt: to,
                datetime: new Date(),
            }
        });
    }

    async signup(to: string){
        await this.mailerService.sendMail({
            to: [to].join(', '),
            subject: '회원 가입',
            template: 'signup.ejs',
            context : {
                emailt: to,
                datetime: new Date(),
            }
        });
    }
}
