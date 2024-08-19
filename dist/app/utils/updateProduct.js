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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStock = void 0;
const sports_model_1 = require("../sports/sports.model");
const updateStock = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield sports_model_1.Sport.findById(productId);
    if (product === null || product === void 0 ? void 0 : product.stock) {
        product.stock = product.stock - quantity;
        yield (product === null || product === void 0 ? void 0 : product.save());
    }
});
exports.updateStock = updateStock;
