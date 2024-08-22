"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("../utils/error");
const order_model_1 = require("./order.model");
const updateProduct_1 = require("../utils/updateProduct");
// create order service
const createOrderService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.create(payload);
    if (!order) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to create order");
    }
    return order;
});
// get all orders service
const getAllOrdersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    if (orders.length === 0) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No orders Data Found");
    }
    return orders;
});
// get a single order service by id
const getSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.findById(id);
    if (!orders) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "No orders  Found");
    }
    return orders;
});
// update order status service by id
const updateOrderService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id);
    if (!order) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Not found order");
    }
    if (order.orderStatus === "Delivered") {
        throw new error_1.ErrorHandler(http_status_1.default.BAD_REQUEST, "Order is already  delivered");
    }
    if (order.orderStatus === "Shipped") {
        order.orderItems.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, updateProduct_1.updateStock)(item.productId, item.quantity);
        }));
    }
    order.orderStatus = payload;
    order.deliveredAt = new Date(Date.now());
    yield order.save();
    return order;
});
// delete order by id
const deleteOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndDelete(id);
    if (!result) {
        throw new error_1.ErrorHandler(http_status_1.default.NOT_FOUND, "Failed to delete order");
    }
    return result;
});
exports.OrdersService = {
    createOrderService,
    getAllOrdersService,
    getSingleOrderService,
    updateOrderService,
    deleteOrderService,
};
