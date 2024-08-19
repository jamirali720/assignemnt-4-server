"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const ordersRouter = (0, express_1.Router)();
ordersRouter.route("/create-order").post(order_controller_1.orderControllers.handleCreateOrder);
ordersRouter.route("/orders").get(order_controller_1.orderControllers.handleGetAllOrders);
ordersRouter
    .route("/single-order/:id")
    .get(order_controller_1.orderControllers.handleGetSingleOrder);
ordersRouter.route("/update-order/:id").put(order_controller_1.orderControllers.handleUpdateOrder);
ordersRouter
    .route("/delete-order/:id")
    .delete(order_controller_1.orderControllers.handleDeleteOrder);
exports.default = ordersRouter;
