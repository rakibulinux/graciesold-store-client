"use server";
import { PackageSearch, Repeat } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./columns";
import { getAllData } from "@/lib/utils";
import { revalidateTag } from "next/cache";

const ProductListPage = async () => {
  const products = await getAllData("product");
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
      <DataTable columns={columns} data={products || []} />
    </div>
  );
};

export default ProductListPage;
