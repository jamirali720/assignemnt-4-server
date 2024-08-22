"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sports_controllers_1 = require("./sports.controllers");
const upload_1 = require("../multer/upload");
// define sports routes
const sportsRouter = (0, express_1.Router)();
// create route for creating new sports
sportsRouter
    .route("/create-sports")
    .post(upload_1.upload.single("image"), sports_controllers_1.sportsController.handleCreateSports);
// create route for get all sports
sportsRouter.route("/sports").get(sports_controllers_1.sportsController.handleGetAllSports);
// create route for latest sports
sportsRouter
    .route("/latest-sports")
    .get(sports_controllers_1.sportsController.handleGetLatestSports);
// create route for related sports
sportsRouter.route("/related-sports").get(sports_controllers_1.sportsController.handleGetSports);
// create route for single sport
sportsRouter
    .route("/single-sports/:id")
    .get(sports_controllers_1.sportsController.handleGetSingleSport);
// create route for update sport
sportsRouter
    .route("/update-sport")
    .put(upload_1.upload.single("image"), sports_controllers_1.sportsController.handleUpdateSport);
// create route for cash on delivery to reduce stock
sportsRouter
    .route("/update-cash-on-delivery")
    .put(sports_controllers_1.sportsController.handleUpdateStockWithCashOn);
// create route for delete sport by id
sportsRouter
    .route("/delete-sport/:id")
    .delete(sports_controllers_1.sportsController.handleDeleteSport);
// create route for contact for contact section
sportsRouter.route("/contact").post(sports_controllers_1.sportsController.handleContactForm);
// create route for create review for sport by id
sportsRouter
    .route("/create-review/:id")
    .put(sports_controllers_1.sportsController.handleCreateReview);
exports.default = sportsRouter;
