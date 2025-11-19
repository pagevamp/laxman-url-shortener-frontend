import LoginForm from "@/app/components/Login";
import { LoginFormSkeleton } from "@/app/components/Skeletons";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6">
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
