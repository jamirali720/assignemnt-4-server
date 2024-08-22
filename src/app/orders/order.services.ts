import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";
import { sendContactEmail } from "../utils/nodemailer";
import QueryBuilder from "../QueryBuilder/queryBuilder";
import { IOrder, IStatus } from "./order.interface";
import { Order } from "./order.model";
import { updateStock } from "../utils/updateProduct";


// create order service
const createOrderService = async (payload: Partial<IOrder>) => {
  const order = await Order.create(payload);
  if (!order) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to create order");
  }
  return order;
};

// get all orders service
const getAllOrdersService = async () => {
  const orders = await Order.find();

  if (orders.length === 0) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No orders Data Found");
  }
  return orders;
};

// get a single order service by id
const getSingleOrderService = async (id: string) => {
  const orders = await Order.findById(id);
  if (!orders) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No orders  Found");
  }
  return orders;
};

// update order status service by id
const updateOrderService = async (id: string, payload: string) => { 
  const order = await Order.findById(id);
  if (!order) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Not found order");
  }
  if (order.orderStatus === "Delivered") {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Order is already  delivered"
    );
  }

  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.productId, item.quantity);
    });
  }

  order.orderStatus = payload;
  order.deliveredAt = new Date(Date.now());
  await order.save();

  return order;
};


// delete order by id
const deleteOrderService = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to delete order");
  }

  return result;
};



export const OrdersService = {
  createOrderService,
  getAllOrdersService,
  getSingleOrderService,
  updateOrderService,
  deleteOrderService,
 
};
