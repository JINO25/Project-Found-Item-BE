/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';


@Injectable()
export class CloudinaryService {
    constructor(
        @Inject('CLOUDINARY')
        private readonly cloudinary : typeof Cloudinary,
    ){}
    
  uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve,reject)=>{
        this.cloudinary.uploader.upload_stream({folder:'project-be/item'},(error, result)=>{
            if(error) return reject(error);
            if(!result) return new reject(new Error("No result returned from cloudinary!"));
            resolve(result);
        }).end(file.buffer);        
    })
  }

  async deleteFile(publicId: string): Promise<void> {
    try {
      const result = await this.cloudinary.uploader.destroy(publicId);

      if (result.result !== 'ok' && result.result !== 'not found') {
        throw new Error(`Cloudinary deletion failed: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error(`Failed to delete Cloudinary image ${publicId}:`, error);
      throw new Error(`Cannot delete image from Cloudinary: ${error.message}`);
    }
  }
}
