import { Backend_URL } from "@/lib/Constants";
import { getAllData } from "@/lib/utils";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";
import ProductCard from "./Card";

const Featured = async () => {
  const featuredProducts: ProductType[] = await getAllData("product");

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
