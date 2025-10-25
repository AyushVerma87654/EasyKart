export type Cart = Record<number, number>;
export type CartMap = Cart[];

export type EditCartItemPayload = {
  id: number;
  quantity: number;
  price: number;
  isLoggedIn: boolean;
};

export type CartResponse = {
  cart: {
    items: Cart;
    totalAmount: number;
  };
};

export type Coupon = {
  couponCode: string;
  discountPercentage: number;
  expiresAt: Date;
  isActive: boolean;
  imageUrl: string;
};

export type CouponMap = Coupon[];

export type DeleteCartItemPayload = {
  id: number;
  isLoggedIn: boolean;
};
