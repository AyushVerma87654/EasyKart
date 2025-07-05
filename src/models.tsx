export type alertType = { type: string; message: string };
export type userType = { full_name: string };
export type setAlertType = (data: alertType) => void;
export type setUserType = (data: userType) => void;
export type cartType = { product: productType; quantity: number };
export type setCartType = (data: cartType[]) => void;
export type fnType = () => void;
export type mapType = { [i: number]: number };
export type productType = {
  thumbnail: string;
  price: number;
  id: number;
  title: string;
  quantity?: number;
};
export type productObjectType = {
  data: [];
  meta: { first_page: number; last_page: number };
};
