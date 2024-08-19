"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true,
        },
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true,
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
        },
        phoneNo: {
            type: String,
            required: [true, "Phone is required"],
            trim: true,
        },
        pinCode: {
            type: String,
            required: [true, "Phone is required"],
            trim: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                trim: true,
                required: [true, "Name is required"],
            },
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Sport",
                required: [true, "Product ID is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                trim: true,
            },
            price: {
                type: Number,
                required: [true, "Price is required"],
            },
            image: {
                type: String,
                required: [true, "Image is required"],
            },
        },
    ],
    paymentInfo: {
        id: {
            type: String,
            required: [true, "Payment ID is required"],
        },
        status: {
            type: String,
            required: [true, "Payment Status is required"],
        },
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },
    itemPrice: {
        type: Number,
        required: [true, "Item Price is required"],
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: [true, "Tax Price is required"],
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: [true, "Shipping Price is required"],
        default: 0,
    },
    totalAmount: {
        type: Number,
        required: [true, "Total Amount is required"],
        default: 0,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Delivered", "Shipped", "Cancelled"],
        default: "Processing",
    },
    paidAt: {
        type: Date,
        required: [true, "Payment Date is required"],
    },
    deliveredAt: Date,
    cancelledAt: Date,
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
