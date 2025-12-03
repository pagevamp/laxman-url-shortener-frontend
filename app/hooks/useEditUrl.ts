"use client";

import { useState } from "react";
import { editUrlActionState, editUrlSchema } from "../lib/schemas/url.schema";
import { z } from "zod";

export const useEditUrl = () => {
  const [form, setForm] = useState({
    expiresAt: null as Date | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<editUrlActionState["errors"]>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const result = editUrlSchema.safeParse({
      expiresAt: form.expiresAt,
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
