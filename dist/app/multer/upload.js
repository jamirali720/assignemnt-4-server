"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const deleteImagePath_1 = require("../utils/deleteImagePath");
// Configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, // Click 'View Credentials' below to copy your API secret
});
const sendImageToCloudinary = (imageName, imagePath) => {
    // Upload an image
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload(imagePath, {
            public_id: imageName,
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
            (0, deleteImagePath_1.deleteImagePath)(imagePath);
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
