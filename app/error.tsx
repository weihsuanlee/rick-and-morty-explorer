"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-default-500">
          Error
        </p>
        <h2 className="font-display text-4xl font-semibold text-foreground">
          Something went{" "}
          <span className="gradient-text animate-gradient">wrong</span>
        </h2>
        <p className="text-sm text-default-500">
          Try again, or head back to the Explorer.
        </p>
      </div>
      <button
        className="rounded-full border border-default-200 px-4 py-2 text-sm text-foreground transition hover:border-primary hover:text-primary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        type="button"
      >
        Try again
      </button>
    </main>
  );
}
