"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sport = void 0;
const mongoose_1 = require("mongoose");
// name, category, stock quantity, brand, rating  description, price, image reviews
const sportsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true,
    },
    stock: {
        type: Number,
        trim: true,
        default: 1,
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    image: {
        url: {
            type: String,
            required: [true, "Image Url is required"],
        },
        public_id: {
            type: String,
            required: [true, "Public ID is required"],
        },
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                required: true,
                trim: true,
            },
            comment: {
                type: String,
                required: true,
                trim: true,
            },
            rating: {
                type: Number,
                required: true,
                trim: true,
            },
        },
    ],
}, { timestamps: true });
exports.Sport = (0, mongoose_1.model)("Sport", sportsSchema);
