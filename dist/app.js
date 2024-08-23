"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const error_1 = require("./app/utils/error");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "uploads")));
app.use((0, cors_1.default)());
// main router
app.use("/api", routes_1.default);
// home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "assignment-server-4 is OK",
    });
});
// not found route
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Route Not Found",
    });
});
// global error handler
app.use(error_1.handleError);
exports.default = app;
