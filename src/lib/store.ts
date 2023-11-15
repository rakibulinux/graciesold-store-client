import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) => product.id === item.id
        );

        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : item
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
      updateQuantity(productId: string, quantity: number) {
        const products = get().products;
        const updatedProducts = products.map((product) =>
          product.id === productId
            ? {
                ...product,
                quantity,
                price: product.price * quantity,
              }
            : product
        );
        set((state) => ({
          ...state,
          products: updatedProducts,
          totalItems: updatedProducts.reduce(
            (sum, product) => sum + product.quantity,
            0
          ),
          totalPrice: updatedProducts.reduce(
            (sum, product) => sum + product.price,
            0
          ),
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
