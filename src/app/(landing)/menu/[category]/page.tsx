import React from "react";
import CategoryPage from "./cat-page";
import { CategoryType, MenuType, ProductType } from "@/types/types";
import { getAllData } from "@/lib/utils";
import { Backend_URL } from "@/lib/Constants";
import { revalidateTag } from "next/cache";

const getData = async (category: string) => {
  const res = await fetch(`${Backend_URL}/product/?where=catSlug:${category}`, {
    cache: "no-store",
  });

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
const page = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);
  const categories: MenuType[] = await getAllData("category");
  revalidateTag("collection");
  return (
    <div>
      <CategoryPage products={products} categories={categories} />
    </div>
  );
};

export default page;
