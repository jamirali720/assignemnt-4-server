import httpStatus from "http-status";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { OrdersService } from "./order.services";
import { ErrorHandler } from "../utils/error";


//create a new order 
const handleCreateOrder = catchAsync(async (req, res) => {
  const result = await OrdersService.createOrderService({
    ...req.body,
    paidAt: new Date(),
  });
 
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Order created successfully",
    data: result,
  });
});

// GET all orders
const handleGetAllOrders = catchAsync(async (req, res) => {
  const result = await OrdersService.getAllOrdersService();
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders retrieved successfully",
    data: result,
  });
});


// Get a single order
const handleGetSingleOrder = catchAsync(async (req, res) => {
  const result = await OrdersService.getSingleOrderService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order retrieved successfully",
    data: result,
  });
});

// update order status 
const handleUpdateOrder = catchAsync(async (req, res) => { 
  const id = req.params.id;
  const status = req.body.status;
  if (!status) throw new ErrorHandler(404, "You must select status");

  const result = await OrdersService.updateOrderService(id, status);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order updated successfully",
    data: result,
  });
});

// delete order
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
