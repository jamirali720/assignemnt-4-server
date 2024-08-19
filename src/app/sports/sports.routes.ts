import { Router } from "express";
import { sportsController } from "./sports.controllers";

import { upload } from "../multer/upload";

const sportsRouter = Router();
sportsRouter
  .route("/create-sports")
  .post(upload.single("image"), sportsController.handleCreateSports);

sportsRouter.route("/sports").get(sportsController.handleGetAllSports);

sportsRouter.route("/related-sports").get(sportsController.handleGetSports);

sportsRouter
  .route("/single-sports/:id")
  .get(sportsController.handleGetSingleSport);

sportsRouter
  .route("/update-sport")
  .put(upload.single("image"), sportsController.handleUpdateSport);

sportsRouter
  .route("/update-cash-on-delivery")
  .put(sportsController.handleUpdateStockWithCashOn);

sportsRouter
  .route("/delete-sport/:id")
  .delete(sportsController.handleDeleteSport);

sportsRouter.route("/contact").post(sportsController.handleContactForm);

sportsRouter
  .route("/create-review/:id")
  .put(sportsController.handleCreateReview);

export default sportsRouter;
