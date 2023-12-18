import { getAllData } from "@/lib/utils";
import CreateProduct from "./product-page";
import { MenuType } from "@/types/types";

export default async function Page() {
  const category: MenuType = await getAllData("category");

  return (
    <>
      <div className="mx-auto max-w-lg text-center mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Add Product</h1>
      </div>
      <CreateProduct category={category} />
    </>
  );
}
