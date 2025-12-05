"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect("/urls");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans dark:bg-gray-900">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-gray-50 dark:bg-gray-900 sm:items-start"></main>
    </div>
  );
}
