"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import MobileFilter from "./mobile-filter";
import DesktopFilter from "./desktop-Filter";
import ProductCard from "@/components/product/Card";

import { MenuType, Meta, ProductType } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaginationState } from "@tanstack/react-table";

type Props = {
  products: {
    success: boolean;
    data: ProductType[];
    meta: Meta;
  };
  categories: MenuType[];
};

const CategoryPage = ({ products, categories }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // Search params
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const perPage = searchParams?.get("per_page") ?? "10";
  const perPageAsNumber = Number(perPage);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  const search = searchParams?.get("search");
  const [globalFilter, setGlobalFilter] = useState(search);
  const [categoryId, setCategoryId] = useState("");

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (globalFilter && globalFilter.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          page: 1,
          search: globalFilter,
        })}`
      );
    } else {
      router.push(
        `${pathname}?${createQueryString({
          page: 1,
          search: null,
        })}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFilter, router]);

  // Reset Filter
  const resetFilter = () => {
    router.push(
      `${pathname}?${createQueryString({
        page: 1,
        search: null,
      })}`
    );
    setGlobalFilter("");
  };

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackPerPage,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    setPagination({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage,
    });
  }, [fallbackPage, fallbackPerPage]);
  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      {
        scroll: false,
      }
    );
  }, [createQueryString, pageIndex, pageSize, pathname, router]);
  return (
    <section className="min-h-screen">
      <div>
        <div className="container px-4 py-5 lg:py-10 max-w-[1300px] mx-auto">
          <div className="flex lg:hidden justify-between items-center py-5">
            <MobileFilter
              setCategory={setCategoryId}
              category={categoryId}
              categories={categories}
              globalFilter={globalFilter!}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <DesktopFilter
              setCategory={setCategoryId}
              category={categoryId}
              categories={categories}
              setGlobalFilter={setGlobalFilter}
              globalFilter={globalFilter!}
              resetFilter={resetFilter}
            />
            <div className="flex-1 w-full h-fit">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {products.data.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
              <div className="flex justify-between items-center gap-5 mt-5 w-fit mx-auto py-10">
                <Button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex - 1,
                    }))
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full shadow-md"
                  disabled={!products.meta.prev}
                >
                  <ArrowLeft />
                </Button>
                <span className="text-gray-600">
                  Page {products.meta.currentPage} of {products.meta.lastPage}
                </span>
                <Button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex + 1,
                    }))
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full shadow-md"
                  disabled={!products.meta.next}
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
