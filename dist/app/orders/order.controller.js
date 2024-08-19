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
exports.orderControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const higherOrderFunction_1 = __importDefault(require("../utils/higherOrderFunction"));
const success_1 = require("../utils/success");
const order_services_1 = require("./order.services");
const handleCreateOrder = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("checkCreateOrder", req.body);
    const result = yield order_services_1.OrdersService.createOrderService(Object.assign(Object.assign({}, req.body), { paidAt: new Date() }));
    console.log("check result", result);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: 201,
        message: "Order created successfully",
        data: result,
    });
}));
const handleGetAllOrders = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrdersService.getAllOrdersService();
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders retrieved successfully",
        data: result,
    });
}));
const handleGetSingleOrder = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrdersService.getSingleOrderService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order retrieved successfully",
        data: result,
    });
}));
const handleUpdateOrder = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrdersService.updateOrderService(req.params.id, req.body);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order updated successfully",
        data: result,
    });
}));
const handleDeleteOrder = (0, higherOrderFunction_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrdersService.deleteOrderService(req.params.id);
    (0, success_1.successResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order deleted successfully",
        data: result,
    });
}));
exports.orderControllers = {
    handleCreateOrder,
    handleGetAllOrders,
    handleGetSingleOrder,
    handleUpdateOrder,
    handleDeleteOrder,
};
