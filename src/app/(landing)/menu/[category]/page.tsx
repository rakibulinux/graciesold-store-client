import { Backend_URL } from "@/lib/Constants";
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category: string) => {
  const res = await fetch(`${Backend_URL}/product/?where=catSlug:${category}`, {
    cache: "no-store",
  });
  console.log(res);
  // if (!res.ok) {
  //   throw new Error("Failed!");
  // }
  const data = await res.json();
  console.log(data);
  return data.data;
};

type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  console.log(params);
  const products: ProductType[] = await getData(params.category);
  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.images && (
            <div className="relative h-[80%]">
              <Image
                src={Backend_URL! + item.images[0].path}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.name}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
