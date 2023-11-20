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
  const { products, addToCart, increaseCartItem, decreaseCartItem } =
    useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      setTotal(quantity * productPrice);
    }
    // Calculate total quantity
    const totalQuantity = products.find((prod) => prod.id === product.id);
    setQuantity(totalQuantity?.quantity! || 1);
  }, [quantity, product, productPrice, products]);

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
        <div className="flex justify-between w-full p-1 ring-1 ring-red-500 items-center">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              className=""
              onClick={() => decreaseCartItem(products, product.id)}
              disabled={quantity === 1 ? true : false}
            >
              {"<"}
            </Button>
            <span>{quantity}</span>
            <Button
              variant="outline"
              className=""
              onClick={() => increaseCartItem(products, product.id)}
            >
              {">"}
            </Button>
          </div>
        </div>
        {/* CART button */}
        <button
          className="uppercase w-56 bg-red-500 text-white  ring-1 py-3 ring-red-500"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
