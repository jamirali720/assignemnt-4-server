import { Router } from "express";

import { upload } from "../multer/upload";
import { teamController } from "./team.controllers";

// define  team routes
const teamRouter = Router();

// create route for creating new team;
teamRouter
  .route("/create-team")
  .post(upload.single("image"), teamController.handleCreateTeam);

// create route for getting all teams members

teamRouter.route("/teams").get(teamController.handleGetAllTeams);

// create route for getting single team by id
teamRouter.route("/single-team/:id").get(teamController.handleGetSingleTeam);

// create route for updating team details by id
teamRouter
  .route("/update-team")
  .put(upload.single("image"), teamController.handleUpdateTeam);

// create route for deleting team member by id
teamRouter.route("/delete-team/:id").delete(teamController.handleDeleteSport);

export default teamRouter;
