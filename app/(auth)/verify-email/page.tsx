import VerifyEmailForm from "@/app/components/VerifyEmail";
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <main className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6">
        {/* <Suspense fallback={< VerifyEmailForm/>}> */}
          <VerifyEmailForm />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
