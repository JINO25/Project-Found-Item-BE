/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';
import { FacilityRoomModule } from './facility-room/facility-room.module';
import { PostModule } from './post/post.module';
import { MailModule } from './mail/mail.module';
import googleConfig from './config/google.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
      load:[jwtConfig, googleConfig]
    }),
    JwtModule.registerAsync({
      global:true,
      ...jwtConfig.asProvider()
    }
    ),
    UserModule,
    PrismaModule,
    AuthModule,
    CloudinaryModule,
    ImageModule,
    FacilityRoomModule,
    PostModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,    
  ],
})
export class AppModule {}
