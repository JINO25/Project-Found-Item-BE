/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
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

  @Get()
  @Auth([Roles.None])
  getAllPosts(
    @Query('type') type:number
  ){
    return this.postService.getAllPost(type);
  }

  @Patch(':postId/status')
  @Auth([Roles.User])
   async updateStatusPost(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUserID() userId :number
  ) {
    const updatedItem = await this.postService.updateStatusPost(postId, userId);
    return {
      message: 'Cập nhật trạng thái thành công',
      data: updatedItem,
    };
  }

  @Get(':postId')
  @Auth([Roles.None])
  getPost(
    @Param('postId') postId: number
  ){
    return this.postService.getPostById(postId);
  }

  @Delete(':postId')
  @Auth([Roles.User, Roles.Admin])
  deletePost(
    @Param('postId') postId: number
  ){
    return this.postService.deletePost(postId);
  }
  
}
