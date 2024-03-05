"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export type SelectOptions = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  options: SelectOptions[];
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
}

const FormSelectField = ({
  name,
  value,
  placeholder,
  options,
  label,
  defaultValue,
  handleChange,
}: SelectFieldProps) => {
  const { control } = useFormContext();
  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select onValueChange={handleChange ? handleChange : onChange}>
            <FormControl>
              <SelectTrigger name={name}>
                <SelectValue placeholder={placeholder ? placeholder : name} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="">
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </>
  );
};

export default FormSelectField;
