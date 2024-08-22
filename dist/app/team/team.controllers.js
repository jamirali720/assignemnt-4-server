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
exports.teamController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const upload_1 = require("../multer/upload");
const error_1 = require("../utils/error");
const team_services_1 = require("./team.services");
const team_model_1 = require("./team.model");
// create a new team member
const handleCreateTeam = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = (yield (0, upload_1.sendImageToCloudinary)(req.file.filename, req.file.path));
    const result = yield team_services_1.TeamsService.createTeamService(Object.assign(Object.assign({}, req.body), { image: { url: resp.secure_url, public_id: resp.public_id } }));
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Team created successfully",
        data: result,
    });
}));
// get all teams members
const handleGetAllTeams = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield team_services_1.TeamsService.getAllTeamsService(query);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Teams retrieved successfully",
        data: result,
    });
}));
// get single team member
const handleGetSingleTeam = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamsService.getSingleTeamService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Sport retrieved successfully",
        data: result,
    });
}));
// update team member information
const handleUpdateTeam = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield team_model_1.Team.findById(req.body.id);
    if (!team) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Team not found");
    }
    yield (0, upload_1.deleteImageFromCloudinary)(team.image.public_id);
    const resp = (yield (0, upload_1.sendImageToCloudinary)(req.file.filename, req.file.path));
    const updateTeam = Object.assign(Object.assign({}, req.body), { image: { url: resp.secure_url, public_id: resp.public_id } });
    const result = yield team_services_1.TeamsService.updateTeamsService(req.body.id, updateTeam);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Team updated successfully",
        data: result,
    });
}));
// delete team member
const handleDeleteSport = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_services_1.TeamsService.deleteTeamService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Team deleted successfully",
        data: result,
    });
}));
exports.teamController = {
    handleCreateTeam,
    handleGetAllTeams,
    handleGetSingleTeam,
    handleUpdateTeam,
    handleDeleteSport,
};
