"use client";

import { useCartStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { products } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <Link href="/cart">
      <div className="flex items-center gap-4">
        <div className="relative w-8 h-8 md:w-5 md:h-5">
          <ShoppingCart />
          <div className="absolute top-[-14px] right-[-10px] rounded-full p-1 text-center flex items-center justify-center bg-red-50 text-red-500 text-sm h-5 w-5">
            {products.length}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartIcon;
