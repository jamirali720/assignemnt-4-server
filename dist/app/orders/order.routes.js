"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const ordersRouter = (0, express_1.Router)();
// Define routes for orders /create order
ordersRouter.route("/create-order").post(order_controller_1.orderControllers.handleCreateOrder);
// get orders
ordersRouter.route("/orders").get(order_controller_1.orderControllers.handleGetAllOrders);
// get single order by id
ordersRouter
    .route("/single-order/:id")
    .get(order_controller_1.orderControllers.handleGetSingleOrder);
// update order by id
ordersRouter.route("/update-order/:id").put(order_controller_1.orderControllers.handleUpdateOrder);
// delete order by id
ordersRouter
    .route("/delete-order/:id")
    .delete(order_controller_1.orderControllers.handleDeleteOrder);
exports.default = ordersRouter;
