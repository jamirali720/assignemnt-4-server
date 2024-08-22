import { v2 as cloudinary } from "cloudinary";

import { deleteImagePath } from "../utils/deleteImagePath";
import { Request } from "express";
import multer, {Multer, FileFilterCallback } from "multer";

const allowedFiles = ["image/jpg", "image/png", "image/jpeg", "image/gif"]


// Configuration of cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// upload image to cloudinary
export const sendImageToCloudinary = (imageName: string, imagePath: string) => {
  // Upload an image
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imagePath,
      {
        public_id: imageName,
      },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
        deleteImagePath(imagePath);
      }
    );
  });
};

// delete image from cloudinary
export const deleteImageFromCloudinary = (imageId: string) => {
  // delete an image from cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(imageId, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};



//multer function
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
 
});
// image filtering to specify image
const imageFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: any
) {
  
  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new Error("Only .jpg .jpeg .png and .gif images are allowed"), false);
  }
  
  cb(null, true);
};


export const upload: Multer = multer({ storage: storage, fileFilter: imageFilter});
