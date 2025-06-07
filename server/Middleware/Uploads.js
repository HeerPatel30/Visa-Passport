import multer from 'multer';

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import _Config from '../Config/Config.js';

const Config = new _Config();

let main_folder = 'Passport-visa';
// Configure Cloudinary
let storage = new CloudinaryStorage({
    cloudinary: Config.cloudinaryConfig(),
    params: (req, file) => {
        return {
            folder: `${main_folder}/${file.fieldname}`,
            allowed_formats: ['jpg', 'png', 'jpeg'],
            transformation: [{
                quality: 'auto',
                fetch_format: 'auto',
                width: 500,
                height: 500,
                crop: 'limit'
            }],
            public_id: `${file.filename}-${Date.now()}`
        }
    }
})

const upload = multer({storage})

export const uploadsdocuments = upload.any()