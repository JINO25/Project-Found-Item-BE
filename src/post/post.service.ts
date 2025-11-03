/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImageService } from 'src/image/image.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/req/create-post.dto';

import { PostResDto } from './dto/res/post-response.dto';
import { image, room } from '@prisma/client';
import { ItemStatus } from './enums/item-status.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(
    private readonly imageService: ImageService,
    private readonly prisma: PrismaService,
  ) {}

  async createPost(
    userId: number,
    createPostDto: CreatePostDto,
    files: Express.Multer.File[],
  ) {
    const result = await this.prisma.$transaction(async (tr) => {
      // check room and facility
      const facility = await tr.facility.findUnique({
        where: {
          id: createPostDto.facility_id,
        },
      });

      if (!facility) {
        throw new NotFoundException('Facility không tồn tại hoặc không hợp lệ');
      }

      let room: room | null = null;

      if (createPostDto.room_id && createPostDto.room_id !== 0) {
        room = await tr.room.findUnique({
          where: { id: createPostDto.room_id },
        });

        // chỉ throw khi có room_id nhưng không tồn tại
        if (!room) {
          throw new NotFoundException('Room không tồn tại');
        }

        // nếu có room_id và facility_id → kiểm tra ràng buộc
        if (room.facility_id !== facility.id) {
          throw new BadRequestException('Room không thuộc về facility này');
        }
      }

      //post
      const post = await tr.post.create({
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          user_id: userId,
          create_At: new Date(),
          facility_id: facility.id,
          room_id: room ? room.id : null,
        },
      });

      const type = await tr.type.findFirst({
        where: {
          id: createPostDto.item.type_id,
        },
      });

      if (!type) {
        throw new NotFoundException(
          `Type with id:${createPostDto.item.type_id} not found!`,
        );
      }

      if (!createPostDto.item) {
        throw new BadRequestException('Missing item information!');
      }

      //item
      const item = await tr.item.create({
        data: {
          des: createPostDto.item.des,
          name: createPostDto.item.name,
          status: createPostDto.item.status,
          post_id: post.id,
          type_id: type.id,
        },
      });

      return {
        post,
        item,
      };
    });

    //image
    let images: image[] = [];
    if (files.length > 0) {
      images = await this.imageService.uploadImages(result.item.id, files);
    }

    const dto: PostResDto = {
      id: result.post.id,
      title: result.post.title,
      content: result.post.content,
      user_id: result.post.user_id,
      create_At: result.post.create_At,
      item: {
        id: result.item.id,
        name: result.item.name,
        des: result.item.des,
        type_id: result.item.type_id,
        status: result.item.status,
        images: images.map((img) => ({
          id: img.id,
          url: img.url,
        })),
      },
    };

    return dto;
  }

  async updateStatusPost(postId: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post || post.user_id !== userId) {
      throw new NotFoundException(`Not found post with id: ${postId}!`);
    }

    if (!post)
      throw new NotFoundException(`Not found post with id: ${postId}!`);

    const item = await this.prisma.item.findFirst({
      where: {
        post_id: post.id,
      },
    });

    if (!item)
      throw new NotFoundException(
        `Not found item of post with id post: ${postId}!`,
      );

    const updatedItem = await this.prisma.item.update({
      where: { id: item.id },
      data: { status: ItemStatus.Found },
    });

    return updatedItem;
  }

  async deletePost(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        item: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const items = post.item;

    if (items && items.length > 0) {
      for (const item of items) {
        const images = item.images;

        if (images.length > 0) {
          await Promise.all(
            images.map((img) =>
              this.imageService.deleteImageOnCloudinary(img.public_id),
            ),
          );

          await this.imageService.deleteQdrant(item.id);

          await this.prisma.image.deleteMany({
            where: { item_id: item.id },
          });
        }

        await this.prisma.item.delete({
          where: { id: item.id },
        });
      }
    }

    await this.prisma.post.delete({
      where: { id: postId },
    });

    return { message: `Post ${postId} deleted successfully` };
  }

  async getAllPost(type: number) {
    const posts = await this.prisma.post.findMany({
      where: {
        item: {
          some: {
            status: ItemStatus.Lost,
            type_id: type ? type : {},
          },
        },
      },
      include: {
        item: {
          include: {
            images: true,
          },
        },
      },
    });

    return plainToInstance(PostResDto, posts, {
      excludeExtraneousValues: true,
    });
  }

  async getPostById(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        item: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Not found post with id: ${postId}!`);
    }

    return plainToInstance(PostResDto, post, {
      excludeExtraneousValues: true,
    });
  }
}
