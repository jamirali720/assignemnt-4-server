"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sports_controllers_1 = require("./sports.controllers");
const upload_1 = require("../multer/upload");
const sportsRouter = (0, express_1.Router)();
sportsRouter
    .route("/create-sports")
    .post(upload_1.upload.single("image"), sports_controllers_1.sportsController.handleCreateSports);
sportsRouter.route("/sports").get(sports_controllers_1.sportsController.handleGetAllSports);
sportsRouter.route("/related-sports").get(sports_controllers_1.sportsController.handleGetSports);
sportsRouter
    .route("/single-sports/:id")
    .get(sports_controllers_1.sportsController.handleGetSingleSport);
sportsRouter
    .route("/update-sport")
    .put(upload_1.upload.single("image"), sports_controllers_1.sportsController.handleUpdateSport);
sportsRouter
    .route("/update-cash-on-delivery")
    .put(sports_controllers_1.sportsController.handleUpdateStockWithCashOn);
sportsRouter
    .route("/delete-sport/:id")
    .delete(sports_controllers_1.sportsController.handleDeleteSport);
sportsRouter.route("/contact").post(sports_controllers_1.sportsController.handleContactForm);
sportsRouter
    .route("/create-review/:id")
    .put(sports_controllers_1.sportsController.handleCreateReview);
exports.default = sportsRouter;
