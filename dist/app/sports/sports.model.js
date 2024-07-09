"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sport = void 0;
const mongoose_1 = require("mongoose");
// name, category, stock quantity, brand, rating  description, price, image
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
        default: 0,
    },
    quantity: {
        type: String,
        default: 0,
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
    },
    rating: {
        type: String,
        default: 0,
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    }
}, { timestamps: true });
exports.Sport = (0, mongoose_1.model)("Sport", sportsSchema);
