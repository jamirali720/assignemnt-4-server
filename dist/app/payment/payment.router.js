"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const upload_1 = require("../multer/upload");
const paymentRouter = (0, express_1.Router)();
paymentRouter.route("/create-payment-intent").post(upload_1.upload.none(), payment_controller_1.handlePaymentIntent);
paymentRouter.route("/publishable-key").get(payment_controller_1.handleSendPublishableKey);
exports.default = paymentRouter;
