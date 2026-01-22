"use client";

import { Chip, type ChipProps } from "@heroui/chip";

type StatusChipProps = {
  status: string | null | undefined;
} & Omit<ChipProps, "color" | "children">;

function statusColor(status: string | null | undefined): "success" | "danger" | "warning" {
  switch ((status ?? "").toLowerCase()) {
    case "alive":
      return "success";
    case "dead":
      return "danger";
    default:
      return "warning";
  }
}

export function StatusChip({ status, ...props }: StatusChipProps) {
  return (
    <Chip color={statusColor(status)} {...props}>
      {status ?? "Unknown"}
    </Chip>
  );
}
