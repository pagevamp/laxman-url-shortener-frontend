"use client";

import { KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./Button";
import Input from "./ui/Input";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";
import { loginUser } from "../api/auth.api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { setLoggedIn } = useAuth();
  const {
    handleValidation,
    form,
    setForm,
    loading,
    setLoading,
    error,
    setError,
    router,
  } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = handleValidation();
    if (!isValid) return;
    try {
      setLoading(true);
      await loginUser({ username: form.username, password: form.password });
      setLoggedIn(true);
      toast.success("Login Successful!");
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        if (err.message === "User is not verified!") {
          router.push("/send-verification");
        }
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
      setError({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome Back!
      </h1>
      <p className="text-xl text-gray-900 dark:text-gray-100">
        Login to continue
      </p>

      <div className="space-y-4">
        <Input
          id="username"
          name="username"
          placeholder="username"
          value={form.username}
          error={error?.username}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, username: e.target.value }))
          }
        >
          <UserIcon className="h-5 w-5" />
        </Input>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={form.password}
          error={error?.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        >
          <KeyIcon className=" h-5 w-5" />
        </Input>
      </div>

      <Button className="mt-6">
        {loading ? "Logging in..." : "Log in"}{" "}
        <ArrowRightIcon className="ml-2 h-5 w-5" />
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
