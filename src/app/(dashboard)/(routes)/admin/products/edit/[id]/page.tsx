import { getAllData, getSingleData } from "@/lib/utils";
import { MenuType } from "@/types/types";
import UpdateProduct from "./update-page";

export default async function Page({ params }: any) {
  const category: MenuType = await getAllData("category");
  const product: MenuType = await getSingleData("product", params.id);
  return <UpdateProduct category={category} product={product} />;
}
