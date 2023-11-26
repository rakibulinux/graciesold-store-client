export enum UserRole {
  "admin",
  "customer",
}

export type Profile = {
  id: string;
  username: string;
  userId: string;
  bio: string | null;
  profileImg: savedFile;
  phoneNo: string | null;
  address: string | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  profile: Profile;
  orders: OrderType;
  isEmailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  hash?: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};
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
  img?: savedFile;
  createdAt: Date;
  updatedAt: Date;
}[];
export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
  img?: savedFile;
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

export type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  user: User;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  catSlug: string;
  availability: number;
  isFeatured: boolean;
  reviews: Review[];
  images: savedFile[];
  createdAt: Date;
  updatedAt: Date;
  options?: { title: string; additionalPrice: number }[];
};

export type CartItemType = {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
};

export type OrderType = {
  id: string;
  address: string;
  phoneNo: string;
  price: number;
  paymentStatus: boolean;
  order_number: boolean;
  products: CartItemType[];
  status: "pending" | "delivered";
  intent_id: string;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
};

export type CartType = {
  products: CartItemType[];
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  deleteFromcart: (id: string) => void;
  increaseCartItem: (data: CartItemType[], id: string) => void;
  decreaseCartItem: (data: CartItemType[], id: string) => void;
  resetCart: () => void;
};

export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};
export type OrderBy = Record<string, "asc" | "desc">;
export interface DataTableFilterOption<TData> {
  id?: string;
  label: string;
  value: keyof TData | string;
  items: Option[];
  isMulti?: boolean;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}
