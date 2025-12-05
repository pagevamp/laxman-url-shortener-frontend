import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}


export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        "text-gray-700 hidden md:block dark:text-gray-300 hover:underline",
        pathname === href && "text-blue-600 dark:text-gray-300 underline font-bold"
      )}
    >
      {children}
    </Link>
  );
}
