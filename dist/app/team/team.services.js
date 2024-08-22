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
exports.TeamsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../utils/error");
const queryBuilder_1 = __importDefault(require("../QueryBuilder/queryBuilder"));
const team_model_1 = require("./team.model");
// create a new Team service
const createTeamService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Teams = yield team_model_1.Team.create(payload);
    if (!Teams) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to create Teams");
    }
    return Teams;
});
// get all teams members
const getAllTeamsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const features = new queryBuilder_1.default(team_model_1.Team.find(), query)
        .searchByName()
        .pagination();
    const Teams = yield features.query;
    return Teams;
});
// get a single team member service
const getSingleTeamService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Teams = yield team_model_1.Team.findById(id);
    if (!Teams) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No Teams  Found");
    }
    return Teams;
});
// update a single team member service
const updateTeamsService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
    const allowedUpdatesFields = ["name", "role", "image"];
    if (payload && typeof payload === "object") {
        for (const key in payload) {
            if (allowedUpdatesFields.includes(key)) {
                updates[key] = payload[key];
            }
        }
    }
    const result = yield team_model_1.Team.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to update Teams");
    }
    return result;
});
// delete a single team member service
const deleteTeamService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield team_model_1.Team.findByIdAndDelete(id);
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to delete Teams");
    }
    return result;
});
exports.TeamsService = {
    createTeamService,
    getAllTeamsService,
    getSingleTeamService,
    updateTeamsService,
    deleteTeamService,
};
