/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:itemId')
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.CREATED)
  async uploadImages(
    @Param('itemId', ParseIntPipe) itemId:number,
    @UploadedFiles() files: Express.Multer.File[]
  ){
    const images = await this.imageService.uploadImage(itemId, files);
     return {
      message: 'Upload images successfully!',
      count: images.length,
      images: images,
    };
  }

  @Get('similar/:id')
  @HttpCode(HttpStatus.OK)
  async findSimilar(@Param('id', ParseIntPipe) id: number) {
    const data = await this.imageService.searchAllImages(id);
    return {data}
  }
}
