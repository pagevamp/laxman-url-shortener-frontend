'use client';

import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./Button";
import useLoginFormFields from "../hooks/useLoginFormFields";
import { useState } from "react";
import { loginActionState, loginFormSchema } from "../lib/zodSchemas/login.schema";
import Input from "./ui/Input";
import { loginUser } from "../services/auth.service";

export default function LoginForm() {
  const { email, setEmail, setPassword, password, loading, setLoading } = useLoginFormFields();
  const [error, setError] = useState<loginActionState["errors"]>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = loginFormSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        server: undefined
      });
      return;
    }

    try {
      const res = await loginUser({ email, password });
      console.log(res.accessToken)
    } catch (err: any) {
      setError({
        ...error,
        server: err?.response?.data?.message || "Registration failed. Try again."
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Welcome Back!
      </h1>

      <div className="space-y-4">
        <Input
          id="email"
          name="email"
          placeholder="email@example.com"
          onChange={(e) => setEmail(e.target.value)}
        >
          <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </Input>
        {error?.email && <p className="text-red-500 text-xs -mt-3">{error.email}</p>}

        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        >
          <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </Input>
        {error?.password && <p className="text-red-500 text-xs -mt-3">{error.password}</p>}
      </div>

      <Button className="mt-6 w-full flex items-center justify-center">
        {loading ? "Logging in..." : "Log in"} <ArrowRightIcon className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
