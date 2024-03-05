import { getAllData, getSingleData } from "@/lib/utils";
import { ProductType } from "@/types/types";

import SingleProduct from "./single-product";
import { revalidateTag } from "next/cache";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getSingleData("product", params.id);
  const products: ProductType[] = await getAllData("product");
  revalidateTag("collection");
  return (
    <>
      <SingleProduct products={products} singleProduct={singleProduct} />
    </>
  );
};

export default SingleProductPage;
