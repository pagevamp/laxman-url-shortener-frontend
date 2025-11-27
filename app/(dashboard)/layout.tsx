"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {  useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const {loggedIn} = useAuth();
 useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn]);

  if (!loggedIn) return null;
    return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6">{children}</div>
    </div>
  );
}
