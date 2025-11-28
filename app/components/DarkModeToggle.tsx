'use client';
import { LightBulbIcon, MoonIcon } from "@heroicons/react/24/outline";

import useDarkMode from "../hooks/useDarkMode";
import { Button } from "./ui/Button";

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <Button
      onClick={toggleDarkMode}
      className="px-1!  text-gray-300! rounded-full! dark:text-gray-900! dark:bg-gray-100 transition-colors dark:hover:bg-white hover:scale-105"
    >
      {isDark ? <LightBulbIcon className="font-bold text-3xl h-10 w-10"/> : <MoonIcon className=" font-bold text-3xl h-10 w-10"/>}
    </Button>
  );
}
