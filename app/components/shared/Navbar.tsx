'use client';

import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect } from 'react';
import { Button } from '../Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter()

  const pathname = usePathname()
  const { loggedIn, setLoggedIn } = useAuth();

  async function handleLogout() {
    await axios.post('/api/logout');
    setLoggedIn(false);
    router.push('/login');
  }

  useEffect(() => {
  }, [loggedIn]);

  return (
    <nav className="absolute w-full flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md  top-0 z-50 rounded-2xl">
      <Link href={"/"} className="text-xl font-bold text-blue-600 dark:text-white">URL Shortener</Link>

      <div className="flex items-center gap-4">
        {loggedIn ? (
          <>
            <Link href="/" className={clsx("text-gray-700 hidden md:block dark:text-gray-300 hover:underline", { 'text-blue-600! dark:text-gray-300! underline font-bold': pathname === "/" })}>
              Dashboard
            </Link>
            <Link href="/urls" className={clsx("text-gray-700 hidden md:block dark:text-gray-300 hover:underline", { 'text-blue-600! dark:text-gray-300! underline font-bold': pathname === "/urls" })}>
              URLs
            </Link>
            <Link href="/profile" className={clsx("text-gray-700 hidden md:block dark:text-gray-300 hover:underline", { 'text-blue-600! dark:text-gray-300! underline font-bold': pathname === "/profile" })}>
              Profile
            </Link>
            <Button onClick={handleLogout} className="bg-transparent! border-none! shadow-none dark:text-gray-300! text-gray-700! hidden md:block  hover:underline px-0!">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className={clsx("text-gray-700 hidden md:block dark:text-gray-300 hover:underline", { 'text-blue-600! dark:text-gray-300! underline font-bold': pathname === "/login" })}>
              Login
            </Link>
            <Link href="/register" className={clsx("text-gray-700 hidden md:block dark:text-gray-300 hover:underline", { 'text-blue-600! dark:text-gray-300! underline font-bold': pathname === "/register" })}>
              Sign Up
            </Link>
          </>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
}
