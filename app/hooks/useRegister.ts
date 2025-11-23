"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  registerActionState,
  registerFormSchema,
} from "../lib/zodSchemas/register.schema";
import { useState } from "react";

export const useRegister = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<registerActionState["errors"]>({});
  const router = useRouter();

  const handleResgister = () => {
    const result = registerFormSchema.safeParse({
      name: form.name,
      email: form.email,
      username: form.username,
      password: form.password,
    });
    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);
      setError({
        name: fieldErrors.properties?.name?.errors[0],
        username: fieldErrors.properties?.username?.errors[0],
        email: fieldErrors.properties?.email?.errors[0],
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
    handleResgister,
    loading,
    setLoading,
    error,
    setError,
    router,
  };
};
