export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6">{children}</div>
    </div>
  );
}
