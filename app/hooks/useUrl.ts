"use client";

import { useState } from "react";

export const useUrl = () => {
  const [copiedMap, setCopiedMap] = useState<{ [key: string]: boolean }>({});

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

  const getExpiryColor = (expires_at: string) => {
    const now = new Date();
    const expiry = new Date(expires_at);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return "text-red-600 dark:text-red-400";
    if (diff < 24 * 60 * 60 * 1000)
      return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  return {
    copiedMap,
    handleCopyClick,
    getExpiryColor,
  };
};
