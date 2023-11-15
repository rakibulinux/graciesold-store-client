import { Backend_URL } from "@/lib/Constants";
import { slugToTitle } from "@/lib/utils";
import { ProductType } from "@/types/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ item }: { item: ProductType }) => {
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
          <button className=" border border-red-400 text-red-400 text-sm rounded-full py-2 px-4 flex items-center justify-between hover:shadow-lg hover:bg-red-500 hover:text-white">
            <ShoppingCart className="mr-2" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
