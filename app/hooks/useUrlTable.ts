"use client";

import { useMemo, useState } from "react";
import { FilterType, SortableFields, SortOrder, UrlItem } from "../types/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const useUrl = () => {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const [queryParams, setQueryParams] = useState({
    currentPage: pageFromUrl,
    search: searchParams.get("search") || "",
    filter: (searchParams.get("filter") as FilterType) || FilterType.ALL,
    sortBy:
      (searchParams.get("sortBy") as SortableFields) ||
      SortableFields.CREATED_AT,
    sortOrder: (searchParams.get("order") as SortOrder) || SortOrder.DESC,
  });

  const [copiedMap, setCopiedMap] = useState<{ [key: string]: boolean }>({});

  const updateParams = (key: string, value: string | null) => {
    if (value === null) params.delete(key);
    else params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedUpdateSearchParams = useDebouncedCallback((term: string) => {
    updateParams("page", "1");
    if (term.trim()) updateParams("search", term);
    else updateParams("search", null);
  }, 400);

  const handleSearchChange = (value: string) => {
    setQueryParams((prev) => ({ ...prev, search: value, currentPage: 1 }));
    debouncedUpdateSearchParams(value);
  };

  const handleFilterChange = (value: FilterType) => {
    setQueryParams((prev) => ({ ...prev, filter: value, currentPage: 1 }));
    updateParams("page", "1");
    updateParams("filter", value === "all" ? null : value);
  };

  const handleSort = (field: SortableFields) => {
    const newOrder: SortOrder =
      queryParams.sortBy === field
        ? queryParams.sortOrder === SortOrder.ASC
          ? SortOrder.DESC
          : SortOrder.ASC
        : SortOrder.ASC;

    setQueryParams({
      ...queryParams,
      sortBy: field,
      sortOrder: newOrder,
      currentPage: 1,
    });

    updateParams("sortBy", field);
    updateParams("order", newOrder);
    updateParams("page", "1");
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({ ...prev, currentPage: page }));
    updateParams("page", String(page));
  };

  const handleCopyClick = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedMap((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };
  const getExpiryBg = (expires_at: string) => {
    const now = new Date();
    const expiry = new Date(expires_at);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0)
      return "bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-300 ";

    if (diff < 24 * 60 * 60 * 1000)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/30 dark:text-yellow-300";

    return "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300";
  };

  function useFilteredSortedUrls(urls: UrlItem[]) {
    return useMemo(() => {
      let data = [...urls];

      const searchQuery = searchParams.get("search");
      if (searchQuery?.trim() !== "") {
        data = data.filter(
          (item) =>
            item.original_url
              .toLowerCase()
              .includes(searchQuery?.toLowerCase() ?? "") ||
            item.short_url
              .toLowerCase()
              .includes(searchQuery?.toLowerCase() ?? "")
        );
      }

      const now = new Date();
      if (queryParams.filter === "active") {
        data = data.filter((item) => new Date(item.expires_at) > now);
      } else if (queryParams.filter === "expired") {
        data = data.filter((item) => new Date(item.expires_at) <= now);
      }

      data.sort((a, b) => {
        const field = queryParams.sortBy;
        const order = queryParams.sortOrder === "asc" ? 1 : -1;

        const dateA = new Date(a[field]).getTime();
        const dateB = new Date(b[field]).getTime();

        return (dateA - dateB) * order;
      });

      return data;
    }, [urls, queryParams, searchParams]);
  }

  return {
    queryParams,
    copiedMap,
    getExpiryBg,
    handleCopyClick,
    useFilteredSortedUrls,
    handleSearchChange,
    handlePageChange,
    handleFilterChange,
    handleSort,
  };
};
