import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];


export const createSportsValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be string",  // name, category, stock quantity, brand, rating  description, price, image
      }),
      description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be string", 
      }),
    price: z
      .string({
        required_error: "Price is required",
        invalid_type_error: "Price must be string",  
      }),
    stock: z
      .number().optional().default(0),
    quantity: z
      .number().optional().default(0),
    brand: z
      .string({
        required_error: "Brand is required",
        invalid_type_error: "Brand must be string",
      }),
    rating: z
      .number().optional().default(0),
    image: z
    .any()  
    
      
  }),
});

export const UpdateSportsValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z
      .string().optional(),
    stock: z
      .number().optional().default(0),
    quantity: z
      .number().optional().default(0),
    description: z
      .string().optional(),
    price: z
      .number().optional(),
    brand: z
      .string().optional(),
    rating: z
      .number().optional().default(0),
    image: z
      .string().optional(),
  }),
});
