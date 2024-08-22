// name, category, stock quantity, brand, rating
export interface IShipping {
  name: string
  address: string;
  city: string;
  state: string;
  country?: number;
  phoneNo?: number;
  pinCode: string;
  email: string;
}
export interface IOrderItems {
  productName: string;
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
  status: "Delivered" | "Shipped"
}