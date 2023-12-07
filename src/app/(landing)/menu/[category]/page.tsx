// const products: ProductType[] = await getAllData(
//   `product/?where=catSlug:${params.category}`
// );
import React from "react";
import CategoryPage from "./cat-page";
import { getQueryData } from "@/lib/utils";
import { revalidateTag } from "next/cache";

const page = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [field, order] =
    typeof searchParams.sort === "string"
      ? searchParams.sort.split(".")
      : ["createdAt", "desc"]; // Provide default values
  const orderBy = { [field]: order };
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const perPage = searchParams["per_page"] ?? "1";
  const searchValue =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const where = { catSlug: params.category }; // Use an object for the where parameter
  const products = await getQueryData({
    url: "product",
    page,
    perPage,
    searchValue,
    where,
    orderBy,
  });
  const categories = await getQueryData({
    url: "category",
    page,
    perPage,
    searchValue,
    orderBy,
  });
  revalidateTag("collection");
  return (
    <div>
      <CategoryPage products={products} categories={categories.data} />
    </div>
  );
};

export default page;
