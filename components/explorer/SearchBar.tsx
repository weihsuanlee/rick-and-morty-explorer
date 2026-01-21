"use client";

import { Input } from "@heroui/input";

import { SearchIcon } from "@/components/icons";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      aria-label="Search characters"
      classNames={{
        inputWrapper:
          "bg-content1 shadow-small border border-default-200 rounded-full",
        input: "text-base",
      }}
      isClearable
      labelPlacement="outside"
      onClear={() => onChange("")}
      onValueChange={onChange}
      placeholder="Search characters by name"
      startContent={
        <SearchIcon className="text-default-400 pointer-events-none" />
      }
      value={value}
      variant="flat"
    />
  );
}
