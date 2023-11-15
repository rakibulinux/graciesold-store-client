"use client";

import React, { useState } from "react";
import MobileFilter from "./mobile-filter";
import DesktopFilter from "./desktop-Filter";
import ProductCard from "@/components/product/Card";

import { MenuType, ProductType } from "@/types/types";

type Props = {
  products: ProductType[];
  categories: MenuType[];
};

const CategoryPage = ({ products, categories }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  return (
    <section className="min-h-screen">
      <div>
        <div className="container px-4 py-5 lg:py-10 max-w-[1300px] mx-auto">
          <div className="flex lg:hidden justify-between items-center py-5">
            <MobileFilter
              setCategory={setCategoryId}
              category={categoryId}
              categories={categories}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-10">
            <DesktopFilter
              setCategory={setCategoryId}
              category={categoryId}
              categories={categories}
            />
            <div className="flex-1 w-full h-fit">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
