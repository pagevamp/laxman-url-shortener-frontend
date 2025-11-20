import VerifyEmailForm from "@/app/components/VerifyEmail";

export default function VerifyPage() {
  return (
    <main className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6">
          <VerifyEmailForm />
      </div>
    </main>
  );
}
