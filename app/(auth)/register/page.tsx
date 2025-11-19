import Register from "@/app/components/Register";
import { RegisterFormSkeleton } from "@/app/components/Skeletons";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6">
        <Suspense fallback={<RegisterFormSkeleton />}>
          <Register />
        </Suspense>
      </div>
    </main>
  );
}
