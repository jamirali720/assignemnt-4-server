import { Router } from "express";
import { handlePaymentIntent, handleSendPublishableKey } from "./payment.controller";
import { upload } from "../multer/upload";


const paymentRouter = Router();

paymentRouter.route("/create-payment-intent").post( upload.none(),handlePaymentIntent);
paymentRouter.route("/publishable-key").get(handleSendPublishableKey);



export default paymentRouter;