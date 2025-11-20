/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUserID } from 'src/common/decorators/get-user-id.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Roles } from 'src/auth/enums/role.enum';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:itemId')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @Param('itemId', ParseIntPipe) itemId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = await this.imageService.uploadImages(itemId, files);
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
  @Auth([Roles.User])
  async findSimilar(@Param('id', ParseIntPipe) id: number, @GetUserID() userId:number) {
    const data = await this.imageService.searchAllImages(id, userId);
    return { data };
  }

  @Delete(':itemId')
  async deleteImages(@Param('itemId') itemId: number) {
    await this.imageService.deleteQdrant(itemId);
    return { message: `All Qdrant points for item ${itemId} deleted!` };
  }
}
