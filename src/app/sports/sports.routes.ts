import { Router } from "express";import { sportsController } from "./sports.controllers";

import { upload } from "../multer/upload";



const sportsRouter = Router();
sportsRouter.route("/create-sports").post( upload.single('image'),  sportsController.handleCreateSports);
sportsRouter.route("/sports").get(sportsController.handleGetAllSports);
sportsRouter.route("/single-sports/:id").get(sportsController.handleGetSingleSport);
sportsRouter.route("/update-sport/:id").put( sportsController.handleUpdateSport);
sportsRouter.route("/delete-sport/:id").delete(sportsController.handleDeleteSport);
sportsRouter.route("/contact").post(sportsController.handleContactForm);


export default sportsRouter;
