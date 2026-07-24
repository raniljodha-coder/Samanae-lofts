"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/lofts", label: "The lofts" },
  { href: "/stay", label: "Stay" },
  { href: "/invest", label: "Build here" },
  { href: "/journey", label: "Our journey" },
  { href: "/samana", label: "Samaná" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = !overHero || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "bg-jungle/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Samanea Lofts, home">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={35}
            className="h-9 w-auto brightness-0 invert"
            priority
          />
          <span className="font-display text-[1.15rem] leading-none text-papel">
            Samanea Lofts
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                pathname.startsWith(l.href)
                  ? "text-flor"
                  : "text-papel/70 hover:text-papel"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-flor">
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center text-papel lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-200 ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-200 ${
                open ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-papel/10 bg-jungle lg:hidden">
          <nav className="shell flex flex-col py-4">
            {[...links, { href: "/contact", label: "Contact" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-papel/10 py-4 font-display text-2xl text-papel last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
