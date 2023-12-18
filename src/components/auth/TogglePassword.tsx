import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  setValue: (value: boolean) => void;
  value: boolean;
  className?: string;
}

const TogglePassword = ({ setValue, value, className }: Props) => {
  if (value)
    return (
      <EyeOff
        className={twMerge("w-4 cursor-pointer", className)}
        onClick={() => setValue(false)}
      />
    );
  return (
    <Eye
      className={twMerge("w-4 cursor-pointer", className)}
      onClick={() => setValue(true)}
    />
  );
};

export default TogglePassword;
