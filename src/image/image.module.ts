/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
