"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  // const params = useSearchParams();
  const token = "valid-token"
  const [status, setStatus] = useState<"checking" | "success" | "error">("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setStatus("error");
        setMessage("Missing token.");
        toast.error("Missing token");
        return;
      }

      await new Promise((res) => setTimeout(res, 1000)); // fake loading

      if (token === "valid-token") {
        setStatus("success");
        setMessage("Your email has been successfully verified! 🎉");
        toast.success("Email verification successful!");
        return;
      }

      if (token === "expired-token") {
        setStatus("error");
        setMessage("Your verification link has expired. Request a new one.");
        toast.error("Token expired");
        return;
      }

      setStatus("error");
      setMessage("Invalid verification token.");
      toast.error("Verification failed");
    }

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-gray-100">
      {status === "checking" && <p>Verifying your email...</p>}
      {status !== "checking" && <p>{message}</p>}
    </div>
  );
}
