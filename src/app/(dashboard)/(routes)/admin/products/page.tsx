"use server";
import { PackageSearch } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./columns";
import { getQueryData } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";

const ProductListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [field, order] =
    typeof searchParams.sort === "string"
      ? searchParams.sort.split(".")
      : ["createdAt", "desc"]; // Provide default values
  const orderBy = { [field]: order };
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const perPage = searchParams["per_page"] ?? "10";
  const searchValue =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where = {}; // Use an object for the where parameter
  const session = await getServerAuthSession();
  const products = await getQueryData({
    url: "product",
    token: session?.backendTokens.accessToken,
    page,
    perPage,
    searchValue,
    where,
    orderBy,
  });
  revalidateTag("collection");
  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Products List"
        description="Manage All Products From Here."
        icon={PackageSearch}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="flex flex-col md:flex-row justify-end items-center gap-3 px-4 lg:px-8 my-3">
        <div className="mr-10 md:mr-3">
          <Link className="px-6 md:px-2" href="/admin/products/create">
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              size="icon"
            >
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={products}
        searchableColumns={[
          {
            id: "name",
            title: "Name",
          },
          {
            id: "availability",
            title: "Availability",
          },
        ]}
      />
    </div>
  );
};

export default ProductListPage;
