"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QueryParamValue = string | null;

type QueryParams = Record<string, QueryParamValue>;

type NavigationMode = "push" | "replace";

function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn(...args), ms);
  };
}

export function useCharactersUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const qFromUrl = searchParams.get("q") ?? "";
  const pageFromUrl = Number(searchParams.get("page") ?? "1") || 1;
  const selectedIdFromUrl = searchParams.get("id");

  const [inputValue, setInputValue] = useState(qFromUrl);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    setInputValue((prev) => (prev === qFromUrl ? prev : qFromUrl));
  }, [qFromUrl]);

  const searchParamsRef = useRef(searchParams.toString());

  useEffect(() => {
    searchParamsRef.current = searchParams.toString();
  }, [searchParams]);

  const setQueryParams = useCallback(
    (next: QueryParams, mode: NavigationMode) => {
      const params = new URLSearchParams(searchParamsRef.current);

      Object.entries(next).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      if (mode === "replace") {
        router.replace(nextUrl, { scroll: false });
      } else {
        router.push(nextUrl, { scroll: false });
      }
    },
    [pathname, router]
  );

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((raw: string) => {
        const trimmed = raw.trim();

        if (trimmed === qFromUrl) {
          return;
        }

        setQueryParams({ q: trimmed || null, page: "1" }, "replace");
      }, 350),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [qFromUrl, setQueryParams]
  );

  useEffect(() => {
    applyDebouncedSearch(inputValue);
  }, [inputValue, applyDebouncedSearch]);

  const goToPage = (page: number) => {
    setQueryParams({ page: String(page) }, "push");
  };

  const setSelectedId = (id: string | null, mode: NavigationMode = "push") => {
    setQueryParams({ id }, mode);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pageFromUrl]);

  return {
    inputValue,
    setInputValue,
    q: qFromUrl,
    page: pageFromUrl,
    selectedId: selectedIdFromUrl,
    goToPage,
    setSelectedId,
  };
}
