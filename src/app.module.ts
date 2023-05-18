import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import configEmail from './config/email';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configEmail],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('===== write [.env] by config: network====');
        console.log(config.get('email'));
        return {
            transport: {
              host: 'smtp.gmail.com',
              port: 587,
              auth: {
                  user: 'example@gmail.com',
                  pass: 'password'
              },
          },
          defaults: {
              from: '"mailer-practice" <example@gmail.com>',
          },
          preview: true,
          template: {
            dir: __dirname + '/templates',
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    UserModule,
    EmailModule,
  ],
})
export class AppModule {}