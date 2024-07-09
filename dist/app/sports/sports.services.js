"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../utils/error");
const sports_model_1 = require("./sports.model");
const nodemailer_1 = require("../utils/nodemailer");
const createSportsService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield sports_model_1.Sport.create(payload);
    if (!sports) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to create Sports");
    }
    return sports;
});
const getAllSportsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield sports_model_1.Sport.find();
    if (!sports) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No sports Data Found");
    }
    return sports;
});
const getSingleSportService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield sports_model_1.Sport.findById(id);
    if (!sports) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No sports  Found");
    }
    return sports;
});
const updateSportsService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
    const allowedUpdatesFields = ["name", "category", "brand", "description", "price"];
    if (payload && typeof payload === "object") {
        for (const key in payload) {
            if (allowedUpdatesFields.includes(key)) {
                updates[key] = payload[key];
            }
        }
    }
    const result = yield sports_model_1.Sport.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update sports");
    }
    return result;
});
const deleteSportsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sports_model_1.Sport.findByIdAndDelete(id);
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to delete sports");
    }
    return result;
});
const contactFormSubmit = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, nodemailer_1.sendContactEmail)(payload);
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to send contact information");
    }
    return result;
});
exports.SportsService = {
    createSportsService,
    getAllSportsService,
    getSingleSportService,
    updateSportsService,
    deleteSportsService,
    contactFormSubmit
};
