/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { pipeline } from '@xenova/transformers';
import { CloudinaryService } from 'src/cloudinary/providers/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {
  private imageEmbedder: any;
  private qdrant: QdrantClient;
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaService,
  ) {
    this.qdrant = new QdrantClient({ host: 'localhost', port: 6333 });
  }

  async init() {
    if (!this.imageEmbedder) {
      this.imageEmbedder = await pipeline(
        'image-feature-extraction',
        'Xenova/clip-vit-base-patch16',
      );
    }
  }

  async ensureCollectionExists() {
    const collections = await this.qdrant.getCollections();
    const exists = collections.collections.some((c) => c.name === 'images');
    console.log(exists);

    if (!exists) {
      await this.qdrant.createCollection('images', {
        vectors: {
          size: 512,
          distance: 'Cosine',
        },
      });
      console.log('Created collection "images"');
    }
  }

  async encodeImageFromUrl(url: string): Promise<number[]> {
    await this.init();

    const result = await this.imageEmbedder(url, {
      pooling: 'mean',
      normalize: true,
    });
    return Array.from(result.data);
  }

  async uploadImages(itemId: number, files: Express.Multer.File[]) {
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException(`Item ${itemId} not found`);

    const uploadResults = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadFile(file)),
    );

    const vectors = await Promise.all(
      uploadResults.map((u) => this.encodeImageFromUrl(u.secure_url)),
    );

    await this.ensureCollectionExists();

    const createdImages = await Promise.all(
      uploadResults.map((upload, i) =>
        this.prisma.image.create({
          data: {
            item_id: itemId,
            name: files[i].originalname,
            url: upload.secure_url,
            public_id: upload.public_id,
          },
        }),
      ),
    );

    await this.qdrant.upsert('images', {
      points: createdImages.map((img, i) => ({
        id: img.id,
        vector: vectors[i],
        payload: {
          itemId,
          typeId: item.type_id,
          url: img.url,
          status: 'unfound',
        },
      })),
    });

    return createdImages;
  }  

  async updateQdrant(itemId: number): Promise<void> {
    await this.ensureCollectionExists();

    await this.qdrant.setPayload('images', {
      filter: {
        must: [
          {
            key: 'itemId',
            match: { value: itemId },
          },
        ],
      },
      payload: {
        status: 'found',
      },
    });
  }

  async deleteQdrant(itemId: number): Promise<void> {
    await this.ensureCollectionExists();

    await this.qdrant.delete('images', {
      filter: {
        must: [
          {
            key: 'itemId',
            match: { value: itemId },
          },
        ],
      }
    });
  }

  async deleteImageOnCloudinary(publicId:string){
    await this.cloudinaryService.deleteFile(publicId);
  }

  async searchAllImages(itemId: number, topK = 5) {
    const images = await this.prisma.image.findMany({
      where: { item_id: itemId },
      include: {
        item: true,
      },
    });

    if (!images.length)
      throw new NotFoundException('No images found for this item');

    const allResults: {
      imageId: number;
      similar: {
        id: number | string;
        postId: number;
        score: number;
        url?: string | null;
      }[];
    }[] = [];

    // const allResults: {
    //   similar: { imageId: number | string; score: number; url? : string | null}[];
    // }[] = [];

    let result, listId;

    for (const image of images) {
      const vector = await this.encodeImageFromUrl(image.url);
      result = await this.qdrant.search('images', {
        vector,
        limit: topK,
        filter: {
          must: [
            { key: 'status', match: { value: 'unfound' } },
            { key: 'typeId', match: { value: image.item.type_id } },
          ],
          must_not: [{ key: 'itemId', match: { value: itemId } }],
        },
      });
      console.log(result);

      //Get id from list result
      listId = result.filter((r) => r.score > 0.5).map((r) => Number(r.id));

      const listImages = await this.prisma.image.findMany({
        where: {
          id: {
            in: listId,
          },
        },
        include: {
          item: true,
        },
      });

      const filterImagesSimilarity = result
        .filter((r) => listId.includes(Number(r.id)))
        .map((r) => {
          const query = listImages.find((img) => Number(r.id) === img.id);
          return {
            id: r.id,
            postId: query?.item.post_id,
            score: r.score,
            url: query?.url,
          };
        });

      allResults.push({
        imageId: image.id,
        similar: filterImagesSimilarity,
      });
    }

    // const listImages = await this.prisma.image.findMany({
    //     where:{
    //         id:{
    //             in: listId
    //         }
    //     },
    //     include:{
    //         item:{
    //             select:{
    //                 post_id:true
    //             }
    //         }
    //     }
    //   })

    // const filterImagesSimilarity = result.map((r) => {
    //       const query = listImages.find((img) => r.id === img.id);
    //       return {
    //           imageId: r.id,
    //           postId: query?.item.post_id,
    //           score: r.score,
    //           url: query?.url
    //         };
    //     });

    //     allResults.push({
    //       similar: filterImagesSimilarity
    //     });

    return allResults;
  }
}

// async searchAllImages(itemId: number, topK = 5) {
//     const images = await this.prisma.image.findMany({
//       where: { item_id: itemId },
//     });

//     if (!images.length)
//       throw new NotFoundException('No images found for this item');

//     const allResults: {
//       imageId: number;
//       similar: { id: number | string; score: number; url?: string | null }[];
//     }[] = [];

//     for (const image of images) {
//       const vector = await this.encodeImageFromUrl(image.url!);

//       const result = await this.qdrant.search('images', {
//         vector,
//         limit: topK,
//         filter: {
//           must: [
//             { key: 'status', match: { value: 'unfound' } },
//             { key: 'itemId', match: { value: itemId } },
//           ],
//         },
//       });

//       // Lấy danh sách ID từ Qdrant
//       const ids = result.map((r: any) => Number(r.id));

//       // Truy vấn Prisma để lấy URL tương ứng
//       const matchedImages = await this.prisma.image.findMany({
//         where: { id: { in: ids } },
//         select: { id: true, url: true },
//       });

//       // Gắn URL vào kết quả
//       const similarWithUrl = result.map((r: any) => {
//         const matched = matchedImages.find((img) => img.id === Number(r.id));
//         return {
//           id: r.id,
//           score: r.score,
//           url: matched?.url || null,
//         };
//       });

//       allResults.push({
//         imageId: image.id,
//         similar: similarWithUrl,
//       });
//     }

//     return allResults;
//   }
