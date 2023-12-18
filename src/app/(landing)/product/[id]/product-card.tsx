import { Button } from "@/components/ui/button";
import { Backend_URL } from "@/lib/Constants";
import { slugToTitle } from "@/lib/utils";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BestProductCard = ({ singleProduct }: { singleProduct: ProductType }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
      <Link href={`/product/${singleProduct.id}`}>
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={singleProduct.name}
            src={Backend_URL! + singleProduct.images[0].path}
          />
        </div>
      </Link>
      <div className="p-4">
        <h1 className="text-lg font-semibold mb-1 text-gray-700">
          {singleProduct.name}
        </h1>
        <p className="text-gray-400 text-sm">
          {slugToTitle(singleProduct.catSlug)}
        </p>
        <p className="text-red-500 font-bold text-lg">${singleProduct.price}</p>
        <p className="text-gray-600 text-sm">{singleProduct.description}</p>
      </div>
    </div>
  );
};

export default BestProductCard;
