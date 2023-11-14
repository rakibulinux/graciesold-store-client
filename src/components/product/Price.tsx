"use client";

import { useCartStore } from "@/lib/store";
import { ProductType } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const Price = ({ product }: { product: ProductType }) => {
  const productPrice = Number(product.price);
  const [total, setTotal] = useState(productPrice);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCartStore();
  console.log(product, productPrice);
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      setTotal(quantity * productPrice);
    }
  }, [quantity, product, productPrice]);
  console.log("quantity", quantity);
  const handleCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0].path,
      price: total,
      quantity: quantity,
    });
    toast({ title: "The product added to the cart!" });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl text-red-500 font-semibold">${total}</h2>
      {/* OPTIONS CONTAINER */}
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <Button
          className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
          onClick={handleCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Price;
