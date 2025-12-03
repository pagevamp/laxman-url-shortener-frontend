"use client";

import { VerifyUser } from "@/app/api/auth.api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useVerifyMail } from "../hooks/useVerifyMail";

export default function VerifyEmail() {
  const { token, message, setMessage, status, setStatus } = useVerifyMail();
  useEffect(() => {
    async function verifyToken() {
      try {
        const data = await VerifyUser({ token });
        toast.success(data.message);
        setStatus("success");
        setMessage(data.message);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
          setMessage(err.message);
        } else {
          toast.error("Registration failed");
        }
        setStatus("error");
      }
    }
    if (token) {
      verifyToken();
    } else {
      setStatus("error");
      setMessage("Token not found");
    }
  }, [token]);

  const getStatusIcon = () => {
    if (status === "checking")
      return <ClockIcon className="w-12 h-12 text-yellow-500 animate-pulse" />;
    if (status === "success")
      return <CheckCircleIcon className="w-12 h-12 text-green-500" />;
    return <XCircleIcon className="w-12 h-12 text-red-500" />;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <div className="flex flex-col items-center gap-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full text-center">
        {getStatusIcon()}
        <h1 className="text-2xl font-semibold">
          {status === "checking" && "Verifying..."}
          {status === "success" && "Email Verified!"}
          {status === "error" && "Verification Failed"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
        {status === "success" && (
          <Link
            href="/login"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
}
