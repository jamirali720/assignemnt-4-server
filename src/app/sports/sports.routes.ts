import { Router } from "express";
import { sportsController } from "./sports.controllers";

import { upload } from "../multer/upload";

// define sports routes
const sportsRouter = Router();

// create route for creating new sports
sportsRouter
  .route("/create-sports")
  .post(upload.single("image"), sportsController.handleCreateSports);

// create route for get all sports
sportsRouter.route("/sports").get(sportsController.handleGetAllSports);

// create route for latest sports
sportsRouter
  .route("/latest-sports")
  .get(sportsController.handleGetLatestSports);

// create route for related sports
sportsRouter.route("/related-sports").get(sportsController.handleGetSports);

// create route for single sport
sportsRouter
  .route("/single-sports/:id")
  .get(sportsController.handleGetSingleSport);

// create route for update sport
sportsRouter
  .route("/update-sport")
  .put(upload.single("image"), sportsController.handleUpdateSport);

// create route for cash on delivery to reduce stock
sportsRouter
  .route("/update-cash-on-delivery")
  .put(sportsController.handleUpdateStockWithCashOn);

// create route for delete sport by id
sportsRouter
  .route("/delete-sport/:id")
  .delete(sportsController.handleDeleteSport);

// create route for contact for contact section
sportsRouter.route("/contact").post(sportsController.handleContactForm);

// create route for create review for sport by id
sportsRouter
  .route("/create-review/:id")
  .put(sportsController.handleCreateReview);

export default sportsRouter;
