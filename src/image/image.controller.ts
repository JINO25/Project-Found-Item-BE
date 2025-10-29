/* eslint-disable prettier/prettier */
import { Controller, Get,  Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:itemId')
  @UseInterceptors(FilesInterceptor('files'))
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

  @Post(':itemId/found')
async markItemFound(@Param('itemId') itemId: number) {
  await this.imageService.updateQdrant(itemId);
  return { message: `All Qdrant points for item ${itemId} marked as found` };
}


  @Get('similar/:id')
  async findSimilar(@Param('id', ParseIntPipe) id: number) {
    const data = await this.imageService.searchAllImages(id);
    return {data}
  }
}
