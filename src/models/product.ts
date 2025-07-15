export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: string; // JSON string — if you want structured type, change to object[]
  returnPolicy: string;
  minimumOrderQuantity: number;
  metaCreatedAt: Date;
  metaUpdatedAt: Date;
  barcode: string;
  qrCode: string;
  images: string[];
  thumbnail: string;
};

export type Products = { [id: number]: Product };
export type ProductMap = Product[];

export type Cart = { [id: number]: number };

export type ProductMapResponse = { products: ProductMap };
export type ProductResponse = { product: Product };
