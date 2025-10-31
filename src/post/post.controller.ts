/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { GetUserID } from 'src/common/decorators/get-user-id.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/req/create-post.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Roles } from 'src/auth/enums/role.enum';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Auth([Roles.User])
  @UseInterceptors(FilesInterceptor('files'))
  async createPost(
    @GetUserID() userId:number,
    @UploadedFiles() files:Express.Multer.File[],
    @Body() createPostDto : CreatePostDto
  ){  
    
    const data = await this.postService.createPost(userId, createPostDto, files);
    return data;
  }
}
