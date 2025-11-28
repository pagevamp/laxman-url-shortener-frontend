"use client";
import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("theme");
      let themeIsDark: boolean;

      if (stored === "dark") themeIsDark = true;
      else if (stored === "light") themeIsDark = false;
      else
        themeIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      setIsDark(themeIsDark);

      if (themeIsDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    if (isDark === null) return;
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return { isDark, toggleDarkMode };
}
