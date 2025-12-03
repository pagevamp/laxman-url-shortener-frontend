"use client";

import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle";
import { Button } from "../Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import NavLink from "../ui/NavLink";

export default function Navbar() {
  const router = useRouter();

  const { loggedIn, setLoggedIn } = useAuth();

  async function handleLogout() {
    await axios.post("/api/logout");
    setLoggedIn(false);
    router.push("/login");
  }

  return (
    <nav className="absolute w-full flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md  top-0 z-50 rounded-2xl">
      <Link
        href={"/"}
        className="text-xl font-bold text-blue-600 dark:text-white"
      >
        URL Shortener
      </Link>

      <div className="flex items-center gap-4">
        {loggedIn ? (
          <>
            <NavLink href={"/"}>Dashboard</NavLink>
            <Button
              onClick={handleLogout}
              className="bg-transparent! border-none! shadow-none dark:text-gray-300! text-gray-700! hidden md:block  hover:underline px-0!"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink href={"/login"}>Login</NavLink>
            <NavLink href={"register"}>Sign Up</NavLink>
          </>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
}
