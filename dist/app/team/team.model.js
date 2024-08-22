"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        trim: true,
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
}, { timestamps: true });
exports.Team = (0, mongoose_1.model)("Team", teamSchema);
