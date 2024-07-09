import { v2 as cloudinary } from 'cloudinary';
import multer, { Multer } from 'multer';
import { deleteImagePath } from '../utils/deleteImagePath';


 // Configuration
 cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View Credentials' below to copy your API secret
});

export const sendImageToCloudinary = (imageName: string, imagePath:string) => {
  // Upload an image
  return new Promise((resolve, reject) => {
    cloudinary.uploader
    .upload(imagePath, {
      public_id: imageName,
    }, (err, result) => {
      if(err) {
        reject(err);
      }
      resolve(result);
      deleteImagePath(imagePath);
    });    
  });


};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload :Multer = multer({ storage: storage });
