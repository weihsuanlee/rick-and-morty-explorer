"use client";

import { Pagination } from "@heroui/pagination";

import type { CharactersQuery } from "@/lib/graphql/characters";

type PaginationControlsProps = {
  info: CharactersQuery["characters"] extends { info: infer Info } ? Info : null;
  page: number;
  onPageChange: (page: number) => void;
};

export function PaginationControls({
  info,
  page,
  onPageChange,
}: PaginationControlsProps) {
  const totalPages = info?.pages ?? 1;
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
