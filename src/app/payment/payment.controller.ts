import catchAsync from "../utils/higherOrderFunction";

import configs from "../configs";
const stripe = require("stripe")(configs.stripeSecretKey);

export const handlePaymentIntent = catchAsync(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",

    payment_method_types: ["card"],
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
});

export const handleSendPublishableKey = catchAsync(async (req, res, next) => {
  res.status(200).json({
    publishableKey: configs.stripePublishableKey,
  });
});
