"use client";

import { getAllData } from "@/lib/utils";
import FormSelectField from "../../../../../components/forms/FormSelectField";
import { CategoryType, MenuType, SelectOptions } from "@/types/types";

type CategoriesProps = {
  name: string;
  label?: string;
  setSelectedCategoryId: (el: any) => void;
  defaultValue?: SelectOptions;
  categoryData: MenuType;
};

const Categories = ({
  name,
  label,
  setSelectedCategoryId,
  defaultValue,
  categoryData,
}: CategoriesProps) => {
  const categoryOptions = categoryData?.map((category: CategoryType) => {
    return {
      label: category?.name,
      value: category?.id,
    };
  });
  return (
    <>
      <FormSelectField
        name={name}
        label={label}
        options={categoryOptions as SelectOptions[]}
        handleChange={setSelectedCategoryId}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default Categories;
