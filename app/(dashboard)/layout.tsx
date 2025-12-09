export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex pt-18 justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="w-full h-full px-1 py-6 md:p-6">{children}</div>
    </div>
  );
}
