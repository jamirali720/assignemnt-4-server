"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../multer/upload");
const team_controllers_1 = require("./team.controllers");
// define  team routes
const teamRouter = (0, express_1.Router)();
// create route for creating new team;
teamRouter
    .route("/create-team")
    .post(upload_1.upload.single("image"), team_controllers_1.teamController.handleCreateTeam);
// create route for getting all teams members
teamRouter.route("/teams").get(team_controllers_1.teamController.handleGetAllTeams);
// create route for getting single team by id
teamRouter.route("/single-team/:id").get(team_controllers_1.teamController.handleGetSingleTeam);
// create route for updating team details by id
teamRouter
    .route("/update-team")
    .put(upload_1.upload.single("image"), team_controllers_1.teamController.handleUpdateTeam);
// create route for deleting team member by id
teamRouter.route("/delete-team/:id").delete(team_controllers_1.teamController.handleDeleteSport);
exports.default = teamRouter;
