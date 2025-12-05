"use client";

import { useState } from "react";
import { editUrlActionState, editUrlSchema } from "../lib/schemas/url.schema";
import { z } from "zod";

export const useEditUrl = () => {
  const [editForm, setEditForm] = useState({
    expires_at: new Date(),
  });

  const setExpiresAt = (date: Date) =>
    setEditForm((prev) => ({ ...prev, expires_at: date }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<editUrlActionState["errors"]>({});

  const handleValidation = () => {
    const result = editUrlSchema.safeParse({
      expires_at: editForm.expires_at,
    });

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        expires_at: fieldErrors.properties?.expires_at?.errors[0],
      });
      return false;
    }
    setError({});
    return true;
  };

  return {
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    editForm,
    setEditForm,
    setExpiresAt,
  };
};
