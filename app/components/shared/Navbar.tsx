'use client';

import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle';

export default function Navbar() {
  const  user  = false;

  return (
    <nav className="absolute w-full flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md  top-0 z-50">
      <div className="text-xl font-bold text-gray-900 dark:text-white">URL Shortener</div>
      
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
            <Link href="/auth/login" className="text-gray-700 dark:text-gray-300 hover:underline hidden md:block">
              Login
            </Link>
            <Link href="/auth/register" className="text-gray-700 dark:text-gray-300 hover:underline hidden md:block">
              Sign Up
            </Link>
          </>
        )}

        <DarkModeToggle />
      </div>
    </nav>
  );
}
