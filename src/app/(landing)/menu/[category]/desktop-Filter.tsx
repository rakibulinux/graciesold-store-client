"use client";
import Categories from "@/app/(dashboard)/(routes)/admin/categories/categories";
import { Button } from "@/components/ui/button";
import DebouncedInput from "@/hooks/use-debounce-data";
import { CategoryType, MenuType } from "@/types/types";
import React, { useState } from "react";

type Props = {
  categories: MenuType[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setGlobalFilter: (e: string) => void;
  globalFilter: string;
  resetFilter: any;
};

const DesktopFilter = ({
  categories,
  category,
  setCategory,
  setGlobalFilter,
  globalFilter,
  resetFilter,
}: Props) => {
  return (
    <div className="hidden lg:block bg-gray-100 h-fit rounded-xl">
      <div className=" p-6 rounded-xl max-w-[300px] w-full h-fit">
        <div className="mb-4">
          <label
            htmlFor="searchQuery"
            className="block text-gray-600 font-semibold mb-2"
          >
            Search by Food
          </label>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search by food"
            className="w-full rounded-full border border-gray-300 focus:outline-none focus:border-red-400"
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="categoryFilter"
            className="block text-gray-600 font-semibold mb-2"
          >
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:border-red-400"
          >
            <option value="">All Categories</option>
            {categories?.map((option: any) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="tagFilter"
            className="block text-gray-600 font-semibold mb-2"
          >
            Search by Tags
          </label>
          <input
            id="tagFilter"
            placeholder="Enter tags..."
            className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-red-400"
            type="text"
            value=""
          />
          <div className="mt-2"></div>
        </div>
        <div>
          <label
            htmlFor="priceRange"
            className="block text-gray-600 font-semibold mb-2"
          >
            Price Range:
          </label>
          <div className="flex space-x-2">
            <input
              id="minPrice"
              placeholder="Min"
              className="w-1/2 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-red-400"
              type="number"
              value=""
            />
            <input
              id="maxPrice"
              placeholder="Max"
              className="w-1/2 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-red-400"
              type="number"
              value=""
            />
          </div>
        </div> */}
        <Button
          onClick={resetFilter}
          variant="destructive"
          className="w-full rounded-full shadow-md mt-5"
        >
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default DesktopFilter;
