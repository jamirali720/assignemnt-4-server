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
const queryBuilder_1 = __importDefault(require("../QueryBuilder/queryBuilder"));
const updateProduct_1 = require("../utils/updateProduct");
const createSportsService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield sports_model_1.Sport.create(payload);
    if (!sports) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to create Sports");
    }
    return sports;
});
const getAllSportsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const features = new queryBuilder_1.default(sports_model_1.Sport.find(), query)
        .searchByName()
        .searchByCategory()
        .searchByBrand()
        .filter()
        .pagination()
        .sorting();
    const sports = yield features.query;
    if (!sports) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No sports Data Found");
    }
    return sports;
});
const getSportsService = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const allowedUpdatesFields = [
        "name",
        "category",
        "brand",
        "description",
        "price",
        "stock",
        "image"
    ];
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
// update stock with cash on delivery 
const updateStockWithCashOnDelivery = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = payload === null || payload === void 0 ? void 0 : payload.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ id, quantity }) {
        yield (0, updateProduct_1.updateStock)(id, quantity);
    }));
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update stock");
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
// contact information
const contactFormSubmit = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, nodemailer_1.sendContactEmail)(payload);
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Failed to send contact information");
    }
    return result;
});
const createReviewService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { name, email, comment, rating } = payload;
    const newReview = { name, email, comment, rating: Number(rating) };
    const sports = yield sports_model_1.Sport.findById(id);
    if (!sports) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No sports found");
    }
    const isReviewed = (_a = sports.reviews) === null || _a === void 0 ? void 0 : _a.find((review) => review.email === email);
    if (isReviewed) {
        (_b = sports.reviews) === null || _b === void 0 ? void 0 : _b.forEach((review) => {
            if (review.email === email) {
                review.name = name;
                review.email = email;
                review.comment = comment;
                review.rating = Number(rating);
            }
        });
    }
    else {
        (_c = sports.reviews) === null || _c === void 0 ? void 0 : _c.push(newReview);
        sports.numberOfReviews = (_d = sports.reviews) === null || _d === void 0 ? void 0 : _d.length;
    }
    let averageRating = 0;
    (_e = sports.reviews) === null || _e === void 0 ? void 0 : _e.forEach((review) => {
        averageRating += review.rating;
    });
    sports.ratings = averageRating / ((_f = sports.reviews) === null || _f === void 0 ? void 0 : _f.length);
    yield sports.save({ validateBeforeSave: false });
    return sports;
});
exports.SportsService = {
    createSportsService,
    getAllSportsService,
    getSingleSportService,
    updateSportsService,
    updateStockWithCashOnDelivery,
    deleteSportsService,
    contactFormSubmit,
    getSportsService,
    createReviewService,
};
