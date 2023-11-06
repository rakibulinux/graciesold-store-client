"use client";

import { Layers2 } from "lucide-react";
import { useRouter } from "next/navigation";

import Loading from "@/app/loading";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { useCategoriesQuery } from "@/redux/api/categoriesApi";
import { useDebounce } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";
import { columns } from "./columns";

type FormValues = {
  name: string;
  email: string;
  role?: string;
  password: string;
};

const CategoryListPage = () => {
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounce({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useCategoriesQuery({ ...query });
  if (isLoading) {
    return <Loading />;
  }
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
      <DataTable columns={columns} data={(data && data.categories) || []} />
    </div>
  );
};

export default CategoryListPage;
