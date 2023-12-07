import { Input } from "@/components/ui/input";
import React, { useEffect, useState, ChangeEvent } from "react";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  [key: string]: any; // Allow any other props to be passed through
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <Input {...props} value={value} onChange={handleChange} />;
};

export default DebouncedInput;
