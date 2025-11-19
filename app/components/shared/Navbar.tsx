'use client';

import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Navbar() {
  const  user  = false;

  const pathname = usePathname()

  return (
    <nav className="absolute w-full flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md  top-0 z-50 rounded-2xl">
      <Link href={"/"} className="text-xl font-bold text-blue-600 dark:text-white">URL Shortener</Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:underline">
              Dashboard
            </Link>
            <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:underline">
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className={clsx("text-gray-700 dark:text-gray-300 hover:underline",{'text-blue-600! dark:text-gray-300! underline font-bold': pathname === "/login"})}>
              Login
            </Link>
            <Link href="/register" className={clsx("text-gray-700 dark:text-gray-300 hover:underline",{'text-blue-600! dark:text-gray-300! underline font-bold': pathname === "/register"})}>
              Sign Up
            </Link>
          </>
        )}

        <DarkModeToggle />
      </div>
    </nav>
  );
}
