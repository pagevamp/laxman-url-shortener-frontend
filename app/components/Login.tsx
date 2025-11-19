'use client';

import { KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./Button";
import useLoginFormFields from "../hooks/useLoginFormFields";
import { loginFormSchema } from "../lib/zodSchemas/login.schema";
import Input from "./ui/Input";
import { loginUser } from "../api/auth.api";
import { z } from 'zod';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { username, setUsername, setPassword, password, loading, setLoading, error, setError } = useLoginFormFields();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginFormSchema.safeParse({ username, password });
    if (!result.success) {
      const fieldErrors = z.treeifyError(result.error);
      setError({
        username: fieldErrors.properties?.username?.errors[0],
        password: fieldErrors.properties?.password?.errors[0],
      });
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({ username, password });
      toast.success("Login Successful!");
      console.log("Token:", data.access_token);
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false)
      setError({})
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome Back!
      </h1>
      <p className="text-xl text-gray-900 dark:text-gray-100">Login to continue</p>

      <div className="space-y-4">
        <Input
          id="email"
          name="email"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        >
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </Input>
        {error?.username && <p className="text-red-500 text-xs -mt-3">{error.username}</p>}

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
