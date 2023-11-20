import React from "react";
import CategoryPage from "./cat-page";
import { CategoryType, MenuType, ProductType } from "@/types/types";
import { getAllData } from "@/lib/utils";
import { Backend_URL } from "@/lib/Constants";
import { revalidateTag } from "next/cache";

type Props = {
  params: { category: string };
};
const page = async ({ params }: Props) => {
  const products: ProductType[] = await getAllData(
    `product/?where=catSlug:${params.category}`
  );
  const categories: MenuType[] = await getAllData("category");
  revalidateTag("collection");
  return (
    <div>
      <CategoryPage products={products} categories={categories} />
    </div>
  );
};

export default page;
