"use client";

import { Button } from "@/components/ui/button";
import { MenuType } from "@/types/types";
import { Filter } from "lucide-react";
import React, { useState } from "react";
type Props = {
  categories: MenuType[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};
const MobileFilter = ({ categories, setCategory, category }: Props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className=" relative w-full z-10">
      <button
        onClick={toggleFilter}
        className="flex gap-2 border border-red-400 text-red-400 p-2 items-center rounded-md"
      >
        Filter <Filter />
      </button>
      {isFilterOpen && (
        <div className="my-2  absolute top-10 left-0  bg-white drop-shadow-2xl rounded-xl w-fit block">
          <div className="p-6 rounded-xl max-w-[300px] w-full h-fit">
            <div className="mb-4">
              <label
                htmlFor="searchQuery"
                className="block text-gray-600 font-semibold mb-2"
              >
                Search by Food
              </label>
              <input
                id="searchQuery"
                placeholder="Search by food"
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-red-400"
                type="text"
                value=""
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="categoryFilter"
                className="block text-gray-600 font-semibold mb-2"
              >
                Select Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value), setIsFilterOpen(false);
                }}
                className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:border-red-400"
              >
                <option value="">All Categories</option>
                {categories?.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
                {/* Add more categories */}
              </select>
            </div>
            {/* <div className="mb-4">
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
              variant="destructive"
              className="w-full text-white py-2 px-3 rounded-full shadow-md mt-5"
            >
              clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilter;
