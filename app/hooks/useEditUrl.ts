"use client";

import { useState } from "react";
import { editUrlActionState, editUrlSchema } from "../lib/schemas/url.schema";
import { z } from "zod";

export const useEditUrl = () => {
  const [expiresAt, setExpiresAt] = useState(null as Date | null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<editUrlActionState["errors"]>({});

  const handleValidation = () => {
    const result = editUrlSchema.safeParse({
      expiresAt: expiresAt,
    });

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        expiresAt: fieldErrors.properties?.expiresAt?.errors[0],
      });
      return false;
    }
    setError({});
    return true;
  };

  return {
    expiresAt,
    setExpiresAt,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
  };
};
