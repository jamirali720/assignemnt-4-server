// name, category, stock quantity, brand, rating
export interface IShipping {
  address: string;
  city: string;
  state: string;
  country?: number;
  phoneNo?: number;
  pinCode: string;
}
export interface IOrderItems {
  name: string;
  price: number;
  productId: string;
  image: string;
  quantity: number;
}
export interface IPayment {
  paymentInfo: {
    id: string;
    status: string;
  };
}

export interface IOrder {
  shippingInfo: IShipping;
  orderItems: IOrderItems[];
  paymentInfo: IPayment;
  email: string;
  orderDate?: Date;
  orderStatus: string;
  paidAt: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalAmount: number; 
}

export interface IStatus {
  status: "Delivered" | "shipped"
}