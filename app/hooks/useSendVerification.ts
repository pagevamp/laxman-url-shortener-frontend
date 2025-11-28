"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  sendVerificationActionState,
  sendVerificationSchema,
} from "../lib/schemas/sendVerification.schema";

export const useSendVerification = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<sendVerificationActionState["errors"]>({});
  const router = useRouter();

  const handleValidation = () => {
    const result = sendVerificationSchema.safeParse({ email });

    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);

      setError({
        email: fieldErrors.properties?.email?.errors[0],
      });
      return false;
    }
    setError({});
    return true;
  };

  return {
    email,
    setEmail,
    handleValidation,
    loading,
    setLoading,
    error,
    setError,
    router,
  };
};
