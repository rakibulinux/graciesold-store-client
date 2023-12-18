import { getAllData, getSingleData } from "@/lib/utils";
import UpdateProduct from "./update-page";
import { MenuType } from "@/types/types";

export default async function Page({ params }: any) {
  const category: MenuType = await getAllData("category");
  const product: MenuType = await getSingleData("product", params.id);
  return <UpdateProduct category={category} product={product} />;
}
