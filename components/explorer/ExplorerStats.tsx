"use client";

import { Chip } from "@heroui/chip";

type ExplorerStatsProps = {
  totalCount: number;
  page: number;
  totalPages: number;
  resultsCount: number;
};

export function ExplorerStats({ totalCount, page, totalPages, resultsCount }: ExplorerStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-default-600">
      <div className="rounded-full border border-default-200 bg-content1 px-3 py-1">
        {totalCount.toLocaleString()} total
      </div>
      <div className="rounded-full border border-default-200 bg-content1 px-3 py-1">
        Page {page} / {totalPages}
      </div>
      <div aria-live="polite" className="rounded-full border border-default-200 bg-content1 px-3 py-1">
        {resultsCount} shown
      </div>
    </div>
  );
}
