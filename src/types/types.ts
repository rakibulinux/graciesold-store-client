export type savedFile = {
  id: string;
  path: string;
};

export type MenuType = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
  img?: savedFile[];
  createdAt: Date;
  updatedAt: Date;
}[];
export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
  img?: savedFile[];
  createdAt: Date;
  updatedAt: Date;
};

export type SelectOptions = {
  label: string;
  value: string;
};
export type Forgot = {
  id: string;
  hash: string;
  createdAt: Date;
  deletedAt: Date;
  userId: string;
};

export type ProductType = {
  map(
    arg0: (item: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: string;
  name: string;
  description: string;
  price: number;
  catSlug: string;
  availability: number;
  isFeatured: boolean;
  images: savedFile[];
  createdAt: Date;
  updatedAt: Date;
  options?: { title: string; additionalPrice: number }[];
};

export type OrderType = {
  id: string;
  price: number;
  products: CartItemType[];
  status: "pending" | "delivered";
  intent_id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItemType = {
  [x: string]: any;
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};
