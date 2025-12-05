"use client";

import { useState } from "react";
import {
  CreateUrlActionState,
  createUrlSchema,
} from "../lib/schemas/url.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";

export const useCreateUrl = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    original_url: "",
    expires_at: new Date(),
  });

  const setExpiresAt = (date: Date) =>
    setForm((prev) => ({ ...prev, expires_at: date }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CreateUrlActionState["errors"]>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const result = createUrlSchema.safeParse({
      original_url: form.original_url,
      expires_at: form.expires_at,
    });

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        original_url: fieldErrors.properties?.original_url?.errors[0],
        expires_at: fieldErrors.properties?.expires_at?.errors[0],
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
    setExpiresAt,
    router,
  };
};
