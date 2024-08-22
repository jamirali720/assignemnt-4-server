"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sports_routes_1 = __importDefault(require("../sports/sports.routes"));
const payment_router_1 = __importDefault(require("../payment/payment.router"));
const order_routes_1 = __importDefault(require("../orders/order.routes"));
const team_routes_1 = __importDefault(require("../team/team.routes"));
//Define routes
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/sports",
        route: sports_routes_1.default,
    },
    {
        path: "/sports",
        route: payment_router_1.default,
    },
    {
        path: "/orders",
        route: order_routes_1.default,
    },
    {
        path: "/teams",
        route: team_routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
