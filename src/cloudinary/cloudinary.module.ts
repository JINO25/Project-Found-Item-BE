/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { CloudinaryService } from './providers/cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig from 'src/config/cloudinary.config';

@Module({
  imports: [ConfigModule.forFeature(cloudinaryConfig)],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
