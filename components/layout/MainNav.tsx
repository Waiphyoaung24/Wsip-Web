"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/service", label: "Service" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 text-sm font-medium">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? "text-zinc-900 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}


