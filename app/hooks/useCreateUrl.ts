"use client";

import { useState } from "react";
import {
  CreateUrlActionState,
  createUrlSchema,
} from "../lib/schemas/url.schema";
import { z } from "zod";

export const useCreateUrl = () => {
  const [form, setForm] = useState({
    originalUrl: "",
    expiresAt: Date,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CreateUrlActionState["errors"]>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const result = createUrlSchema.safeParse({
      originalUrl: form.originalUrl,
      expiresAt: form.expiresAt,
    });

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        originalUrl: fieldErrors.properties?.originalUrl?.errors[0],
        expiresAt: fieldErrors.properties?.expiresAt?.errors[0],
      });
      return false;
    }
    setError({});
    return true;
  };

  return {
    form,
    setForm,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    handleChange,
  };
};
