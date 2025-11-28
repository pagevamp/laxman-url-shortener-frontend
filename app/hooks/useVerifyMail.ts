"use client";

import { useState } from "react";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

export const useVerifyMail = () => {
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [status, setStatus] = useState<"checking" | "success" | "error">(
    "checking"
  );
  const [message, setMessage] = useState("Verifying your email...");

  return {
    token,
    status,
    setStatus,
    message,
    setMessage,
  };
};
