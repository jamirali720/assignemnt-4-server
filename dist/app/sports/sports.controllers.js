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
exports.sportsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const sports_services_1 = require("./sports.services");
const upload_1 = require("../multer/upload");
const handleCreateSports = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, upload_1.sendImageToCloudinary)(req.file.filename, req.file.path);
    const result = yield sports_services_1.SportsService.createSportsService(Object.assign(Object.assign({}, req.body), { image: resp.secure_url }));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Sports retrieved successfully",
        data: result
    });
}));
const handleGetAllSports = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sports_services_1.SportsService.getAllSportsService();
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Sports retrieved successfully",
        data: result
    });
}));
const handleGetSingleSport = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sports_services_1.SportsService.getSingleSportService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Sport retrieved successfully",
        data: result
    });
}));
const handleUpdateSport = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateSports = req.body;
    const result = yield sports_services_1.SportsService.updateSportsService(req.params.id, updateSports);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Sport updated successfully",
        data: result
    });
}));
const handleDeleteSport = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sports_services_1.SportsService.deleteSportsService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Sports updated successfully",
        data: result
    });
}));
const handleContactForm = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sports_services_1.SportsService.contactFormSubmit(req.body);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Contact form submitted successfully",
        data: result
    });
}));
exports.sportsController = {
    handleCreateSports,
    handleGetAllSports,
    handleGetSingleSport,
    handleUpdateSport,
    handleDeleteSport,
    handleContactForm
};
