import { Router } from "express";

import { orderControllers } from "./order.controller";

const ordersRouter = Router();
ordersRouter.route("/create-order").post(orderControllers.handleCreateOrder);
ordersRouter.route("/orders").get(orderControllers.handleGetAllOrders);
ordersRouter
  .route("/single-order/:id")
  .get(orderControllers.handleGetSingleOrder);
ordersRouter.route("/update-order/:id").put(orderControllers.handleUpdateOrder);

ordersRouter
  .route("/delete-order/:id")
  .delete(orderControllers.handleDeleteOrder);

export default ordersRouter;
