import { Controller, Get } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

@Controller('user')
export class UserController {
    constructor(private readonly emailService: EmailService){}

    @Get('/signin')
    async signin(){
        await this.emailService.signin('pkw3322@naver.com');

        return 'signin';
    }
    @Get('/signup')
    async signup(){
        await this.emailService.signup('pkw3322@naver.com');
        
        return 'signup';
    }

}
