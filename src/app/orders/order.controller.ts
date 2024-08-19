import httpStatus from "http-status";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { OrdersService } from "./order.services";

const handleCreateOrder = catchAsync(async (req, res) => {
  console.log("checkCreateOrder", req.body)
  const result = await OrdersService.createOrderService({
    ...req.body,
    paidAt:new Date(),

  });

  console.log("check result",  result)
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Order created successfully",
    data: result,
  });
});

const handleGetAllOrders = catchAsync(async (req, res) => {
  const result = await OrdersService.getAllOrdersService();
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const handleGetSingleOrder = catchAsync(async (req, res) => {
  const result = await OrdersService.getSingleOrderService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order retrieved successfully",
    data: result,
  });
});
const handleUpdateOrder = catchAsync(async (req, res) => {
  const result = await OrdersService.updateOrderService(req.params.id, req.body);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order updated successfully",
    data: result,
  });
});

const handleDeleteOrder = catchAsync(async (req, res) => {
  const result = await OrdersService.deleteOrderService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order deleted successfully",
    data: result,
  });
});

export const orderControllers = {
  handleCreateOrder,
  handleGetAllOrders,
  handleGetSingleOrder,
  handleUpdateOrder,
  handleDeleteOrder, 
};
