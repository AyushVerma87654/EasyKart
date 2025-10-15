export type OrderItem = {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  amount: number;
};

export type Order = {
  id: number;
  userId: number;
  orderReference: string;
  items: OrderItem[];
  totalAmount: number;
  discountPercentage?: number;
  discountAmount?: number;
  finalAmount: number;
  couponCode?: string;
  paymentMethod: "cod";
  status: OrderStatus;
  createdAt: string;
};

export type PlaceOrderPayload = {
  orderReference: string;
  items: OrderItem[];
  totalAmount: number;
  couponCode?: string;
  paymentMethod: "cod";
};

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export type Orders = Record<number, Order>;
export type OrderMap = Order[];
