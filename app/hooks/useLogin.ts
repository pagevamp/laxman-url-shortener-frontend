"use client";

import { useState } from "react";
import {
  loginActionState,
  loginFormSchema,
} from "../lib/zodSchemas/login.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<loginActionState["errors"]>({});
  const router = useRouter();

  const handleValidation = () => {
    const result = loginFormSchema.safeParse({
      username: form.username,
      password: form.password,
    });

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        username: fieldErrors.properties?.username?.errors[0],
        password: fieldErrors.properties?.password?.errors[0],
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
    router,
  };
};
