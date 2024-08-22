import { Router } from "express";

import { orderControllers } from "./order.controller";

const ordersRouter = Router();

// Define routes for orders /create order
ordersRouter.route("/create-order").post(orderControllers.handleCreateOrder);
// get orders
ordersRouter.route("/orders").get(orderControllers.handleGetAllOrders);

// get single order by id
ordersRouter
  .route("/single-order/:id")
  .get(orderControllers.handleGetSingleOrder);
  
// update order by id
ordersRouter.route("/update-order/:id").put(orderControllers.handleUpdateOrder);

// delete order by id
ordersRouter
  .route("/delete-order/:id")
  .delete(orderControllers.handleDeleteOrder);

export default ordersRouter;
