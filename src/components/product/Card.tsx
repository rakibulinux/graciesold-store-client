import { Backend_URL } from "@/lib/Constants";
import { slugToTitle } from "@/lib/utils";
import { ProductType } from "@/types/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useCartStore } from "@/lib/store";
import { Button } from "../ui/button";

const ProductCard = ({ item }: { item: ProductType }) => {
  const productPrice = Number(item.price);
  const [total, setTotal] = useState(productPrice);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCartStore();
  const handleCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.images[0].path,
      price: total,
      quantity: quantity,
    });
    toast({ title: "The product added to the cart!" });
  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <Link href={`/product/${item.id}`}>
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={item.name}
            src={Backend_URL! + item.images[0].path}
          />
        </div>
      </Link>
      <div className="p-4">
        <h1 className="text-lg font-semibold mb-1 text-gray-700">
          {item.name}
        </h1>
        <p className="text-gray-400 text-sm">{slugToTitle(item.catSlug)}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-700 font-bold text-lg">${item.price}</p>
          <Button
            variant={"outline"}
            onClick={() => handleCart()}
            className=" border border-red-400 text-red-400 text-sm rounded-full py-2 px-4 flex items-center justify-between hover:shadow-lg hover:bg-red-500 hover:text-white"
          >
            <ShoppingCart className="mr-2" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
