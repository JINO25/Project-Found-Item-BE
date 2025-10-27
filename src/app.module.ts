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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
      load:[jwtConfig]
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
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,    
  ],
})
export class AppModule {}
