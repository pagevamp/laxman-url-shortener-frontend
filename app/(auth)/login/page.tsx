import LoginForm from "@/app/components/Login";


export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6">
          <LoginForm />
      </div>
    </main>
  );
}
