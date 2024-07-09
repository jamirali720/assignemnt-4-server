import { Router } from "express";
import { sportsController } from "./sports.controllers";
import { createSportsValidationSchema, UpdateSportsValidationSchema } from "./sports.zod.validation";
import { requestValidator } from "../middleware/requestValidator";
import { upload } from "../multer/upload";



const sportsRouter = Router();
sportsRouter.route("/create-sports").post( upload.single('image'), requestValidator(createSportsValidationSchema),  sportsController.handleCreateSports);
sportsRouter.route("/sports").get(sportsController.handleGetAllSports);
sportsRouter.route("/single-sports/:id").get(sportsController.handleGetSingleSport);
sportsRouter.route("/update-sport/:id").put(requestValidator(UpdateSportsValidationSchema), sportsController.handleUpdateSport);
sportsRouter.route("/delete-sport/:id").delete(sportsController.handleDeleteSport);
sportsRouter.route("/contact").post(sportsController.handleContactForm);


export default sportsRouter;
