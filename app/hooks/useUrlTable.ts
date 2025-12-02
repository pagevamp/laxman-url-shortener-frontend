"use client";

import { useMemo, useState } from "react";
import { SortableFields, UrlItem } from "./interfaces/types";

export const useUrl = () => {
  const [copiedMap, setCopiedMap] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortableFields>("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleCopyClick = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMap((prev) => ({ ...prev, [id]: true }));

      setTimeout(() => {
        setCopiedMap((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text", error);
    }
  };

  const getExpiryBg = (expires_at: string) => {
    const now = new Date();
    const expiry = new Date(expires_at);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0)
      return "bg-red-100 dark:bg-red-800 text-red-800 dark:text-white shadow-red-300/30";
    if (diff < 24 * 60 * 60 * 1000)
      return "bg-yellow-100 dark:bg-yellow-500 text-yellow-800 dark:text-white shadow-yellow-300/30";
    return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-white shadow-green-300/30";
  };

  function useFilteredSortedUrls(urls: UrlItem[]) {
    return useMemo(() => {
      let data = [...urls];

      if (search.trim() !== "") {
        data = data.filter(
          (item) =>
            item.original_url.toLowerCase().includes(search.toLowerCase()) ||
            item.short_url.toLowerCase().includes(search.toLowerCase())
        );
      }

      const now = new Date();
      if (filter === "active") {
        data = data.filter((item) => new Date(item.expires_at) > now);
      } else if (filter === "expired") {
        data = data.filter((item) => new Date(item.expires_at) <= now);
      }

      data.sort((a, b) => {
        const valA = new Date(a[sortBy]).getTime();
        const valB = new Date(b[sortBy]).getTime();
        return sortOrder === "asc" ? valA - valB : valB - valA;
      });

      return data;
    }, [urls, search, filter, sortBy, sortOrder]);
  }

  return {
    copiedMap,
    handleCopyClick,
    getExpiryBg,
    search,
    setSearch,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    useFilteredSortedUrls,
  };
};
