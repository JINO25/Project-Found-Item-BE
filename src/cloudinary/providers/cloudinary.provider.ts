/* eslint-disable prettier/prettier */
import { v2 as cloudinary} from 'cloudinary'
import { ConfigType } from "@nestjs/config";
import cloudinaryConfig from "src/config/cloudinary.config";

export const CloudinaryProvider = {
    provide:'CLOUDINARY',
    inject: [cloudinaryConfig.KEY],
    useFactory: (config:ConfigType<typeof cloudinaryConfig>)=>{
        cloudinary.config({
            cloud_name: config.cloud_name,
            api_key: config.api_key,
            api_secret: config.api_secret
        });
        return cloudinary;
    }
}
