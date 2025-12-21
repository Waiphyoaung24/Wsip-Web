"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/service", label: "Service" },
  { href: "/about-us", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-default navbar-fixed-top relative w-full z-50">
      <div className="container-fluid px-10">
        <div className="navbar-header relative flex items-center justify-between w-full h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="navbar-brand flex items-center justify-start flex-shrink-0"
          >
            <Image
              src="/imgs/logo.png"
              alt="Wisp logo"
              width={100}
              height={26}
              className="w-24 sm:w-28 md:w-[120px] h-auto transition-opacity duration-200 hover:opacity-90"
              priority
            />
          </Link>

          {/* Navigation - Right side */}
          <div className="flex flex-shrink-0">
            <ul className="nav navbar-nav navbar-right flex items-center gap-6 lg:gap-8 list-none m-0 p-0">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="list-none">
                    <Link
                      href={link.href}
                      className={`text-sm font-light tracking-wide transition-opacity duration-200 no-underline ${
                        isActive
                          ? "text-white/100"
                          : "text-white/70 hover:text-white/100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}


