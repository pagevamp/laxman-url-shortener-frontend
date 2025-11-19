'use client';

export  function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div> {/* Title */}

      <div className="space-y-4">
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="h-11 w-full bg-gray-300 dark:bg-gray-700 rounded mt-6"></div>
    </div>
  );
}

export  function RegisterFormSkeleton() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-6 px-8 py-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-pulse">
      <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

      <div className="space-y-4">
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>

        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>

        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>

        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="h-11 w-full bg-gray-400 dark:bg-gray-600 rounded mt-6"></div>
    </div>
  );
}



export function NavbarSkeleton() {
  return (
    <nav className="absolute w-full flex items-center justify-between px-8 py-4 bg-gray-200 dark:bg-gray-800 shadow-md top-0 z-50 animate-pulse">
      <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>

      <div className="flex items-center gap-4">
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-8 w-24 bg-gray-400 dark:bg-gray-600 rounded"></div> {/* Dark mode button */}
      </div>
    </nav>
  );
}
