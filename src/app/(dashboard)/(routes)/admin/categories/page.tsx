import { Layers2 } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./columns";

const data = [
  {
    name: "Order 1",
    status: "Pending",
  },
  {
    name: "Order 2",
    status: "Shipped",
  },
  {
    name: "Order 3",
    status: "Delivered",
  },
  {
    name: "Order 4",
    status: "Pending",
  },
];

const CategoryListPage = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Categories List"
        description="Manage All Categories From Here."
        icon={Layers2}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="flex flex-col md:flex-row justify-end items-center gap-3 px-4 lg:px-8 my-3">
        <div className="mr-10 md:mr-3">
          <Link className="px-6 md:px-2" href="/admin/categories/create">
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              size="icon"
            >
              Create Category
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default CategoryListPage;
