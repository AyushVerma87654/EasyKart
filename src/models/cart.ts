export type CartItem = {
  productId: number;
  quantity: number;
  price: number;
  amount: number;
};

export type Cart = Record<number, CartItem>;
export type CartMap = CartItem[];

export type EditCartItemPayload = {
  id: number;
  quantity: number;
  price: number;
  email: string;
};

export type Coupon = {
  couponCode: string;
  discountPercentage: number;
  expiresAt: Date;
  isActive: boolean;
};

export type CouponMap = Coupon[];
