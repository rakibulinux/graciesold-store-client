import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
};

export const useCartStore = create<CartType & ActionTypes>()(
  devtools(
    persist(
      (set, get) => ({
        products: INITIAL_STATE.products,
        addToCart(item) {
          const products = get().products;
          const checkItem = products.find((menu) => menu.id === item.id);
          if (!checkItem) {
            set({ products: [...products, item] });
          } else {
            set({ products: [...products] });
          }
        },

        deleteFromcart(itemId) {
          const products = get().products;
          const updatedProducts = products.filter((menu) => menu.id !== itemId);
          set({ products: updatedProducts });
        },
        increaseCartItem(data, id) {
          const newData = [...data];
          newData.forEach((item) => {
            if (item.id === id) item.quantity += 1;
          });
          set({ products: newData });
        },

        decreaseCartItem(data, id) {
          const newData = [...data];
          newData.forEach((item) => {
            if (item.id === id) item.quantity -= 1;
          });
          set({ products: newData });
        },
        resetCart() {
          set(INITIAL_STATE);
        },
      }),
      { name: "cart", skipHydration: true }
    )
  )
);

// const INITIAL_STATE = {
//   products: [],
//   totalItems: 0,
//   totalPrice: 0,
// };
// console.log(INITIAL_STATE.totalPrice);
// export const useCartStore = create(
//   persist<CartType & ActionTypes>(
//     (set, get) => ({
//       products: INITIAL_STATE.products,
//       totalItems: INITIAL_STATE.totalItems,
//       totalPrice: INITIAL_STATE.totalPrice,
//       addToCart(item) {
//         const products = get().products;
//         const productInState = products.find(
//           (product) => product.id === item.id
//         );

//         if (productInState) {
//           const updatedProducts = products.map((product) =>
//             product.id === productInState.id
//               ? {
//                   ...item,
//                   quantity: item.quantity + product.quantity,
//                   price: item.price + product.price,
//                 }
//               : item
//           );
//           set((state) => ({
//             products: updatedProducts,
//             totalItems: state.totalItems + item.quantity,
//             totalPrice: state.totalPrice + item.price,
//           }));
//         } else {
//           set((state) => ({
//             products: [...state.products, item],
//             totalItems: state.totalItems + item.quantity,
//             totalPrice: state.totalPrice + item.price,
//           }));
//         }
//       },
//       removeFromCart(item) {
//         set((state) => ({
//           products: state.products.filter((product) => product.id !== item.id),
//           totalItems: state.totalItems - item.quantity,
//           totalPrice: state.totalPrice - item.price,
//         }));
//       },
//       updateQuantity(productId: string, quantity: number) {
//         const products = get().products;
//         console.log("products store", products);
//         const updatedProducts = products.map((product) =>
//           product.id === productId
//             ? {
//                 ...product,
//                 quantity: product.quantity + quantity,
//                 price: product.price + product.price,
//               }
//             : product
//         );
//         set(
//           (state) => (
//             console.log("state", state),
//             {
//               ...state,
//               products: updatedProducts,
//               totalItems: updatedProducts.reduce(
//                 (sum, product) => sum + product.quantity,
//                 0
//               ),
//               totalPrice: updatedProducts.reduce(
//                 (sum, product) => sum + product.price,
//                 0
//               ),
//             }
//           )
//         );
//       },
//       increaseCartItem(data, id) {
//         const newData = [...data];
//         newData.forEach((item) => {
//           if (item.id === id) item.quantity += 1;
//         });
//         set({ products: newData });
//       },
//       decreaseCartItem(data, id) {
//         const newData = [...data];
//         newData.forEach((item) => {
//           if (item.id === id) item.quantity -= 1;
//         });
//         set({ products: newData });
//       },
//       resetCart() {
//         set(INITIAL_STATE);
//       },
//     }),
//     { name: "cart", skipHydration: true }
//   )
// );
