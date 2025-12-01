"use client";

import {
  AtSymbolIcon,
  UserIcon,
  FaceSmileIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./Button";
import Input from "./ui/Input";
import Link from "next/link";
import { useRegister } from "../hooks/useRegister";
import { RegisterUser } from "../api/auth.api";
import toast from "react-hot-toast";
export default function Register() {
  const {
    form,
    setForm,
    handleRegister,
    loading,
    setLoading,
    error,
    setError,
    router,
  } = useRegister();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = handleRegister();
    if (!isValid) return;

    try {
      setLoading(true);
      const data = await RegisterUser({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      toast.success(data.message);
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoading(false);
      setError({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Sign up with your details.
      </h1>
      <div className="space-y-4">
        <Input
          id="name"
          name="name"
          placeholder="Full Name"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        >
          <FaceSmileIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
        </Input>
        {error?.name && (
          <p className="text-red-500 text-xs -mt-3">{error.name}</p>
        )}

        <Input
          id="username"
          name="username"
          placeholder="Username"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, username: e.target.value }))
          }
        >
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
        </Input>
        {error?.username && (
          <p className="text-red-500 text-xs -mt-3">{error.username}</p>
        )}

        <Input
          id="email"
          name="email"
          placeholder="email@example.com"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        >
          <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
        </Input>
        {error?.email && (
          <p className="text-red-500 text-xs -mt-3">{error.email}</p>
        )}

        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        >
          <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-900" />
        </Input>
        {error?.password && (
          <p className="text-red-500 text-xs -mt-3">{error.password}</p>
        )}
      </div>
      <Button className="mt-6 w-full flex items-center justify-center">
        {loading ? "Signing up" : "Sign Up"}{" "}
        <ArrowRightIcon className="ml-2 h-5 w-5" />
      </Button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
