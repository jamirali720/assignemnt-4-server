"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSportsValidationSchema = exports.createSportsValidationSchema = void 0;
const zod_1 = require("zod");
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
exports.createSportsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be string",
        }),
        category: zod_1.z
            .string({
            required_error: "Category is required",
            invalid_type_error: "Category must be string", // name, category, stock quantity, brand, rating  description, price, image
        }),
        description: zod_1.z
            .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be string",
        }),
        price: zod_1.z
            .string({
            required_error: "Price is required",
            invalid_type_error: "Price must be string",
        }),
        stock: zod_1.z
            .number().optional().default(0),
        quantity: zod_1.z
            .number().optional().default(0),
        brand: zod_1.z
            .string({
            required_error: "Brand is required",
            invalid_type_error: "Brand must be string",
        }),
        rating: zod_1.z
            .number().optional().default(0),
        image: zod_1.z
            .any()
    }),
});
exports.UpdateSportsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        category: zod_1.z
            .string().optional(),
        stock: zod_1.z
            .number().optional().default(0),
        quantity: zod_1.z
            .number().optional().default(0),
        description: zod_1.z
            .string().optional(),
        price: zod_1.z
            .number().optional(),
        brand: zod_1.z
            .string().optional(),
        rating: zod_1.z
            .number().optional().default(0),
        image: zod_1.z
            .string().optional(),
    }),
});
