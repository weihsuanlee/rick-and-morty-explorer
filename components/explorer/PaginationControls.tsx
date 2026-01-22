"use client";

import { Pagination } from "@heroui/pagination";

import type { CharactersQuery } from "@/lib/graphql/characters";

type CharactersInfo = NonNullable<
  NonNullable<CharactersQuery["characters"]>["info"]
>;

type PaginationControlsProps = {
  info: CharactersInfo | null;
  page: number;
  onPageChange: (page: number) => void;
};

export function PaginationControls({
  info,
  page,
  onPageChange,
}: PaginationControlsProps) {
  const totalPages = typeof info?.pages === "number" ? info.pages : 0;

  if (totalPages < 1) {
    return null;
  }
  
  return (
    <div className="flex items-center justify-center">
      <Pagination
        getItemAriaLabel={(pageValue) =>
          typeof pageValue === "number"
            ? `Go to page ${pageValue}`
            : `Pagination ${pageValue}`
        }
        isDisabled={!info}
        onChange={onPageChange}
        page={page}
        showControls
        size="sm"
        total={totalPages}
        variant="flat"
      />
    </div>
  );
}
